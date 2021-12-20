import { Post } from "../entity/Post";
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
import { getRepository } from "typeorm";
import {
  CreatePostInput,
  EditPostInput,
  PaginatedPosts,
  PostResponse,
} from "../types/Post";
import { auth } from "../middleware/auth";
import { MyContext } from "../types/MyContext";
import { User } from "../entity/User";
import { Vote } from "../entity/Vote";
import { Comment } from "../entity/Comment";
import { Community } from "../entity/Community";

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User, { nullable: true })
  creator(@Root() post: Post): Promise<User | void> {
    return getRepository(User).findOne(post.creatorId);
  }

  @FieldResolver(() => [Comment!]!)
  comments(@Root() { id }: Post) {
    return getRepository(Comment).find({
      where: {
        postId: id,
      },
    });
  }

  @FieldResolver(() => Vote)
  votes(@Root() { id }: Post): Promise<Vote[]> {
    return getRepository(Vote).find({
      where: {
        postId: id,
      },
    });
  }

  @FieldResolver(() => Community, { nullable: true })
  community(@Root() { communityId }: Post): Promise<Community | undefined> {
    return getRepository(Community).findOne({ where: { id: communityId } });
  }

  @FieldResolver(() => Int)
  async numberOfComments(@Root() { id }: Post): Promise<number> {
    const comments = await getRepository(Comment).find({
      where: {
        postId: id,
      },
    });
    return comments.length;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int!) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    // if the user fetches more than 15, only set limit to 15
    const requestLimit = Math.min(15, limit);
    const extraRequestLimit = requestLimit + 1;

    // take an extra post to check if more posts can be fetched
    const queryBuilder = getRepository(Post)
      .createQueryBuilder("post")
      .innerJoinAndSelect("post.creator", "user")
      .orderBy("post.createdAt", "DESC")
      .take(extraRequestLimit);

    // fetch posts whose createdAt < createdAt of the oldest post in a single request
    if (cursor) {
      queryBuilder.where("post.createdAt < :cursor", {
        cursor: new Date(cursor),
      });
    }

    const posts = await queryBuilder.getMany();
    return {
      // return the posts based on the given limit (not plus 1)
      posts: posts.slice(0, requestLimit),
      hasMore: posts.length === extraRequestLimit,
    };
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: string): Promise<Post | void> {
    const post = await getRepository(Post).findOne(parseInt(id));
    if (!post) {
      throw new Error("Post does not exist.");
    }
    return post;
  }

  @UseMiddleware(auth)
  @Mutation(() => PostResponse)
  async createPost(
    @Arg("post") { title, body, communityId }: CreatePostInput,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    if (!title) {
      return {
        error: {
          field: "title",
          message: "Title length must be above 1 character",
        },
      };
    }
    const post = await getRepository(Post)
      .createQueryBuilder("post")
      .insert()
      .into(Post)
      .values({
        title,
        body,
        creatorId: req?.payload?.userId,
        communityId: communityId ? parseInt(communityId) : undefined,
      })
      .returning("*")
      .execute();
    return {
      post: post.raw[0],
    };
  }

  @UseMiddleware(auth)
  @Mutation(() => PostResponse)
  async editPost(
    @Arg("post") { id, title, body }: EditPostInput
  ): Promise<PostResponse> {
    const post = await getRepository(Post).findOne(parseInt(id));
    if (post) {
      const updatedPost = await getRepository(Post)
        .createQueryBuilder("post")
        .update()
        .set({
          title: title ? title : post.title,
          body: body ? body : post.body,
        })
        .where("post.id = :id", { id: parseInt(id) })
        .returning("*")
        .execute();

      return {
        post: updatedPost.raw[0],
      };
    } else {
      return {
        error: {
          message: "Post does not exist.",
        },
      };
    }
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string): Promise<boolean> {
    const post = await getRepository(Post).findOne(parseInt(id));
    if (post) {
      await getRepository(Post)
        .createQueryBuilder("post")
        .delete()
        .where("post.id = :id", { id: parseInt(id) })
        .execute();
      return true;
    } else {
      return false;
    }
  }
}
