import { FC } from "react";
import { BsChatSquare, BsDot } from "react-icons/bs";
import { useRouter } from "next/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import VoteBtn from "./VoteBtn";
import { PostFragment } from "../../generated/graphql";
import Link from "next/link";
import { formatNumber } from "../../utils/formatNumber";

interface Props {
  post: PostFragment;
}

const Post: FC<Props> = ({ post }) => {
  const router = useRouter();

  return (
    <div className="bg-white flex mb-3 rounded-md border hover:border-gray-600">
      <VoteBtn post={post} />
      <div className="flex-grow p-3">
        <small className="text-gray-600">
          {post.community && router.pathname !== "/vr/[community]" && (
            <Link href={`/vr/${post.community?.name}`}>
              <span className="hover:underline font-bold text-gray-900 cursor-pointer">
                {`vr/${post.community.name}`}
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
        <Link href={`/post/${post.id}`}>
          <div className="cursor-pointer">
            <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
            <ReactMarkdown className="markdown">
              {post.body || ""}
            </ReactMarkdown>
            <button className="flex mt-3 justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200">
              <BsChatSquare className="mr-2 text-xl" />
              <small>{formatNumber(post.numberOfComments)} comments</small>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Post;
