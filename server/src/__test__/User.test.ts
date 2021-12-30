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
} from "../graphql/mutations/User";
import { graphqlCall } from "../test-utils/graphqlCall";
import { SignupInput } from "../types/User";
import { Connection, getRepository } from "typeorm";
import { testConnection } from "../test-utils/testConnection";
import { User } from "../entity/User";
import { createAccessToken, createRefreshToken } from "../utils/token";
import { ME_QUERY } from "../graphql/queries/User";
import { compare } from "bcryptjs";

let connection: Connection;
beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

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
          id: newUser.id.toString(),
          username: user.username,
          createdAt: newUser.createdAt,
          isConfirmed: false,
          token: newUser.token,
        },
        error: null,
      },
    },
  });
});

test("should be able to login", async () => {
  const user = await getRepository(User).findOne(1);
  const testPassword = "#$QRASDKJFasjfkluqri3qj4QRWaerjqwoiru";
  if (user) {
    const response = await graphqlCall({
      source: LOGIN_MUTATION,
      variableValues: {
        user: {
          usernameOrEmail: user.email,
          password: testPassword,
        },
      },
    });
    expect(response).toMatchObject({
      data: {
        login: {
          user: {
            id: user.id.toString(),
            username: user.username,
            createdAt: user.createdAt.toJSON(),
            isConfirmed: false,
            token: createAccessToken(user),
          },
          error: null,
        },
      },
    });
  }
});

test("me query", async () => {
  const user = await getRepository(User).findOne(1);
  if (user) {
    const response = await graphqlCall({
      source: ME_QUERY,
      token: createAccessToken(user),
    });
    expect(response).toMatchObject({
      data: {
        me: {
          id: user.id.toString(),
          username: user.username,
          createdAt: user.createdAt.toJSON(),
          isConfirmed: false,
        },
      },
    });
  }
});

test("forgot password", async () => {
  const user = await getRepository(User).findOne(1);
  if (user) {
    const response = await graphqlCall({
      source: FORGOT_PASSWORD_MUTATION,
      variableValues: {
        email: user.email,
      },
    });
    expect(response).toMatchObject({
      data: {
        forgotPassword: {
          successMessage: `A verification message has been sent to email ${user.email}.`,
          error: null,
        },
      },
    });
  }
});

test("reset password", async () => {
  const user = await getRepository(User).findOne(1);
  const newTestPassword = "#@$@ASFjasdklf3u49iqjriajisjfmiansf";
  if (user) {
    const response = await graphqlCall({
      source: RESET_PASSWORD_MUTATION,
      variableValues: {
        payload: {
          token: createRefreshToken(user),
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
            id: user.id.toString(),
            username: user.username,
            createdAt: user.createdAt.toJSON(),
            isConfirmed: false,
            token,
          },
        },
      },
    });
    expect(compare(updatedUser!.password, newTestPassword)).toBeTruthy();
  }
});

test("update username", async () => {
  const user = await getRepository(User).findOne(1);
  const newUsername = name.firstName();
  if (user) {
    const response = await graphqlCall({
      source: UPDATE_USERNAME_MUTATION,
      variableValues: {
        username: newUsername,
      },
      token: createAccessToken(user),
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
  }
});

test("update password", async () => {
  const user = await getRepository(User).findOne(1);
  const password = "#@$@ASFjasdklf3u49iqjriajisjfmiansf";
  const newPassword = "AF#$@#AFkjfdje3294829";
  if (user) {
    const response = await graphqlCall({
      source: UPDATE_PASSWORD_MUTATION,
      variableValues: {
        password,
        newPassword,
        confirmPassword: newPassword,
      },
      token: createAccessToken(user),
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
  }
});

test("send confirmation email", async () => {
  const user = await getRepository(User).findOne(1);
  if (user) {
    const response = await graphqlCall({
      source: SEND_CONFIRMATION_EMAIL_MUTATION,
      token: createAccessToken(user),
    });
    expect(response).toMatchObject({
      data: {
        sendConfirmationEmail: true,
      },
    });
  }
});

test("confirm user", async () => {
  const user = await getRepository(User).findOne(1);
  if (user) {
    const response = await graphqlCall({
      source: CONFIRM_USER_MUTATION,
      variableValues: {
        token: createRefreshToken(user),
      },
    });
    const confirmedUser = await getRepository(User).findOne(1);
    expect(response).toMatchObject({
      data: {
        confirmUser: true,
      },
    });
    expect(confirmedUser?.isConfirmed).toBeTruthy();
  }
});

test("delete user", async () => {
  const user = await getRepository(User).findOne(1);
  if (user) {
    const response = await graphqlCall({
      source: DELETE_USER_MUTATION,
      token: createAccessToken(user),
    });
    const deletedUser = await getRepository(User).findOne(1);
    expect(response).toMatchObject({
      data: {
        deleteUser: true,
      },
    });
    const users = await getRepository(User).find();

    expect(deletedUser).toBeUndefined();
    expect(users.length).toBe(0);
  }
});
