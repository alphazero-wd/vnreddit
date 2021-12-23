import { FC } from "react";
import { BsChatSquare, BsDot } from "react-icons/bs";
import { useRouter } from "next/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import VoteBtn from "./VoteBtn";
import { PostFragment } from "../../generated/graphql";
import Link from "next/link";

interface Props {
  post: PostFragment;
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
      <div className="flex-grow p-3">
        <small className="text-gray-600">
          {post.community && router.pathname !== "/vr/[community]" && (
            <Link href={`/vr/${post.community?.name}`}>
              <span className="hover:underline cursor-pointer">
                {`r/${post.community.name}`}
                <BsDot className="inline" />
              </span>
            </Link>
          )}
          Posted by{" "}
          <Link href={`/u/profile/${post.creator.username}`}>
            <span className="hover:underline cursor-pointer">
              u/{post.creator.username}
            </span>
          </Link>{" "}
          {moment(post.createdAt).fromNow()}
        </small>
        <div
          onClick={() => router.push(`/post/${post.id}`)}
          className="cursor-pointer"
        >
          <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
          <ReactMarkdown>{post.body || ""}</ReactMarkdown>
          <button className="flex mt-3 justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200">
            <BsChatSquare className="mr-2 text-xl" />
            <small>{post.numberOfComments} comments</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
