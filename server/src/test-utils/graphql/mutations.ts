import {
  COMMENT_FRAGMENT,
  COMMUNITY_FRAGMENT,
  ERROR_FRAGMENT,
  USER_FRAGMENT,
} from "./fragments";

export const SIGNUP_MUTATION = `
mutation($user: SignupInput!) {
  signup(user: $user) {
    user {
      ${USER_FRAGMENT}
      token
    }
    error {
      field
      message
    }
  }
}    
`;

export const LOGIN_MUTATION = `
mutation($user: LoginInput!) {
  login(user: $user) {
    user {
      ${USER_FRAGMENT}
      token
    }
    error {
      field
      message
    }
  }
}
`;

export const FORGOT_PASSWORD_MUTATION = `
mutation ($email: String!) {
  forgotPassword(email: $email) {
    successMessage
    error {
      field
      message
    }
  }
}
`;

export const RESET_PASSWORD_MUTATION = `
mutation ResetPassword($payload: ResetPasswordInput!) {
  resetPassword(payload: $payload) {
    user {
      ${USER_FRAGMENT}
      token
    }
    error {
      field
      message
    }
  }
}
`;

export const UPDATE_USERNAME_MUTATION = `
mutation($username: String!) {
  updateUsername(username: $username) {
    successMessage
    error {
      field
      message
    }
  }
}
`;

export const UPDATE_PASSWORD_MUTATION = `
mutation($confirmPassword: String!, $newPassword: String!, $password: String!) {
  updatePassword(confirmPassword: $confirmPassword, newPassword: $newPassword, password: $password) {
    successMessage
    error {
      field
      message
    }
  }
}
`;

export const DELETE_USER_MUTATION = `
mutation {
  deleteUser
}
`;

export const SEND_CONFIRMATION_EMAIL_MUTATION = `
  mutation {
  sendConfirmationEmail
}
`;

export const CONFIRM_USER_MUTATION = `
  mutation($token: String!) {
  confirmUser(token: $token)
}
`;
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
export const CREATE_COMMENT_MUTATION = `
    mutation($payload: CreateCommentInput!) {
  createComment(payload: $payload) {
    comment {
      ${COMMENT_FRAGMENT}
    }
    error {
        ${ERROR_FRAGMENT}
    }
  }
}
`;

export const EDIT_COMMENT_MUTATION = `
  mutation($payload: EditCommentInput!) {
  editComment(payload: $payload) {
    comment {
      ${COMMENT_FRAGMENT}
    }
    error {
      ${ERROR_FRAGMENT}
    }
  }
}
`;

export const DELETE_COMMENT_MUTATION = `
  mutation($id: String!) {
  deleteComment(commentId: $id)
}
`;

export const CREATE_COMMUNITY_MUTATION = `
mutation($name: String!) {
  createCommunity(name: $name) {
    community { 
       ${COMMUNITY_FRAGMENT}    
    }
    error {
        ${ERROR_FRAGMENT}
    }
  }
}
`;

export const VOTE_MUTATION = `
    mutation ($postId: String!, $point: Int!) {
        vote(postId: $postId, point: $point)
    }
`;

export const JOIN_COMMUNITY_MUTATION = `
mutation ($commId: String!) {
  joinCommunity(commId: $commId)
}
`;

export const LEAVE_COMMUNITY_MUTATION = `
mutation ($commId: String!) {
  leaveCommunity(commId: $commId)
}
`;

export const ADD_DESCRIPTION_MUTATION = `
  mutation($id: String!, $description: String!) {
  addDescription(id: $id, description: $description) {
    community {
      ${COMMUNITY_FRAGMENT}
    }
    error {
      ${ERROR_FRAGMENT}
    }
  }
}

`;
