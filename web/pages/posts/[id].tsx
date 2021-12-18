import { NextPage } from "next";
import { BsChatSquare } from "react-icons/bs";
import Comment from "../../components/shared/Comment";
import Link from "next/link";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostQuery,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import EditDeleteBtn from "../../components/post/EditDeleteBtn";
import VoteBtn from "../../components/post/VoteBtn";

const PostPage: NextPage = () => {
  const router = useRouter();
  const [deletePost] = useDeletePostMutation();
  const { id } = router.query;
  const { data: user } = useMeQuery();

  const { data, loading } = usePostQuery({
    variables: {
      postId: id as string,
    },
  });

  return (
    <div className="container w-full md:w-2/3">
      <div className="bg-white dark:bg-gray-900 dark:text-white">
        <div
          className={`flex mb-3 rounded-md ${loading ? "animate-pulse" : ""}`}
        >
          {data?.post && <VoteBtn post={data.post} />}
          <div className="flex-grow p-3 bg-white dark:bg-gray-900">
            <small className="text-gray-600">
              Posted by{" "}
              <Link href="/u/alphazero">
                <a className="hover:underline">
                  u/{data?.post?.creator.username}
                </a>
              </Link>{" "}
              {moment(data?.post?.createdAt).fromNow()}
            </small>
            <h2 className="mb-2 text-2xl font-bold">{data?.post?.title}</h2>
            <ReactMarkdown>{data?.post?.body || ""}</ReactMarkdown>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center text-gray-600 font-semibold">
                <BsChatSquare className="mr-2 text-xl" />
                <small>5.5k comments</small>
              </div>
              {data?.post?.creator.id === user?.me?.id && (
                <EditDeleteBtn id={id as string} deletePost={deletePost} />
              )}
            </div>
          </div>
        </div>
        <div className="h-2 my-2 bg-gray-400 w-full"></div>
        <Comment />
      </div>
    </div>
  );
};
export default PostPage;
