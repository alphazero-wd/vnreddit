import { compare, hash } from "bcryptjs";
import { createWriteStream, mkdir } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { decode, verify } from "jsonwebtoken";
import path from "path";
import { finished } from "stream/promises";
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
import { getConnection, getRepository } from "typeorm";
import { Community } from "../entity/Community";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { auth } from "../middleware/auth";
import { MyContext } from "../types/MyContext";
import {
  AuthResponse,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
  UserResponse,
} from "../types/User";
import { sendEmail } from "../utils/sendEmail";
import { createRefreshToken } from "../utils/token";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validate";
import { encryptImage } from "../utils/encryptImage";
import { readdir, rmdir, unlink } from "fs/promises";
import { randomBytes } from "crypto";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  user(@Arg("username") username: string): Promise<User | undefined> {
    return getRepository(User).findOne({ where: { username } });
  }

  @FieldResolver(() => [Post!])
  posts(@Root() user: User): Promise<Post[]> {
    return getRepository(Post).find({ where: { creatorId: user.id } });
  }

  @FieldResolver(() => [Community])
  async communities(@Root() { id }: User) {
    const user = await getConnection().manager.findOne(User, id);
    if (user) {
      user.communities = await getConnection()
        .createQueryBuilder()
        .relation(User, "communities")
        .of(id)
        .loadMany();
      return user.communities;
    }
    return [];
  }

  @UseMiddleware(auth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    const user = await getRepository(User).findOne({
      where: { id: req?.payload?.userId },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const { userId } = verify(token, process.env.JWT_REFRESH_SECRET!) as any;
    const user = await getRepository(User).findOne(userId);
    const queryBuilder = getRepository(User).createQueryBuilder();
    if (user) {
      await queryBuilder
        .update()
        .set({ isConfirmed: true })
        .where("id = :id", { id: userId })
        .execute();
      return true;
    }
    return false;
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async sendConfirmationEmail(@Ctx() { req }: MyContext) {
    const user = await getRepository(User).findOne(req.payload?.userId);
    if (user) {
      const html = `
      <h1>Account confirmation</h1> 
      <p>Click the link below to confirm your account.</p>
      <a href="${process.env.CORS_ORIGIN}/u/confirm/${createRefreshToken(
        user
      )}">Confirm account</a>
    `;
      sendEmail({ to: user.email, subject: "Account confirmation", html });
      return true;
    }
    return false;
  }

  @Mutation(() => UserResponse)
  async signup(
    @Arg("user") { username, email, password, confirmPassword }: SignupInput
  ): Promise<UserResponse> {
    if (!validateUsername(username)) {
      return {
        error: {
          field: "username",
          message:
            "Username must be between 3–30 characters, and can only contain letters, numbers, or underscores.",
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
    const insertResult = await getRepository(User)
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
    const newUser = insertResult.raw[0];
    mkdir(
      path.join(__dirname, `../../public/images/u/${newUser.username}`),
      (error) => console.log("error: ", error)
    );
    return { user: newUser };
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

  @Mutation(() => AuthResponse)
  async forgotPassword(@Arg("email") email: string): Promise<AuthResponse> {
    const user = await getRepository(User).findOne({ where: { email } });

    if (user) {
      const info = {
        to: email,
        subject: "Password Reset Verification",
        html: `
          <h1>Password Reset Verification</h1> 
          <p>Click on the link below to reset the password.</p>
          <a href="${
            process.env.CORS_ORIGIN
          }/u/reset-password/${createRefreshToken(user)}">Reset Password</a>
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
    @Ctx() { req }: MyContext
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
    req.payload = decodedData as any;
    const user = await getRepository(User).findOne(req?.payload?.userId);
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
      .where("id = :id", { id: req?.payload?.userId })
      .returning("*")
      .execute();

    return { user: updatedUser.raw[0] };
  }

  @UseMiddleware(auth)
  @Mutation(() => AuthResponse)
  async updateUsername(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ): Promise<AuthResponse> {
    // find the current user
    const currentUser = await getRepository(User).findOne(req.payload?.userId);
    const queryBuilder = getRepository(User).createQueryBuilder("u");

    if (currentUser) {
      if (!validateUsername(username))
        return {
          error: {
            field: "username",
            message:
              "Username must be between 3–30 characters, and can only contain letters, numbers, or underscores.",
          },
        };
      const existingUser = await getRepository(User).findOne({
        where: {
          username,
        },
      });
      if (existingUser)
        return {
          error: {
            field: "username",
            message: "Username has already been taken.",
          },
        };
      await queryBuilder
        .update()
        .set({ username })
        .where("id = :id", { id: req.payload?.userId })
        .execute();
      return {
        successMessage: "Username has been successfully updated.",
      };
    }
    return {
      error: { message: "User not found." },
    };
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async updateProfileImage(
    @Arg("image", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = await getRepository(User).findOne(req.payload?.userId);
    if (user) {
      const { ext, name } = path.parse(filename);
      const profileImageFile = encryptImage(user.username + name) + ext;
      const imageUrl = `${process.env.SERVER_URL}/images/u/${user.username}/${profileImageFile}`;
      const pathname = path.join(
        __dirname,
        `../../public/images/u/${user.username}/`
      );
      const out = createReadStream().pipe(
        createWriteStream(`${pathname}${profileImageFile}`)
      );
      const results = await readdir(pathname);
      if (results.length > 1) {
        try {
          await unlink(
            pathname + results.find((result) => result !== profileImageFile)
          );
        } catch (error) {
          console.log("error: ", error);
        }
      }

      await finished(out);
      await getRepository(User)
        .createQueryBuilder()
        .update()
        .set({ imageUrl })
        .where("id = :id", { id: user.id })
        .execute();

      return true;
    }
    return false;
  }

  @UseMiddleware(auth)
  @Mutation(() => AuthResponse)
  async updatePassword(
    @Arg("password") password: string,
    @Arg("newPassword") newPassword: string,
    @Arg("confirmPassword") confirmPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<AuthResponse> {
    const queryBuilder = getRepository(User).createQueryBuilder("u");
    const user = await getRepository(User).findOne({
      where: { id: req.payload?.userId },
    });
    if (user) {
      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword)
        return { error: { field: "password", message: "Wrong password." } };

      if (!validatePassword(newPassword))
        return {
          error: { field: "password", message: "Password should be stronger." },
        };

      if (newPassword !== confirmPassword)
        return {
          error: {
            field: "confirmPassword",
            message: "Passwords do not match.",
          },
        };

      await queryBuilder
        .update()
        .set({ password: await hash(newPassword, 12) })
        .where("id = :id", { id: req.payload?.userId })
        .returning("*")
        .execute();
      return { successMessage: "Password has been successfully updated." };
    }
    return {
      error: { message: "User not found." },
    };
  }

  @UseMiddleware(auth)
  @Mutation(() => Boolean)
  async deleteUser(@Ctx() { req }: MyContext): Promise<boolean> {
    const user = await getRepository(User).findOne(req.payload?.userId);
    if (user) {
      await rmdir(
        path.join(__dirname, `../../public/images/u/${user.username}`)
      );
      await getRepository(User)
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id: req.payload?.userId })
        .execute();
      return true;
    }
    return false;
  }

  @Mutation(() => User, { nullable: true })
  async authGoogle(@Arg("token") token: string) {
    const payload = decode(token) as any;
    if (payload) {
      const { email, name, picture } = payload;
      const queryBuilder = getRepository(User).createQueryBuilder();
      const user = await queryBuilder
        .where("username = :name OR email = :email", { name, email })
        .getOne();
      if (user) return user;
      const newUser = await queryBuilder
        .insert()
        .into(User)
        .values({
          username: name,
          email,
          imageUrl: picture,
          isConfirmed: true,
          password: await hash(randomBytes(16).toString("hex"), 12),
        })
        .returning("*")
        .execute();
      return newUser.raw[0];
    }
  }
}
