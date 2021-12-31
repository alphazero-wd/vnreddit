// import { testConnection } from "../test-utils/testConnection";
// import { Connection, getRepository } from "typeorm";
// import { graphqlCall } from "../test-utils/graphqlCall";
// import { CREATE_POST_MUTATION } from "../graphql/mutations/Post";
// import { User } from "../entity/User";
// import { createAccessToken } from "../utils/token";
// // import { VOTE_MUTATION } from "../graphql/mutations/Vote";

// let connection: Connection;

// beforeAll(async () => {
//   connection = await testConnection();
//   const user = await getRepository(User).findOne(2);
//   await graphqlCall({
//     source: CREATE_POST_MUTATION,
//     variableValues: {
//       title: "My second post",
//     },
//     token: createAccessToken(user!),
//   });
// });

// afterAll(async () => {
//   await connection.close();
// });

// test('upvote a post', async () => {
//     const user = await getRepository(User).findOne(2)
//     const response = await graphqlCall({
//         source: VOTE_MUTATION,
//         variableValues: {
//             postId: '2',

//         }
//     })
// })
