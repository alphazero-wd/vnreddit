import { User } from "../entity/User";
import { Field, InputType, ObjectType } from "type-graphql";
import { ErrorResponse } from "./ErrorResponse";
import { Post } from "../entity/Post";

@InputType()
export class SignupInput {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;
}

@InputType()
export class LoginInput {
  @Field()
  usernameOrEmail!: string;

  @Field()
  password!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  token: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

@ObjectType()
export class UserResponse {
  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  error?: ErrorResponse;
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field({ nullable: true })
  successMessage?: string;

  @Field({ nullable: true })
  error?: ErrorResponse;
}

@ObjectType()
export class MeResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Post!], { nullable: true })
  posts?: Post[];
}
