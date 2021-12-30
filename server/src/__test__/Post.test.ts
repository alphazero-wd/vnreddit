import { testConnection } from "../test-utils/testConnection";
import { Connection, getRepository } from "typeorm";
import { Post } from "../entity/Post";
import { graphqlCall } from "../test-utils/graphqlCall";
import { POSTS_QUERY } from "../graphql/queries/Post";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
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
