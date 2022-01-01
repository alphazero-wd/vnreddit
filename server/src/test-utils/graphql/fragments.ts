export const USER_FRAGMENT = `
  id
  username
  isConfirmed
  createdAt
`;

export const ERROR_FRAGMENT = `
  field
  message
`;

export const POST_FRAGMENT = `
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
      postId
      userId
      point
    }
    comments {
      id
      body
      createdAt
      commentator {
        id
        username
      }
    }
    community {
      id
      name
    }
    votes {
      postId
      userId
      point
    }
`;

export const COMMENT_FRAGMENT = `
      id
      body
      createdAt
      commentator {
        id
        username
      }
`;
