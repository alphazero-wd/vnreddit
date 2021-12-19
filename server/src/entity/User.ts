import { createAccessToken } from "../utils/token";
import { Field, ID, ObjectType, Root } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  token(@Root() user: User) {
    return createAccessToken(user);
  }

  @Column()
  password!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => [Post!]!)
  @OneToMany(() => Post, (post) => post.creator, { onDelete: "CASCADE" })
  posts: Post[];

  @Field(() => [Vote!]!)
  @OneToMany(() => Vote, (vote) => vote.user, { onDelete: "CASCADE" })
  votes: Vote[];

  @Field(() => [Comment!]!)
  @OneToMany(() => Comment, (comment) => comment, { onDelete: "CASCADE" })
  comments: Comment[];
}
