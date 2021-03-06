import { compare } from "bcryptjs";
import { internet, name } from "faker";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Comment } from "../entity/Comment";
import {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
  UPDATE_USERNAME_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  SEND_CONFIRMATION_EMAIL_MUTATION,
  CONFIRM_USER_MUTATION,
  CREATE_POST_MUTATION,
  EDIT_POST_MUTATION,
  CREATE_COMMENT_MUTATION,
  EDIT_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  CREATE_COMMUNITY_MUTATION,
  DELETE_POST_MUTATION,
  DELETE_USER_MUTATION,
  VOTE_MUTATION,
  JOIN_COMMUNITY_MUTATION,
  LEAVE_COMMUNITY_MUTATION,
  ADD_DESCRIPTION_MUTATION,
} from "../test-utils/graphql/mutations";
import {
  COMMUNITY_QUERY,
  ME_QUERY,
  POSTS_QUERY,
  POST_QUERY,
} from "../test-utils/graphql/queries";
import { graphqlCall } from "../test-utils/graphqlCall";
import { testConnection } from "../test-utils/testConnection";
import { CreateCommentInput, EditCommentInput } from "../types/Comment";
import { CreatePostInput, EditPostInput } from "../types/Post";
import { SignupInput } from "../types/User";
import { createAccessToken, createRefreshToken } from "../utils/token";
import { Connection, getRepository } from "typeorm";
import { Community } from "../entity/Community";

let connection: Connection;
beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

// ------------------UserResolver----------------------
describe("user resolvers", () => {
  test("should should sign up a user", async () => {
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

  test("should should be able to login", async () => {
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

  test("should me query", async () => {
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

  test("should forgot password", async () => {
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

  test("should reset password", async () => {
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

  test("should update username", async () => {
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

  test("should update password", async () => {
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

  test("should send confirmation email", async () => {
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

  test("should confirm user", async () => {
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

// ------------------PostResolver----------------------
describe("post resolvers", () => {
  test("should posts", async () => {
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

  test("should get a post", async () => {});

  test("should create a post", async () => {
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

  test("should edit a post", async () => {
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

// ------------------CommentResolver----------------------
describe("comment resolvers", () => {
  test("should create a comment", async () => {
    const user = await getRepository(User).findOne(1);
    const payload = {
      postId: "1",
      body: "ajskldfjewklrjalskfjladsjflkasjrlkaewjrlkj",
    } as CreateCommentInput;
    const response = await graphqlCall({
      source: CREATE_COMMENT_MUTATION,
      variableValues: {
        payload,
      },
      token: createAccessToken(user!),
    });
    const res = await graphqlCall({
      source: POST_QUERY,
      variableValues: {
        id: "1",
      },
    });

    const comment = await getRepository(Comment).findOne(1);
    const post = res.data?.post;
    const expectedComment = {
      id: comment?.id.toString(),
      body: comment?.body,
      createdAt: comment?.createdAt.toJSON(),
      commentator: {
        id: user?.id.toString(),
        username: user?.username,
      },
    };

    expect(response).toMatchObject({
      data: {
        createComment: {
          comment: expectedComment,
          error: null,
        },
      },
    });

    expect(post?.comments).toEqual([{ ...expectedComment }]);
  });

  test("should edit a comment", async () => {
    const payload = {
      commentId: "1",
      body: "sdklfjaskldfjakljrio3u4adfkljadklfj",
    } as EditCommentInput;
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: EDIT_COMMENT_MUTATION,
      variableValues: {
        payload,
      },
      token: createAccessToken(user!),
    });
    const comment = await getRepository(Comment).findOne(1);

    const expectedComment = {
      id: comment?.id.toString(),
      body: payload.body,
      createdAt: comment?.createdAt.toJSON(),
      commentator: {
        id: user?.id.toString(),
        username: user?.username,
      },
    };
    const postResponse = await graphqlCall({
      source: POST_QUERY,
      variableValues: { id: "1" },
    });
    const post = postResponse.data?.post;

    expect(response).toMatchObject({
      data: {
        editComment: {
          comment: { ...expectedComment },
          error: null,
        },
      },
    });

    expect(post?.comments).toEqual([
      {
        ...expectedComment,
      },
    ]);
    expect(post?.comments.length).toBe(1);
  });

  test("should delete a comment", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: DELETE_COMMENT_MUTATION,
      variableValues: {
        id: "1",
      },
      token: createAccessToken(user!),
    });

    const postResponse = await graphqlCall({
      source: POST_QUERY,
      variableValues: {
        id: "1",
      },
    });
    const post = postResponse.data?.post;

    const deletedComment = await getRepository(Comment).findOne(1);

    expect(response).toMatchObject({
      data: {
        deleteComment: true,
      },
    });

    expect(deletedComment).toBeUndefined();
    expect(post?.comments.length).toBe(0);
  });
});

// -----------------------VoteResolver------------------
describe("vote resolver", () => {
  test("should upvote a post", async () => {
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

  test("should downvote a post", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: VOTE_MUTATION,
      variableValues: {
        postId: "1",
        point: -1,
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
        point: -1,
      },
    ]);

    expect(post?.points).toBe(-1);
  });

  test("should cancel a vote", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: VOTE_MUTATION,
      variableValues: {
        postId: "1",
        point: 0,
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

    expect(post?.votes).toEqual([]);

    expect(post?.points).toBe(0);
  });
});

// -----------------------CommunityResolver------------------
describe("community resolvers", () => {
  test("should create a community", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: CREATE_COMMUNITY_MUTATION,
      variableValues: {
        name: "fullstack",
      },
      token: createAccessToken(user!),
    });
    const community = await getRepository(Community).findOne(1);

    expect(response).toMatchObject({
      data: {
        createCommunity: {
          community: {
            id: community?.id.toString(),
            name: community?.name,
            description: null,
            numberOfMembers: 0,
            members: [],
            posts: [],
          },
          error: null,
        },
      },
    });
  });

  test("should return a community", async () => {
    const response = await graphqlCall({
      source: COMMUNITY_QUERY,
      variableValues: {
        name: "fullstack",
      },
    });

    expect(response).toMatchObject({
      data: {
        community: {
          id: "1",
          name: "fullstack",
          description: null,
          numberOfMembers: 0,
          members: [],
          posts: [],
        },
      },
    });
  });

  test("should join in a community", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: JOIN_COMMUNITY_MUTATION,
      variableValues: {
        commId: "1",
      },
      token: createAccessToken(user!),
    });
    const { data } = await graphqlCall({
      source: COMMUNITY_QUERY,
      variableValues: {
        name: "fullstack",
      },
    });
    const community = data?.community;

    expect(response).toMatchObject({
      data: {
        joinCommunity: true,
      },
    });

    expect(community?.members).toEqual([
      {
        id: user?.id.toString(),
        username: user?.username,
      },
    ]);

    expect(community?.numberOfMembers).toBe(1);
  });

  test("should leave a community", async () => {
    const user = await getRepository(User).findOne(1);
    const response = await graphqlCall({
      source: LEAVE_COMMUNITY_MUTATION,
      variableValues: {
        commId: "1",
      },
      token: createAccessToken(user!),
    });
    const { data } = await graphqlCall({
      source: COMMUNITY_QUERY,
      variableValues: {
        name: "fullstack",
      },
    });
    const community = data?.community;

    expect(response).toMatchObject({
      data: {
        leaveCommunity: true,
      },
    });

    expect(community?.members).toEqual([]);

    expect(community?.numberOfMembers).toBe(0);
  });

  test("should add a description", async () => {
    const community = {
      id: "1",
      description: "fjaslfkjadslkfjaslfjaksldfj",
    };
    const user = await getRepository(User).findOne(1);

    const response = await graphqlCall({
      source: ADD_DESCRIPTION_MUTATION,
      variableValues: community,
      token: createAccessToken(user!),
    });
    const updatedCommunity = await getRepository(Community).findOne(1);

    expect(response).toMatchObject({
      data: {
        addDescription: {
          community: {
            id: updatedCommunity?.id.toString(),
            name: updatedCommunity?.name,
            description: community.description,
            numberOfMembers: 0,
            members: [],
            posts: [],
          },
          error: null,
        },
      },
    });
  });
});

describe("delete mutations", () => {
  test("should delete a post", async () => {
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
  test("should delete user", async () => {
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
