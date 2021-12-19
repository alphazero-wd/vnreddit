import { Comment } from "../entity/Comment";
import { Field, InputType, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";

@InputType()
export class CreateCommentInput {
  @Field()
  body: string;

  @Field()
  postId: string;
}

@ObjectType()
export class CommentResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment;

  @Field(() => ErrorResponse, { nullable: true })
  error?: ErrorResponse;
}

@InputType()
export class EditCommentInput {
  @Field()
  body: string;

  @Field()
  commentId: string;
}
