import { Post } from "../entity/Post";
import { InputType, Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => String, { nullable: true })
  communityId?: string | null;
}

@InputType()
export class EditPostInput {
  @Field()
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  body?: string | null;
}

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post!]!)
  posts: Post[];

  @Field(() => Boolean)
  hasMore: boolean;
}

@ObjectType()
export class PostResponse {
  @Field({ nullable: true })
  post?: Post;

  @Field({ nullable: true })
  error?: ErrorResponse;
}
