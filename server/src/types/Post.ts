import { Post } from "../entity/Post";
import { InputType, Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  body?: string;
}

@InputType()
export class EditPostInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;
}

@ObjectType()
export class PostResponse {
  @Field({ nullable: true })
  post?: Post;

  @Field({ nullable: true })
  error?: ErrorResponse;
}
