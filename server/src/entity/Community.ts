import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Community {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true, length: 20 })
  name!: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  description: string | null;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.communities, { onDelete: "CASCADE" })
  members: User[];
}
