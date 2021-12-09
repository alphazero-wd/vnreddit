import { Post } from "../entity/Post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import {
  CreatePostInput,
  EditPostInput,
  PostResponse,
} from "../types/graphql/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await getRepository(Post)
      .createQueryBuilder("post")
      .getMany();
    return posts;
  }

  @Mutation(() => PostResponse)
  async createPost(
    @Arg("post") { title, body }: CreatePostInput
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
      })
      .returning("*")
      .execute();
    return {
      post: post.raw[0],
    };
  }

  @Mutation(() => PostResponse)
  async editPost(
    @Arg("post") { id, title, body }: EditPostInput
  ): Promise<PostResponse> {
    const post = await getRepository(Post)
      .createQueryBuilder("post")
      .where("post.id = :id", { id: parseInt(id) })
      .getOne();
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

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string): Promise<boolean> {
    const post = await getRepository(Post)
      .createQueryBuilder("post")
      .where("post.id = :id", { id: parseInt(id) })
      .getOne();
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
