import { PostFragment } from "../generated/graphql";

export interface CommunityProps {
  __typename?: "Community" | undefined;
  id: string;
  name: string;
  createdAt: any;
  description?: string | null | undefined;
  numberOfMembers: number;
  members: {
    __typename?: "User" | undefined;
    id: string;
    username: string;
    createdAt: any;
  }[];
  posts: PostFragment[];
}
