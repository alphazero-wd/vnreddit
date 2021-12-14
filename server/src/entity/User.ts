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
  @OneToMany(() => Post, post => post.creator)
  posts: Post[];

  @Field(() => [Vote!]!)
  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];
}
