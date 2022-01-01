import { ERROR_FRAGMENT } from "../fragments";

export const CREATE_POST_MUTATION = `
mutation($post: CreatePostInput!) {
  createPost(post: $post) {
    post {
      id
      title
      body
      createdAt
      creator {
        id
        username
      }
    }
    error {
      ${ERROR_FRAGMENT}
    }
  }
}
`;

export const EDIT_POST_MUTATION = `
  mutation($post: EditPostInput!) {
    editPost(post: $post) {
      post {
        id
        title
        body
        createdAt
        creator {
          id
          username
        }
      }
      error {
        ${ERROR_FRAGMENT}
      }
    }
  }
`;

export const DELETE_POST_MUTATION = `
  mutation($id: String!) {
    deletePost(id: $id)
  }
`;
