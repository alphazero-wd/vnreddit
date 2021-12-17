import { ApolloCache } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  useMeQuery,
  useVoteMutation,
  VoteMutation,
  VoteFragment,
  VoteFragmentDoc,
} from "../../generated/graphql";

interface Props {
  post: {
    id: string;
    title: string;
    body?: string | null;
    createdAt: any;
    creator: {
      id?: string;
      username: string;
    };
    points: number;
  };
}

const VoteBtn: FC<Props> = ({ post }) => {
  const { data } = useMeQuery();
  const updateVote = (cache: ApolloCache<VoteMutation>, point: -1 | 0 | 1) => {
    const result = cache.readFragment<VoteFragment>({
      fragment: VoteFragmentDoc,
      id: "Post:" + post.id,
    });

    if (result) {
      cache.writeFragment<VoteFragment>({
        fragment: VoteFragmentDoc,
        data: {
          __typename: "Post",
          points: result.votes.reduce(
            (point, { point: totalPoints }) => totalPoints + point * 2,
            0
          ),
          votes: result.votes.map(vote =>
            vote.postId === post.id && vote.userId === data?.me?.id
              ? {
                  ...vote,
                  point,
                }
              : vote
          ),
        },
      });
    }
  };

  const [vote, { loading }] = useVoteMutation();
  const userVote = data?.me?.votes.find(vote => vote.postId === post.id);

  // check if postId of each vote from the me query matches the postId of each post
  return (
    <div className="text-gray-700 flex flex-col bg-gray-100 dark:bg-gray-900 items-center p-3">
      <button
        className={`border-none ${
          userVote && userVote.point === 1
            ? "text-red-600 bg-gray-200 dark:text-red-600"
            : "hover:text-red-600 hover:bg-gray-200"
        }  mb-3  dark:text-gray-500 dark:hover:text-red-600 rounded-sm p-2 text-3xl`}
        disabled={!data?.me || loading}
        onClick={async () => {
          const realPoint = userVote?.point === 1 ? 0 : 1;
          await vote({
            variables: {
              point: realPoint,
              postId: post.id,
            },
            update: cache => updateVote(cache, realPoint),
          });
        }}
      >
        <FaChevronUp />
      </button>
      <span className="font-semibold text-md dark:text-white">
        {post?.points}
      </span>
      <button
        className={`${
          userVote && userVote.point === -1
            ? "dark:text-blue-600 text-blue-600 bg-gray-200"
            : "dark:hover:text-blue-600 hover:bg-gray-200"
        } mt-3 text-gray-700 dark:text-gray-500 border-none rounded-sm p-2 text-3xl`}
        disabled={!data?.me || loading}
        onClick={async () => {
          const realPoint = userVote?.point === -1 ? 0 : -1;
          await vote({
            variables: {
              point: realPoint,
              postId: post.id,
            },
            update: cache => updateVote(cache, realPoint),
          });
        }}
      >
        <FaChevronDown />
      </button>
    </div>
  );
};

export default VoteBtn;
