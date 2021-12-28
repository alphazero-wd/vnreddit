import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  commentator?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  post: Post;
  user: User;
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comment?: Maybe<Comment>;
  error?: Maybe<ErrorResponse>;
};

export type Community = {
  __typename?: 'Community';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  members: Array<User>;
  name: Scalars['String'];
  numberOfMembers: Scalars['Int'];
  posts: Array<Post>;
};

export type CommunityResponse = {
  __typename?: 'CommunityResponse';
  community?: Maybe<Community>;
  error?: Maybe<ErrorResponse>;
};

export type CreateCommentInput = {
  body: Scalars['String'];
  postId: Scalars['String'];
};

export type CreatePostInput = {
  body?: InputMaybe<Scalars['String']>;
  communityId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type EditCommentInput = {
  body: Scalars['String'];
  commentId: Scalars['String'];
};

export type EditPostInput = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  error?: Maybe<ErrorResponse>;
  successMessage?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDescription: CommunityResponse;
  createComment: CommentResponse;
  createCommunity: CommunityResponse;
  createPost: PostResponse;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  editComment: CommentResponse;
  editPost: PostResponse;
  forgotPassword: ForgotPasswordResponse;
  joinCommunity: Scalars['Boolean'];
  leaveCommunity: Scalars['Boolean'];
  login: UserResponse;
  resetPassword: UserResponse;
  signup: UserResponse;
  updatePassword: UserResponse;
  updateUsername: UserResponse;
  vote: Scalars['Boolean'];
};


export type MutationAddDescriptionArgs = {
  description: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  payload: CreateCommentInput;
};


export type MutationCreateCommunityArgs = {
  name: Scalars['String'];
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationEditCommentArgs = {
  payload: EditCommentInput;
};


export type MutationEditPostArgs = {
  post: EditPostInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  commId: Scalars['String'];
};


export type MutationLeaveCommunityArgs = {
  commId: Scalars['String'];
};


export type MutationLoginArgs = {
  user: LoginInput;
};


export type MutationResetPasswordArgs = {
  payload: ResetPasswordInput;
};


export type MutationSignupArgs = {
  user: SignupInput;
};


export type MutationUpdatePasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUsernameArgs = {
  username: Scalars['String'];
};


export type MutationVoteArgs = {
  point: Scalars['Int'];
  postId: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  community?: Maybe<Community>;
  createdAt: Scalars['DateTime'];
  creator: User;
  id: Scalars['ID'];
  numberOfComments: Scalars['Int'];
  points: Scalars['Int'];
  title: Scalars['String'];
  votes: Array<Vote>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  error?: Maybe<ErrorResponse>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  communities: Array<Community>;
  community?: Maybe<Community>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  user?: Maybe<User>;
};


export type QueryCommunitiesArgs = {
  search: Scalars['String'];
};


export type QueryCommunityArgs = {
  name: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type SignupInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  communities: Array<Community>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  posts: Array<Post>;
  token: Scalars['String'];
  username: Scalars['String'];
  votes: Array<Vote>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<ErrorResponse>;
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  point: Scalars['Int'];
  postId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type CommentFragment = { __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined };

export type CommunityFragment = { __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> };

export type ErrorResponseFragment = { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string };

export type PostFragment = { __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined };

export type PostVoteFragment = { __typename?: 'Post', id: string, points: number, votes: Array<{ __typename?: 'Vote', userId: string, point: number }> };

export type UserFragment = { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> };

export type CreateCommentMutationVariables = Exact<{
  payload: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type EditCommentMutationVariables = Exact<{
  payload: EditCommentInput;
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'CommentResponse', comment?: { __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type AddDescriptionMutationVariables = Exact<{
  id: Scalars['String'];
  description: Scalars['String'];
}>;


export type AddDescriptionMutation = { __typename?: 'Mutation', addDescription: { __typename?: 'CommunityResponse', community?: { __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type CreateCommunityMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'CommunityResponse', community?: { __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type JoinCommunityMutationVariables = Exact<{
  commId: Scalars['String'];
}>;


export type JoinCommunityMutation = { __typename?: 'Mutation', joinCommunity: boolean };

export type LeaveCommunityMutationVariables = Exact<{
  commId: Scalars['String'];
}>;


export type LeaveCommunityMutation = { __typename?: 'Mutation', leaveCommunity: boolean };

export type CreatePostMutationVariables = Exact<{
  post: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type EditPostMutationVariables = Exact<{
  post: EditPostInput;
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', successMessage?: string | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type LoginMutationVariables = Exact<{
  user: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type ResetPasswordMutationVariables = Exact<{
  payload: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type SignupMutationVariables = Exact<{
  user: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type UpdatePasswordMutationVariables = Exact<{
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type UpdateUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type VoteMutationVariables = Exact<{
  postId: Scalars['String'];
  point: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type CommunitiesQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type CommunitiesQuery = { __typename?: 'Query', communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> };

export type CommunityQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CommunityQuery = { __typename?: 'Query', community?: { __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> } | null | undefined };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined } | null | undefined };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> } | null | undefined };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, createdAt: any, token: string, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }>, communities: Array<{ __typename?: 'Community', id: string, name: string, createdAt: any, description?: string | null | undefined, numberOfMembers: number, members: Array<{ __typename?: 'User', id: string, username: string, createdAt: any }>, posts: Array<{ __typename?: 'Post', id: string, title: string, body?: string | null | undefined, createdAt: any, points: number, numberOfComments: number, comments: Array<{ __typename?: 'Comment', id: string, body: string, createdAt: any, commentator?: { __typename?: 'User', id: string, username: string } | null | undefined }>, creator: { __typename?: 'User', id: string, username: string }, votes: Array<{ __typename?: 'Vote', userId: string, point: number }>, community?: { __typename?: 'Community', id: string, name: string } | null | undefined }> }> } | null | undefined };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentResponse: ResolverTypeWrapper<CommentResponse>;
  Community: ResolverTypeWrapper<Community>;
  CommunityResponse: ResolverTypeWrapper<CommunityResponse>;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EditCommentInput: EditCommentInput;
  EditPostInput: EditPostInput;
  ErrorResponse: ResolverTypeWrapper<ErrorResponse>;
  ForgotPasswordResponse: ResolverTypeWrapper<ForgotPasswordResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedPosts: ResolverTypeWrapper<PaginatedPosts>;
  Post: ResolverTypeWrapper<Post>;
  PostResponse: ResolverTypeWrapper<PostResponse>;
  Query: ResolverTypeWrapper<{}>;
  ResetPasswordInput: ResetPasswordInput;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  Vote: ResolverTypeWrapper<Vote>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentResponse: CommentResponse;
  Community: Community;
  CommunityResponse: CommunityResponse;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  DateTime: Scalars['DateTime'];
  EditCommentInput: EditCommentInput;
  EditPostInput: EditPostInput;
  ErrorResponse: ErrorResponse;
  ForgotPasswordResponse: ForgotPasswordResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginInput: LoginInput;
  Mutation: {};
  PaginatedPosts: PaginatedPosts;
  Post: Post;
  PostResponse: PostResponse;
  Query: {};
  ResetPasswordInput: ResetPasswordInput;
  SignupInput: SignupInput;
  String: Scalars['String'];
  User: User;
  UserResponse: UserResponse;
  Vote: Vote;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commentator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentResponse'] = ResolversParentTypes['CommentResponse']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numberOfMembers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommunityResponse'] = ResolversParentTypes['CommunityResponse']> = {
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorResponse'] = ResolversParentTypes['ErrorResponse']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForgotPasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForgotPasswordResponse'] = ResolversParentTypes['ForgotPasswordResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  successMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addDescription?: Resolver<ResolversTypes['CommunityResponse'], ParentType, ContextType, RequireFields<MutationAddDescriptionArgs, 'description' | 'id'>>;
  createComment?: Resolver<ResolversTypes['CommentResponse'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'payload'>>;
  createCommunity?: Resolver<ResolversTypes['CommunityResponse'], ParentType, ContextType, RequireFields<MutationCreateCommunityArgs, 'name'>>;
  createPost?: Resolver<ResolversTypes['PostResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'post'>>;
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  editComment?: Resolver<ResolversTypes['CommentResponse'], ParentType, ContextType, RequireFields<MutationEditCommentArgs, 'payload'>>;
  editPost?: Resolver<ResolversTypes['PostResponse'], ParentType, ContextType, RequireFields<MutationEditPostArgs, 'post'>>;
  forgotPassword?: Resolver<ResolversTypes['ForgotPasswordResponse'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  joinCommunity?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationJoinCommunityArgs, 'commId'>>;
  leaveCommunity?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLeaveCommunityArgs, 'commId'>>;
  login?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'user'>>;
  resetPassword?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'payload'>>;
  signup?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'user'>>;
  updatePassword?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'confirmPassword' | 'newPassword' | 'password'>>;
  updateUsername?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUsernameArgs, 'username'>>;
  vote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVoteArgs, 'point' | 'postId'>>;
};

export type PaginatedPostsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedPosts'] = ResolversParentTypes['PaginatedPosts']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numberOfComments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostResponse'] = ResolversParentTypes['PostResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  communities?: Resolver<Array<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunitiesArgs, 'search'>>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityArgs, 'name'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PaginatedPosts'], ParentType, ContextType, RequireFields<QueryPostsArgs, 'limit'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'username'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  communities?: Resolver<Array<ResolversTypes['Community']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = {
  point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CommentResponse?: CommentResponseResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  CommunityResponse?: CommunityResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  ErrorResponse?: ErrorResponseResolvers<ContextType>;
  ForgotPasswordResponse?: ForgotPasswordResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedPosts?: PaginatedPostsResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostResponse?: PostResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
};


export const ErrorResponseFragmentDoc = gql`
    fragment ErrorResponse on ErrorResponse {
  field
  message
}
    `;
export const PostVoteFragmentDoc = gql`
    fragment PostVote on Post {
  id
  points
  votes {
    userId
    point
  }
}
    `;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  title
  body
  createdAt
  creator {
    id
    username
  }
  points
  votes {
    userId
    point
  }
  numberOfComments
  community {
    id
    name
  }
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  body
  createdAt
  commentator {
    id
    username
  }
}
    `;
export const CommunityFragmentDoc = gql`
    fragment Community on Community {
  id
  name
  createdAt
  description
  members {
    id
    username
    createdAt
  }
  posts {
    ...Post
    comments {
      ...Comment
    }
  }
  numberOfMembers
}
    ${PostFragmentDoc}
${CommentFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  createdAt
  token
  posts {
    ...Post
  }
  communities {
    ...Community
  }
}
    ${PostFragmentDoc}
${CommunityFragmentDoc}`;
export const CreateCommentDocument = gql`
    mutation CreateComment($payload: CreateCommentInput!) {
  createComment(payload: $payload) {
    comment {
      ...Comment
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${CommentFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: String!) {
  deleteComment(commentId: $commentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($payload: EditCommentInput!) {
  editComment(payload: $payload) {
    comment {
      ...Comment
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${CommentFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const AddDescriptionDocument = gql`
    mutation AddDescription($id: String!, $description: String!) {
  addDescription(id: $id, description: $description) {
    community {
      ...Community
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${CommunityFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type AddDescriptionMutationFn = Apollo.MutationFunction<AddDescriptionMutation, AddDescriptionMutationVariables>;

/**
 * __useAddDescriptionMutation__
 *
 * To run a mutation, you first call `useAddDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDescriptionMutation, { data, loading, error }] = useAddDescriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<AddDescriptionMutation, AddDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDescriptionMutation, AddDescriptionMutationVariables>(AddDescriptionDocument, options);
      }
export type AddDescriptionMutationHookResult = ReturnType<typeof useAddDescriptionMutation>;
export type AddDescriptionMutationResult = Apollo.MutationResult<AddDescriptionMutation>;
export type AddDescriptionMutationOptions = Apollo.BaseMutationOptions<AddDescriptionMutation, AddDescriptionMutationVariables>;
export const CreateCommunityDocument = gql`
    mutation CreateCommunity($name: String!) {
  createCommunity(name: $name) {
    community {
      ...Community
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${CommunityFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($commId: String!) {
  joinCommunity(commId: $commId)
}
    `;
export type JoinCommunityMutationFn = Apollo.MutationFunction<JoinCommunityMutation, JoinCommunityMutationVariables>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      commId: // value for 'commId'
 *   },
 * });
 */
export function useJoinCommunityMutation(baseOptions?: Apollo.MutationHookOptions<JoinCommunityMutation, JoinCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument, options);
      }
export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = Apollo.MutationResult<JoinCommunityMutation>;
export type JoinCommunityMutationOptions = Apollo.BaseMutationOptions<JoinCommunityMutation, JoinCommunityMutationVariables>;
export const LeaveCommunityDocument = gql`
    mutation LeaveCommunity($commId: String!) {
  leaveCommunity(commId: $commId)
}
    `;
export type LeaveCommunityMutationFn = Apollo.MutationFunction<LeaveCommunityMutation, LeaveCommunityMutationVariables>;

/**
 * __useLeaveCommunityMutation__
 *
 * To run a mutation, you first call `useLeaveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCommunityMutation, { data, loading, error }] = useLeaveCommunityMutation({
 *   variables: {
 *      commId: // value for 'commId'
 *   },
 * });
 */
export function useLeaveCommunityMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCommunityMutation, LeaveCommunityMutationVariables>(LeaveCommunityDocument, options);
      }
export type LeaveCommunityMutationHookResult = ReturnType<typeof useLeaveCommunityMutation>;
export type LeaveCommunityMutationResult = Apollo.MutationResult<LeaveCommunityMutation>;
export type LeaveCommunityMutationOptions = Apollo.BaseMutationOptions<LeaveCommunityMutation, LeaveCommunityMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($post: CreatePostInput!) {
  createPost(post: $post) {
    post {
      ...Post
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${PostFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(id: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($post: EditPostInput!) {
  editPost(post: $post) {
    post {
      ...Post
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${PostFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    successMessage
    error {
      ...ErrorResponse
    }
  }
}
    ${ErrorResponseFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($user: LoginInput!) {
  login(user: $user) {
    user {
      ...User
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${UserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($payload: ResetPasswordInput!) {
  resetPassword(payload: $payload) {
    user {
      ...User
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${UserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($user: SignupInput!) {
  signup(user: $user) {
    user {
      ...User
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${UserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($confirmPassword: String!, $newPassword: String!, $password: String!) {
  updatePassword(
    confirmPassword: $confirmPassword
    newPassword: $newPassword
    password: $password
  ) {
    user {
      ...User
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${UserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      confirmPassword: // value for 'confirmPassword'
 *      newPassword: // value for 'newPassword'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUsernameDocument = gql`
    mutation UpdateUsername($username: String!) {
  updateUsername(username: $username) {
    user {
      ...User
    }
    error {
      ...ErrorResponse
    }
  }
}
    ${UserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export type UpdateUsernameMutationFn = Apollo.MutationFunction<UpdateUsernameMutation, UpdateUsernameMutationVariables>;

/**
 * __useUpdateUsernameMutation__
 *
 * To run a mutation, you first call `useUpdateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsernameMutation, { data, loading, error }] = useUpdateUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUsernameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument, options);
      }
export type UpdateUsernameMutationHookResult = ReturnType<typeof useUpdateUsernameMutation>;
export type UpdateUsernameMutationResult = Apollo.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = Apollo.BaseMutationOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($postId: String!, $point: Int!) {
  vote(postId: $postId, point: $point)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      point: // value for 'point'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const CommunitiesDocument = gql`
    query Communities($search: String!) {
  communities(search: $search) {
    ...Community
  }
}
    ${CommunityFragmentDoc}`;

/**
 * __useCommunitiesQuery__
 *
 * To run a query within a React component, call `useCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunitiesQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useCommunitiesQuery(baseOptions: Apollo.QueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
      }
export function useCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
        }
export type CommunitiesQueryHookResult = ReturnType<typeof useCommunitiesQuery>;
export type CommunitiesLazyQueryHookResult = ReturnType<typeof useCommunitiesLazyQuery>;
export type CommunitiesQueryResult = Apollo.QueryResult<CommunitiesQuery, CommunitiesQueryVariables>;
export const CommunityDocument = gql`
    query Community($name: String!) {
  community(name: $name) {
    ...Community
  }
}
    ${CommunityFragmentDoc}`;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCommunityQuery(baseOptions: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
      }
export function useCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = Apollo.QueryResult<CommunityQuery, CommunityQueryVariables>;
export const PostDocument = gql`
    query Post($postId: String!) {
  post(id: $postId) {
    ...Post
    comments {
      ...Comment
    }
  }
}
    ${PostFragmentDoc}
${CommentFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...Post
    }
  }
}
    ${PostFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;