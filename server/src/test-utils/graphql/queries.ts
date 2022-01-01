import {
  COMMENT_FRAGMENT,
  COMMUNITY_FRAGMENT,
  POST_FRAGMENT,
  USER_FRAGMENT,
  VOTE_FRAGMENT,
} from "./fragments";

export const COMMUNITY_QUERY = `query ($name: String!) {
  community(name: $name) {
      ${COMMUNITY_FRAGMENT}
  }
}`;

export const ME_QUERY = `
  {
    me {
      ${USER_FRAGMENT}
    }
} 
`;

export const POSTS_QUERY = `
    query($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore 
    posts {
      ${POST_FRAGMENT}
      votes {
        ${VOTE_FRAGMENT}
      }
    }
  }
}
`;

export const POST_QUERY = `
query($id: String!) {
  post(id: $id) {
    ${POST_FRAGMENT}
    comments {
      ${COMMENT_FRAGMENT}
    }
    votes {
      ${VOTE_FRAGMENT}
    }
  }
}
`;
