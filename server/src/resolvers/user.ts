import {
  ForgotPasswordResponse,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
  UserResponse,
} from "../types/User";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { validateEmail, validatePassword } from "../utils/validate";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { compare, hash } from "bcryptjs";
import { auth } from "../middleware/auth";
import { MyContext } from "../types/MyContext";
import { sendEmail } from "../utils/sendEmail";
import { createRefreshToken } from "../utils/token";
import { verify } from "jsonwebtoken";
import { Post } from "../entity/Post";
import { Vote } from "../entity/Vote";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [Post!])
  posts(@Root() user: User): Promise<Post[]> {
    return getRepository(Post).find({ where: { creatorId: user.id } });
  }

  @UseMiddleware(auth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { payload }: MyContext): Promise<User | null> {
    const user = await getRepository(User).findOne({
      where: { id: payload.userId },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  @FieldResolver(() => [Vote!]!)
  async votes(@Root() { id }: User): Promise<Vote[]> {
    const userVotes = await getRepository(Vote).find({
      where: { userId: id },
    });
    return userVotes;
  }

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

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Arg("email") email: string
  ): Promise<ForgotPasswordResponse> {
    const user = await getRepository(User).findOne({ where: { email } });

    if (user) {
      const info = {
        to: email,
        subject: "Password Reset Verification",
        html: `
          <h1>Password Reset Verification</h1> 
          <p>Click on the link below to reset the password.</p>
          <a href="http://localhost:3000/user/reset-password/${createRefreshToken(
            user
          )}">Reset Password</a>
        `,
      };
      await sendEmail(info);
      return {
        successMessage: `A verification message has been sent to email ${email}.`,
      };
    }
    return {
      error: {
        field: "email",
        message: `Email ${email} does not exist.`,
      },
    };
  }

  @Mutation(() => UserResponse)
  async resetPassword(
    @Arg("payload") { token, password, confirmPassword }: ResetPasswordInput,
    @Ctx() { payload }: MyContext
  ): Promise<UserResponse> {
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

    const decodedData = verify(token, process.env.JWT_REFRESH_SECRET!);
    payload = decodedData as any;
    const user = await getRepository(User).findOne(payload.userId);
    if (!user) {
      return {
        error: {
          field: "token",
          message: "No user found.",
        },
      };
    }
    const hashedPassword = await hash(password, 12);
    const updatedUser = await getRepository(User)
      .createQueryBuilder("user")
      .update()
      .set({
        password: hashedPassword,
      })
      .where("id = :id", { id: payload.userId })
      .returning("*")
      .execute();

    return { user: updatedUser.raw[0] };
  }
}
