import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

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
  @ManyToOne(() => User, (user) => user.id)
  creatorId!: number;
}
