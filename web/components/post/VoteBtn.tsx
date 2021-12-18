import { ApolloCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  PostVoteFragment,
  PostVoteFragmentDoc,
  useMeQuery,
  useVoteMutation,
  VoteMutation,
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
    votes: {
      userId: string;
      point: number;
    }[];
    points: number;
  };
}

const VoteBtn: FC<Props> = ({ post }) => {
  const { data } = useMeQuery();
  const userVote = post.votes.find((vote) => vote.userId === data?.me?.id);
  const router = useRouter();

  const updateVote = (cache: ApolloCache<VoteMutation>, point: -1 | 0 | 1) => {
    let votes: PostVoteFragment["votes"] = [...post.votes];

    if ((point === -1 || point === 1) && userVote) {
      votes =
        post.votes.map((vote) =>
          vote.userId === data?.me?.id
            ? {
                ...vote,
                point,
              }
            : vote
        ) || [];
    } else if ((point === -1 || point === 1) && !userVote) {
      votes = [
        ...votes,
        {
          __typename: "Vote",
          point,
          userId: data?.me?.id || "",
        },
      ];
    } else if (point === 0) {
      votes = post.votes.filter((vote) => vote.userId !== data?.me?.id);
    }
    const points = votes.reduce(
      (point, { point: totalPoint }) => totalPoint + point * 2,
      0
    );

    console.log("votes: ", votes);
    console.log("points: ", points);

    cache.writeFragment<PostVoteFragment>({
      fragment: PostVoteFragmentDoc,
      data: {
        id: post.id,
        __typename: "Post",
        points,
        votes,
      },
    });
  };

  const [vote, { loading }] = useVoteMutation();

  // check if postId of each vote from the me query matches the postId of each post
  return (
    <div className="text-gray-700 flex flex-col bg-gray-100 dark:bg-gray-900 items-center p-3">
      <button
        className={`border-none ${
          userVote && userVote.point === 1
            ? "text-red-600 bg-gray-200 dark:text-red-600"
            : "hover:text-red-600 hover:bg-gray-200"
        }  mb-3  dark:text-gray-500 dark:hover:text-red-600 rounded-sm p-2 text-3xl`}
        disabled={loading}
        onClick={async () => {
          if (!data?.me) {
            router.push("/u/login");
          } else {
            const realPoint = userVote?.point === 1 ? 0 : 1;
            await vote({
              variables: {
                point: realPoint,
                postId: post.id,
              },
              update: (cache) => updateVote(cache, realPoint),
            });
          }
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
        disabled={loading}
        onClick={async () => {
          if (!data?.me) {
            router.push("/u/login");
          } else {
            const realPoint = userVote?.point === -1 ? 0 : -1;
            await vote({
              variables: {
                point: realPoint,
                postId: post.id,
              },
              update: (cache) => updateVote(cache, realPoint),
            });
          }
        }}
      >
        <FaChevronDown />
      </button>
    </div>
  );
};

export default VoteBtn;
