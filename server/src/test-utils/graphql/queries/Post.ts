import { POST_FRAGMENT } from "../fragments";

export const POSTS_QUERY = `
    query($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore 
    posts {
      id
      title
      body
      createdAt
    }
  }
}
`;

export const POST_QUERY = `
query($id: String!) {
  post(id: $id) {
    ${POST_FRAGMENT}
  }
}
`;
