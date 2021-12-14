import { Vote } from "../entity/Vote";
import { MyContext } from "../types/MyContext";
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { auth } from "../middleware/auth";

@Resolver()
export class VoteResolver {
  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async vote(
    @Arg("postId") postId: string,
    @Arg("point", () => Int!) point: -1 | 0 | 1,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const existingVote = await getRepository(Vote).findOne({
      where: {
        userId: payload.userId,
        postId: parseInt(postId),
      },
    });
    const queryBuilder = getRepository(Vote).createQueryBuilder("vote");
    const voteStatus: "down" | "up" = point === -1 ? "down" : "up";
    if (existingVote) {
      switch (point) {
        case 0:
          await queryBuilder
            .delete()
            .where("postId = :postId AND userId = :userId", {
              postId: parseInt(postId),
              userId: payload.userId,
            })
            .execute();
          break;
        case 1 || -1:
          await queryBuilder
            .update()
            .set({
              point,
            })
            .execute();
          break;
        default:
          throw new Error("Point can only be -1, 0 or 1.");
      }
    } else {
      await queryBuilder
        .insert()
        .into(Vote)
        .values({
          postId: parseInt(postId),
          userId: payload.userId,
          point,
          voteStatus,
        })
        .execute();
    }
    return true;
  }
}
