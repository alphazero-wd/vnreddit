export const VOTE_MUTATION = `
    mutation($point: Int!, $postId: String!) {
        vote(point: $point, postId: $postId)
    }
`;
