import { createAccessToken } from "../utils/token";
import { Field, ID, ObjectType, Root } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Comment } from "./Comment";
import { Community } from "./Community";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

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

  @Field(() => [Community])
  @ManyToMany(() => Community, (community) => community.members, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  communities: Community[];
}
