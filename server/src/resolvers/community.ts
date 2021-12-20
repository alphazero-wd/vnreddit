import { Community } from "../entity/Community";
import {
  Arg,
  Ctx,
  FieldResolver,
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

@Resolver(Community)
export class CommunityResolver {
  @FieldResolver(() => [Post!]!)
  posts(@Root() { id }: Community) {
    return getRepository(Post).find({ where: { communityId: id } });
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
    await getConnection()
      .createQueryBuilder()
      .relation(Community, "members")
      .of(commId) // add to a community id
      .add(req.payload?.userId); // a member based on the id of the user;
    return true;
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async leaveCommunity(
    @Arg("commId") commId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .relation(Community, "members")
      .of(commId) // add to a community id
      .remove(req.payload?.userId); // a member based on the id of the user;
    return true;
  }

  @UseMiddleware(auth)
  @Mutation(() => CommunityResponse)
  async createCommunity(@Arg("name") name: string): Promise<CommunityResponse> {
    if (name.length > 20 || name.includes(" ")) {
      return {
        error: {
          field: "name",
          message: "Invalid community name.",
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

    return {
      community: newCommunity.raw[0],
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
}
