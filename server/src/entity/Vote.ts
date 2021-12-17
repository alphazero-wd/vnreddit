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
  @Column({ enum: [-1, 1], type: "int" })
  point: -1 | 1;

  @ManyToOne(() => Post, post => post.votes, { onDelete: "CASCADE" })
  post: Post;

  @ManyToOne(() => User, user => user.votes, { onDelete: "CASCADE" })
  user: User;
}
