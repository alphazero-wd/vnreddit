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
