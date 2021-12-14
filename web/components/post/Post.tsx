import { FC } from "react";
import { BsChatSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { useMeQuery, Vote } from "../../generated/graphql";
import VoteBtn from "./VoteBtn";

interface Props {
  id: string;
  title: string;
  body?: string | null;
  createdAt: any;
  creator: {
    id?: string;
    username: string;
  };
  loading?: boolean;
  votes: Vote[];
  totalVotes: number;
}

const Post: FC<Props> = ({
  id,
  loading,
  title,
  body,
  createdAt,
  creator: { username },
  votes,
  totalVotes,
}) => {
  const router = useRouter();
  const { data } = useMeQuery();
  const vote = votes.find(vote => vote.postId === id);

  return (
    <div
      className={`${
        loading ? "animate-pulse" : ""
      } bg-white flex  mb-3 rounded-md `}
    >
      <VoteBtn
        me={data?.me}
        point={vote?.point}
        totalVotes={totalVotes}
        userId={parseInt(vote?.userId || "")}
      />
      <div
        className="cursor-pointer flex-grow p-3 dark:text-white dark:bg-gray-800"
        onClick={() => router.push(`/posts/${id}`)}
      >
        <small className="text-gray-600">
          Posted by u/{username} {moment(createdAt).fromNow()}
        </small>
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <ReactMarkdown>{body || ""}</ReactMarkdown>
        <button className="flex mt-3 justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-400">
          <BsChatSquare className="mr-2 text-xl" />
          <small>5.5k comments</small>
        </button>
      </div>
    </div>
  );
};

export default Post;
