import { internet, name } from "faker";
import {
  CONFIRM_USER_MUTATION,
  DELETE_USER_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  LOGIN_MUTATION,
  RESET_PASSWORD_MUTATION,
  SEND_CONFIRMATION_EMAIL_MUTATION,
  SIGNUP_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  UPDATE_USERNAME_MUTATION,
} from "../test-utils/graphql/mutations/User";
import { graphqlCall } from "../test-utils/graphqlCall";
import { SignupInput } from "../types/User";
import { Connection, getRepository } from "typeorm";
import { testConnection } from "../test-utils/testConnection";
import { User } from "../entity/User";
import { createAccessToken, createRefreshToken } from "../utils/token";
import { ME_QUERY } from "../test-utils/graphql/queries/User";
import { compare } from "bcryptjs";
import { Post } from "../entity/Post";
import {
  CREATE_POST_MUTATION,
  EDIT_POST_MUTATION,
  DELETE_POST_MUTATION,
} from "../test-utils/graphql/mutations/Post";
import { POSTS_QUERY, POST_QUERY } from "../test-utils/graphql/queries/Post";
import { CreatePostInput, EditPostInput } from "../types/Post";
import { VOTE_MUTATION } from "../test-utils/graphql/mutations/Vote";

let connection: Connection;
beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

describe("user resolvers", () => {
  test("should sign up a user", async () => {
    const testPassword = "#$QRASDKJFasjfkluqri3qj4QRWaerjqwoiru";
    const user = {
      username: name.firstName(),
      email: internet.email(),
      password: testPassword,
      confirmPassword: testPassword,
    } as SignupInput;
    const response = await graphqlCall({
      source: SIGNUP_MUTATION,
      variableValues: {
        user,
      },
    });
    const newUser = response?.data?.signup.user;

    expect(response).toMatchObject({
      data: {
        signup: {
          user: {
            id: newUser?.id,
            username: newUser?.username,
            createdAt: newUser?.createdAt,
            isConfirmed: false,
            token: newUser?.token,
          },
          error: null,
        },
      },
    });
  });

  test("should be able to login", async () => {
    const user = await getRepository(User).findOne(1);

    const testPassword = "#$QRASDKJFasjfkluqri3qj4QRWaerjqwoiru";
    const response = await graphqlCall({
      source: LOGIN_MUTATION,
      variableValues: {
        user: {
          usernameOrEmail: user?.email,
          password: testPassword,
        },
      },
    });
    expect(response).toMatchObject({
      data: {
        login: {
          user: {
            id: user?.id.toString(),
            username: user?.username,
            createdAt: user?.createdAt.toJSON(),
            isConfirmed: false,
            token: createAccessToken(user!),
          },
          error: null,
        },
      },
    });
  });

  test("me query", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: ME_QUERY,
      token: createAccessToken(user!),
    });
    expect(response).toMatchObject({
      data: {
        me: {
          id: user?.id.toString(),
          username: user?.username,
          createdAt: user?.createdAt.toJSON(),
          isConfirmed: false,
        },
      },
    });
  });

  test("forgot password", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: FORGOT_PASSWORD_MUTATION,
      variableValues: {
        email: user?.email,
      },
    });
    expect(response).toMatchObject({
      data: {
        forgotPassword: {
          successMessage: `A verification message has been sent to email ${user?.email}.`,
          error: null,
        },
      },
    });
  });

  test("reset password", async () => {
    const user = await getRepository(User).findOne(1);
    const newTestPassword = "#@$@ASFjasdklf3u49iqjriajisjfmiansf";
    const response = await graphqlCall({
      source: RESET_PASSWORD_MUTATION,
      variableValues: {
        payload: {
          token: createRefreshToken(user!),
          password: newTestPassword,
          confirmPassword: newTestPassword,
        },
      },
    });
    const updatedUser = await getRepository(User).findOne(1);
    const token = response.data?.resetPassword.user.token;
    expect(response).toMatchObject({
      data: {
        resetPassword: {
          user: {
            id: user?.id.toString(),
            username: user?.username,
            createdAt: user?.createdAt.toJSON(),
            isConfirmed: false,
            token,
          },
        },
      },
    });
    expect(compare(updatedUser!.password, newTestPassword)).toBeTruthy();
  });

  test("update username", async () => {
    const user = await getRepository(User).findOne(1);
    const newUsername = name.firstName();
    const response = await graphqlCall({
      source: UPDATE_USERNAME_MUTATION,
      variableValues: {
        username: newUsername,
      },
      token: createAccessToken(user!),
    });

    const updatedUser = await getRepository(User).findOne(1);

    expect(response).toMatchObject({
      data: {
        updateUsername: {
          successMessage: "Username has been successfully updated.",
          error: null,
        },
      },
    });

    expect(updatedUser?.username).toBe(newUsername);
  });

  test("update password", async () => {
    const user = await getRepository(User).findOne(1);
    const password = "#@$@ASFjasdklf3u49iqjriajisjfmiansf";
    const newPassword = "AF#$@#AFkjfdje3294829";
    const response = await graphqlCall({
      source: UPDATE_PASSWORD_MUTATION,
      variableValues: {
        password,
        newPassword,
        confirmPassword: newPassword,
      },
      token: createAccessToken(user!),
    });
    const updatedUser = await getRepository(User).findOne(1);

    expect(response).toMatchObject({
      data: {
        updatePassword: {
          successMessage: "Password has been successfully updated.",
          error: null,
        },
      },
    });

    expect(compare(newPassword, updatedUser!.password)).toBeTruthy();
  });

  test("send confirmation email", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: SEND_CONFIRMATION_EMAIL_MUTATION,
      token: createAccessToken(user!),
    });
    expect(response).toMatchObject({
      data: {
        sendConfirmationEmail: true,
      },
    });
  });

  test("confirm user", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: CONFIRM_USER_MUTATION,
      variableValues: {
        token: createRefreshToken(user!),
      },
    });
    const confirmedUser = await getRepository(User).findOne(1);
    expect(response).toMatchObject({
      data: {
        confirmUser: true,
      },
    });
    expect(confirmedUser?.isConfirmed).toBeTruthy();
  });
});

describe("post resolvers", () => {
  test("posts", async () => {
    const posts = await getRepository(Post).find();
    const response = await graphqlCall({
      source: POSTS_QUERY,
      variableValues: {
        limit: 15,
        cursor: null,
      },
    });

    expect(response).toMatchObject({
      data: {
        posts: {
          hasMore: false,
          posts: [],
        },
      },
    });
    expect(posts.length).toBe(0);
  });

  test("get a post", async () => {});

  test("create a post", async () => {
    const post = {
      title: "My first post",
      body: "adjfkladsjfkladsjflkjewalrkje",
    } as CreatePostInput;
    const user = await getRepository(User).findOne(1);

    const response = await graphqlCall({
      variableValues: {
        post,
      },
      source: CREATE_POST_MUTATION,
      token: createAccessToken(user!),
    });
    const newPost = response.data?.createPost.post;

    expect(response).toMatchObject({
      data: {
        createPost: {
          post: {
            id: newPost?.id.toString(),
            title: newPost?.title,
            body: newPost?.body,
            createdAt: newPost?.createdAt,
            creator: {
              id: user!.id.toString(),
              username: user!.username,
            },
          },
          error: null,
        },
      },
    });
  });

  test("edit a post", async () => {
    const user = await getRepository(User).findOne(1);
    const updatedPostInput = {
      id: "1",
      title: "My first updated post",
      body: "ddajskluoqj34lkmdsafklkadsfmaklsj3qkl4jqkwl3jrlkasdjfajl",
    } as EditPostInput;
    const response = await graphqlCall({
      source: EDIT_POST_MUTATION,
      variableValues: {
        post: updatedPostInput,
      },
      token: createAccessToken(user!),
    });
    const updatedPost = await getRepository(Post).findOne(1);
    expect(response).toMatchObject({
      data: {
        editPost: {
          post: {
            id: updatedPost?.id.toString(),
            title: updatedPost?.title,
            body: updatedPost?.body,
            createdAt: updatedPost?.createdAt.toJSON(),
            creator: {
              id: user!.id.toString(),
              username: user!.username,
            },
          },
          error: null,
        },
      },
    });
  });
});

describe("vote resolver", () => {
  test("upvote a post", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: VOTE_MUTATION,
      variableValues: {
        postId: "1",
        point: 1,
      },
      token: createAccessToken(user!),
    });

    const res = await graphqlCall({
      source: POST_QUERY,
      variableValues: {
        id: "1",
      },
    });

    const post = res.data?.post;

    expect(response).toMatchObject({
      data: {
        vote: true,
      },
    });

    expect(post?.votes).toEqual([
      {
        postId: post?.id.toString(),
        userId: user?.id.toString(),
        point: 1,
      },
    ]);

    expect(post?.points).toBe(1);
  });
});

describe("delete mutations", () => {
  test("delete a post", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: DELETE_POST_MUTATION,
      variableValues: {
        id: "1",
      },
      token: createAccessToken(user!),
    });
    const posts = await getRepository(Post).find();

    const deletedPost = await getRepository(Post).findOne(1);
    expect(response).toMatchObject({
      data: {
        deletePost: true,
      },
    });
    expect(deletedPost).toBeUndefined();
    expect(posts.length).toBe(0);
  });
  test("delete user", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: DELETE_USER_MUTATION,
      token: createAccessToken(user!),
    });
    const deletedUser = await getRepository(User).findOne(1);
    expect(response).toMatchObject({
      data: {
        deleteUser: true,
      },
    });

    expect(deletedUser).toBeUndefined();
  });
});
