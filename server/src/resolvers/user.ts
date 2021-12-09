import { LoginInput, SignupInput, UserResponse } from "../types/graphql/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { validateEmail, validatePassword } from "../utils/validate";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { compare, hash } from "bcryptjs";

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async signup(
    @Arg("user") { username, email, password, confirmPassword }: SignupInput
  ): Promise<UserResponse> {
    if (!username || username.includes("@")) {
      return {
        error: {
          field: "username",
          message: "Username must not be empty or include @.",
        },
      };
    }

    if (!validateEmail(email)) {
      return {
        error: {
          field: "email",
          message: "Invalid email.",
        },
      };
    }

    if (!validatePassword(password)) {
      return {
        error: {
          field: "password",
          message: "Password should be stronger.",
        },
      };
    }

    if (password !== confirmPassword) {
      return {
        error: {
          field: "confirmPassword",
          message: "Passwords do not match.",
        },
      };
    }

    let user;
    user = await getRepository(User).findOne({ where: { username } });
    if (user) {
      return {
        error: {
          field: "username",
          message: "User already exists.",
        },
      };
    }
    user = await getRepository(User).findOne({ where: { email } });
    if (user) {
      return {
        error: {
          field: "email",
          message: "Email already taken.",
        },
      };
    }
    const hashedPassword = await hash(password, 12);
    const newUser = await getRepository(User)
      .createQueryBuilder("user")
      .insert()
      .into(User)
      .values({
        email,
        username,
        password: hashedPassword,
      })
      .returning("*")
      .execute();
    return {
      user: newUser.raw[0],
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("user") { usernameOrEmail, password }: LoginInput
  ): Promise<UserResponse> {
    const user = await getRepository(User).findOne({
      where: !usernameOrEmail.includes("@")
        ? { username: usernameOrEmail }
        : { email: usernameOrEmail },
    });
    if (!user) {
      return {
        error: {
          field: "usernameOrEmail",
          message: "User does not exist.",
        },
      };
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return {
        error: {
          field: "password",
          message: "Wrong password.",
        },
      };
    }

    return { user };
  }
}
