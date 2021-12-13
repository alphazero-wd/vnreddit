import { FC } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsChatSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";

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
}

const Post: FC<Props> = ({
  id,
  loading,
  title,
  body,
  createdAt,
  creator: { username },
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/posts/${id}`)}
      className={`${
        loading ? "animate-pulse" : ""
      } cursor-pointer bg-white flex  mb-3 rounded-md `}
    >
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900 items-center p-3">
        <button className="border-none vote-btn mb-3 text-gray-700 hover:text-red-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:text-red-600 rounded-sm p-2 text-3xl">
          <FaChevronUp />
        </button>
        <span className="font-semibold text-md dark:text-white">11.4k</span>
        <button className=" hover:text-blue-600 mt-3 text-gray-700 dark:text-gray-500 dark:hover:text-blue-600 border-none hover:bg-gray-200  rounded-sm p-2 text-3xl">
          <FaChevronDown />
        </button>
      </div>
      <div className="flex-grow p-3 dark:text-white dark:bg-gray-800">
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
