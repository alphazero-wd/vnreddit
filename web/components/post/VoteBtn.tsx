import { FC } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
  point?: number;
  userId?: string;
  me?:
    | {
        __typename?: "User" | undefined;
        id: string;
        username: string;
        email: string;
        createdAt: any;
        posts: {
          __typename?: "Post" | undefined;
          id: string;
          title: string;
          body?: string | null | undefined;
          createdAt: any;
        }[];
      }
    | null
    | undefined;
  totalVotes: number;
}

const VoteBtn: FC<Props> = ({ me, point, totalVotes, userId }) => {
  return (
    <div className="text-gray-700 flex flex-col bg-gray-100 dark:bg-gray-900 items-center p-3">
      <button
        className={`border-none ${
          point === 1 && userId === me?.id
            ? "text-red-600 bg-gray-200"
            : "hover:text-red-600 hover:bg-gray-200"
        }  mb-3  dark:text-gray-500 dark:hover:text-red-600 rounded-sm p-2 text-3xl`}
        disabled={!me && true}
      >
        <FaChevronUp />
      </button>
      <span className="font-semibold text-md dark:text-white">
        {totalVotes}
      </span>
      <button
        className={`${
          point === -1 && userId === me?.id
            ? "dark:text-blue-600 text-blue-600 bg-gray-200"
            : "dark:hover:text-blue-600 hover:bg-gray-200"
        } mt-3 text-gray-700 dark:text-gray-500 border-none rounded-sm p-2 text-3xl`}
        disabled={!me && true}
      >
        <FaChevronDown />
      </button>
    </div>
  );
};

export default VoteBtn;
