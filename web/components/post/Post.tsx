import { FC } from "react";
import { BsChatSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import VoteBtn from "./VoteBtn";

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
    votes: {
      userId: string;
      point: number;
    }[];
  };
  loading?: boolean;
}

const Post: FC<Props> = ({ post, loading }) => {
  const router = useRouter();

  return (
    <div
      className={`${
        loading ? "animate-pulse" : ""
      } bg-white flex mb-3 rounded-md `}
    >
      <VoteBtn post={post} />
      <div
        className="cursor-pointer flex-grow p-3 dark:text-white dark:bg-gray-800"
        onClick={() => router.push(`/posts/${post.id}`)}
      >
        <small className="text-gray-600">
          Posted by u/{post.creator.username} {moment(post.createdAt).fromNow()}
        </small>
        <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
        <ReactMarkdown>{post.body || ""}</ReactMarkdown>
        <button className="flex mt-3 justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-400">
          <BsChatSquare className="mr-2 text-xl" />
          <small>5.5k comments</small>
        </button>
      </div>
    </div>
  );
};

export default Post;
