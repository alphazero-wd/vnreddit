import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  body: string | null;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  creatorId!: number;

  @Field(() => User!)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  creator: User;

  @Field(() => [Vote!]!)
  @OneToMany(() => Vote, (vote) => vote, { onDelete: "CASCADE" })
  votes: Vote[];

  @Field(() => [Comment!]!)
  @OneToMany(() => Comment, (comment) => comment, { onDelete: "CASCADE" })
  comments: Comment[];

  @Column("int", { nullable: true })
  communityId: number | null;
}
