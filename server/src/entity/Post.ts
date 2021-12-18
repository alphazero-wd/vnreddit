import { Field, ID, Int, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  body?: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  creatorId!: number;

  @Field(() => User!)
  @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE" })
  creator: User;

  @Field(() => [Vote!]!)
  @OneToMany(() => Vote, vote => vote, { onDelete: "CASCADE" })
  votes: Vote[];

  @Field(() => Int)
  @Column("int", { default: 0 })
  points: number;
}
