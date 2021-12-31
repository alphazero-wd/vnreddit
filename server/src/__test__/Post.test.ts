import { testConnection } from "../test-utils/testConnection";
import { Connection, getRepository } from "typeorm";
import { Post } from "../entity/Post";
import { graphqlCall } from "../test-utils/graphqlCall";
import { POSTS_QUERY } from "../graphql/queries/Post";
import { CreatePostInput, EditPostInput } from "../types/Post";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  EDIT_POST_MUTATION,
} from "../graphql/mutations/Post";
import { createAccessToken } from "../utils/token";
import { User } from "../entity/User";
import { SIGNUP_MUTATION } from "../graphql/mutations/User";
import { internet, name } from "faker";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
  const testPassword = "#$QRASDKJFasjfkluqri3qj4QRWaerjqwoiru";
  await graphqlCall({
    source: SIGNUP_MUTATION,
    variableValues: {
      user: {
        username: name.firstName(),
        email: internet.email(),
        password: testPassword,
        confirmPassword: testPassword,
      },
    },
  });
});

afterAll(async () => {
  await connection.close();
});

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

test("create a post", async () => {
  const post = {
    title: "My first post",
    body: "adjfkladsjfkladsjflkjewalrkje",
  } as CreatePostInput;
  const user = await getRepository(User).findOne(2);

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
  const user = await getRepository(User).findOne(2);
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

test("delete a post", async () => {
  const user = await getRepository(User).findOne(2);
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
