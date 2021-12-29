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
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const votePoint = Math.sign(point) as -1 | 0 | 1;
    const vote = await getRepository(Vote).findOne({
      where: {
        postId: parseInt(postId),
        userId: req?.payload?.userId,
      },
    });
    const queryBuilder = getRepository(Vote).createQueryBuilder("vote");

    if (vote) {
      if (votePoint === 1 || votePoint === -1) {
        await queryBuilder
          .update()
          .set({
            point: votePoint,
          })
          .where("postId = :postId AND userId = :userId", {
            postId,
            userId: req?.payload?.userId,
          })
          .execute();
      } else if (votePoint === 0) {
        await queryBuilder
          .delete()
          .where("postId = :postId AND userId = :userId", {
            postId,
            userId: req?.payload?.userId,
          })
          .execute();
      } else {
      }
    } else {
      if (votePoint === 0) return false;
      await queryBuilder
        .insert()
        .into(Vote)
        .values({
          point: votePoint,
          postId: parseInt(postId),
          userId: req?.payload?.userId,
        })
        .execute();
    }
    return true;
  }
}
