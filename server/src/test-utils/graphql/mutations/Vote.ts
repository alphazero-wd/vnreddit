export const VOTE_MUTATION = `
    mutation Vote($postId: String!, $point: Int!) {
        vote(postId: $postId, point: $point) 
    }
`;
