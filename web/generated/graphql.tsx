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

export type CreatePostInput = {
  body?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
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

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostResponse;
  deletePost: Scalars['Boolean'];
  editPost: PostResponse;
  login: UserResponse;
  signup: UserResponse;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationEditPostArgs = {
  post: EditPostInput;
};


export type MutationLoginArgs = {
  user: LoginInput;
};


export type MutationSignupArgs = {
  user: SignupInput;
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  error?: Maybe<ErrorResponse>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  posts: Array<Post>;
};

export type SignupInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<ErrorResponse>;
  user?: Maybe<User>;
};

export type UserFragmentFragment = { __typename?: 'User', id: string, username: string, email: string, createdAt: any };

export type UserResponseFragmentFragment = { __typename?: 'UserResponse', user?: { __typename?: 'User', token: string, id: string, username: string, email: string, createdAt: any } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined };

export type LoginMutationVariables = Exact<{
  user: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', token: string, id: string, username: string, email: string, createdAt: any } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };

export type SignupMutationVariables = Exact<{
  user: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', user?: { __typename?: 'User', token: string, id: string, username: string, email: string, createdAt: any } | null | undefined, error?: { __typename?: 'ErrorResponse', field?: string | null | undefined, message: string } | null | undefined } };



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
  CreatePostInput: CreatePostInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EditPostInput: EditPostInput;
  ErrorResponse: ResolverTypeWrapper<ErrorResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostResponse: ResolverTypeWrapper<PostResponse>;
  Query: ResolverTypeWrapper<{}>;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreatePostInput: CreatePostInput;
  DateTime: Scalars['DateTime'];
  EditPostInput: EditPostInput;
  ErrorResponse: ErrorResponse;
  ID: Scalars['ID'];
  LoginInput: LoginInput;
  Mutation: {};
  Post: Post;
  PostResponse: PostResponse;
  Query: {};
  SignupInput: SignupInput;
  String: Scalars['String'];
  User: User;
  UserResponse: UserResponse;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorResponse'] = ResolversParentTypes['ErrorResponse']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<ResolversTypes['PostResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'post'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  editPost?: Resolver<ResolversTypes['PostResponse'], ParentType, ContextType, RequireFields<MutationEditPostArgs, 'post'>>;
  login?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'user'>>;
  signup?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'user'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostResponse'] = ResolversParentTypes['PostResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['ErrorResponse']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  ErrorResponse?: ErrorResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostResponse?: PostResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};


export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
  createdAt
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on UserResponse {
  user {
    ...UserFragment
    token
  }
  error {
    field
    message
  }
}
    ${UserFragmentFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($user: LoginInput!) {
  login(user: $user) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;
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
export const SignupDocument = gql`
    mutation Signup($user: SignupInput!) {
  signup(user: $user) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;
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