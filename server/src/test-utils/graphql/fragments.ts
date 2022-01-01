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
    community {
      id
      name
    }
`;
export const VOTE_FRAGMENT = `
      postId
      userId
      point
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

export const COMMUNITY_FRAGMENT = `
  id
  name
  description
  numberOfMembers
  members {
    id
    username
  }
  posts {
    id
    title
    body
    createdAt
    creator {
      id
      username
    }
  }
`;
