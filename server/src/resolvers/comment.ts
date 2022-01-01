import {
  CommentResponse,
  CreateCommentInput,
  EditCommentInput,
} from "../types/Comment";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Comment } from "../entity/Comment";
import { getRepository } from "typeorm";
import { MyContext } from "../types/MyContext";
import { auth } from "../middleware/auth";
import { User } from "../entity/User";

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => User, { nullable: true })
  commentator(@Root() { userId }: Comment) {
    return getRepository(User).findOne(userId);
  }

  @UseMiddleware(auth)
  @Mutation(() => CommentResponse)
  async createComment(
    @Arg("payload") { body, postId }: CreateCommentInput,
    @Ctx() { req }: MyContext
  ): Promise<CommentResponse> {
    if (!body)
      return {
        error: {
          field: "body",
          message: "Comment must be provided.",
        },
      };

    const comment = await getRepository(Comment)
      .createQueryBuilder("comment")
      .insert()
      .into(Comment)
      .values({
        body,
        postId: parseInt(postId),
        userId: req.payload?.userId,
      })
      .returning("*")
      .execute();

    return { comment: comment.raw[0] };
  }

  @UseMiddleware(auth)
  @Mutation(() => CommentResponse)
  async editComment(
    @Arg("payload") { body, commentId }: EditCommentInput
  ): Promise<CommentResponse> {
    const comment = await getRepository(Comment).findOne({
      where: {
        id: parseInt(commentId),
      },
    });
    if (comment) {
      if (!body) {
        return {
          error: {
            field: "body",
            message: "Comment must be provided",
          },
        };
      }
      const updatedComment = await getRepository(Comment)
        .createQueryBuilder("comment")
        .update()
        .set({ body })
        .where("id = :commentId", { commentId })
        .returning("*")
        .execute();

      return {
        comment: updatedComment.raw[0],
      };
    } else {
      return {
        error: {
          message: "Comment does not exist.",
        },
      };
    }
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async deleteComment(@Arg("commentId") commentId: string): Promise<boolean> {
    const comment = await getRepository(Comment).findOne({
      where: { id: parseInt(commentId) },
    });

    if (comment) {
      await getRepository(Comment)
        .createQueryBuilder("comment")
        .delete()
        .where("id = :commentId", { commentId })
        .execute();
      return true;
    } else {
      return false;
    }
  }
}
