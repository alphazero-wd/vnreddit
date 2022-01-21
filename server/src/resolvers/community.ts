import { Community } from "../entity/Community";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { auth } from "../middleware/auth";
import { CommunityResponse } from "../types/Community";
import { getConnection, getRepository } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import { validateCommunityName } from "../utils/validate";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import path from "path";
import { createWriteStream } from "fs";
import { mkdir, readdir, unlink } from "fs/promises";
import { finished } from "stream/promises";
import { encryptImage } from "../utils/encryptImage";

@Resolver(Community)
export class CommunityResolver {
  @FieldResolver(() => [Post!]!)
  posts(@Root() { id }: Community) {
    return getRepository(Post)
      .createQueryBuilder("p")
      .orderBy("p.createdAt", "DESC")
      .where("p.communityId = :id", { id })
      .getMany();
  }

  @FieldResolver(() => Int)
  async numberOfMembers(@Root() { id }: Community) {
    const community = await getConnection().manager.findOne(Community, id);
    if (community) {
      community.members = await getConnection()
        .createQueryBuilder()
        .relation(Community, "members")
        .of(id)
        .loadMany();
      return community.members.length;
    }
    return 0;
  }

  @FieldResolver(() => [User!]!)
  async members(@Root() { id }: Community) {
    const community = await getConnection().manager.findOne(Community, id);
    if (community) {
      community.members = await getConnection()
        .createQueryBuilder()
        .relation(Community, "members")
        .of(id)
        .loadMany();
      return community.members;
    }
    return [];
  }

  @Query(() => [Community])
  async communities(@Arg("search") search: string): Promise<Community[]> {
    const communities = await getRepository(Community)
      .createQueryBuilder("c")
      .where("name ILIKE :search", { search: `%${search}%` })
      .getMany();
    return communities;
  }

  @Query(() => Community, { nullable: true })
  async community(@Arg("name") name: string) {
    return getRepository(Community).findOne({ where: { name } });
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async joinCommunity(
    @Arg("commId") commId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const community = await getConnection().manager.findOne(
      Community,
      parseInt(commId)
    );
    if (community) {
      community.members = await getConnection()
        .createQueryBuilder()
        .relation(Community, "members")
        .of(req.payload?.userId)
        .loadMany();

      await getConnection()
        .createQueryBuilder()
        .relation(Community, "members")
        .of(parseInt(commId)) // add to a community id
        .add(req.payload?.userId); // a member based on the id of the user;
      return true;
    }
    return false;
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async leaveCommunity(
    @Arg("commId") commId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const community = await getConnection().manager.findOne(
      Community,
      parseInt(commId)
    );
    if (community) {
      community.members = await getConnection()
        .createQueryBuilder()
        .relation(Community, "members")
        .of(req.payload?.userId)
        .loadMany();

      await getConnection()
        .createQueryBuilder()
        .relation(Community, "members")
        .of(parseInt(commId)) // add to a community id
        .remove(req.payload?.userId); // a member based on the id of the user;
      return true;
    }
    return false;
  }

  @UseMiddleware(auth)
  @Mutation(() => CommunityResponse)
  async createCommunity(@Arg("name") name: string): Promise<CommunityResponse> {
    if (!validateCommunityName(name)) {
      return {
        error: {
          field: "name",
          message:
            "Community name must be between 3–20 characters, and can only contain letters, numbers, or underscores.",
        },
      };
    }

    const existingCommunity = await getRepository(Community).findOne({
      where: { name },
    });

    if (existingCommunity) {
      return {
        error: {
          field: "name",
          message:
            "Community name has already been taken. Please use another name.",
        },
      };
    }

    const newCommunity = await getRepository(Community)
      .createQueryBuilder("c")
      .insert()
      .into(Community)
      .values({ name })
      .returning("*")
      .execute();
    const community = newCommunity.raw[0];
    await mkdir(
      path.join(__dirname, `/../../public/images/vr/${community.name}`)
    );
    return {
      community,
    };
  }

  @UseMiddleware(auth)
  @Mutation(() => CommunityResponse)
  async addDescription(
    @Arg("description") description: string,
    @Arg("id") id: string
  ): Promise<CommunityResponse> {
    const community = await getRepository(Community).findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (community) {
      const updatedCommunity = await getRepository(Community)
        .createQueryBuilder("c")
        .update()
        .set({
          description,
        })
        .where("id = :id", { id })
        .returning("*")
        .execute();

      return {
        community: updatedCommunity.raw[0],
      };
    } else {
      return {
        error: {
          message: "Community not found.",
        },
      };
    }
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async updateCommunityImage(
    @Arg("communityId") communityId: string,
    @Arg("image", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    const community = await getRepository(Community).findOne(communityId);
    if (community) {
      const { ext, name } = path.parse(filename);
      const communityImageFile = encryptImage(community.name + name) + ext;
      const imageUrl = `${process.env.SERVER_URL}/images/vr/${community.name}/${communityImageFile}`;
      const pathname = path.join(
        __dirname,
        `../../public/images/vr/${community.name}/`
      );
      const out = createReadStream().pipe(
        createWriteStream(`${pathname}${communityImageFile}`)
      );
      const results = await readdir(pathname);

      if (results.length > 1) {
        try {
          await unlink(
            pathname + results.find((result) => result !== communityImageFile)
          );
        } catch (error) {
          console.log("error: ", error);
        }
      }

      await finished(out);
      await getRepository(Community)
        .createQueryBuilder()
        .update()
        .set({ imageUrl })
        .where("id = :id", { id: communityId })
        .execute();
      return true;
    }
    return false;
  }
}
