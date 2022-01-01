import { COMMENT_FRAGMENT, ERROR_FRAGMENT } from "../fragments";

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
