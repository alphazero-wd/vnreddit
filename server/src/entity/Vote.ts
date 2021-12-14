import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Vote {
  @Field(() => ID!)
  @PrimaryColumn()
  userId: number;

  @Field(() => ID!)
  @PrimaryColumn()
  postId: number;

  @Field(() => Int!)
  @Column({ enum: [-1, 0, 1], default: 0, type: "int" })
  point: -1 | 0 | 1;

  @Field()
  @Column({ enum: ["up", "down"] })
  voteStatus: "up" | "down";

  @ManyToOne(() => Post, post => post.votes)
  post: Post;

  @ManyToOne(() => User, user => user.votes)
  user: User;
}
