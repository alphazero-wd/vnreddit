import { NextPage } from "next";
import { BsChatSquare, BsDot } from "react-icons/bs";
import Comment from "../../components/comment/Comment";
import Link from "next/link";
import { useMeQuery, usePostQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import EditDeleteBtn from "../../components/post/EditDeleteBtn";
import VoteBtn from "../../components/post/VoteBtn";
import CommentForm from "../../components/comment/CommentForm";
import { formatNumber } from "../../utils/formatNumber";
import Loading from "../../components/shared/Loading";
import HeadPage from "../../components/html/Head";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: user } = useMeQuery();

  const { data, loading } = usePostQuery({
    variables: {
      postId: id as string,
    },
  });

  return (
    <>
      <HeadPage
        title={loading || !data?.post ? "Loading..." : data.post.title}
      />
      <div className="container w-full md:w-2/3">
        {loading && <Loading />}
        <div className="bg-white">
          <div className="flex mb-3 rounded-md">
            {data?.post && <VoteBtn post={data.post} />}
            <div className="flex-grow p-3 bg-white ">
              <small className="text-gray-600">
                {data?.post?.community &&
                  router.pathname !== "/vr/[community]" && (
                    <Link passHref href={`/vr/${data?.post.community?.name}`}>
                      <span className="font-bold text-black hover:underline cursor-pointer">
                        {`vr/${data?.post.community.name}`}
                        <BsDot className="inline" />
                      </span>
                    </Link>
                  )}
                Posted by{" "}
                <Link href={`/u/profile/${data?.post?.creator.username}`}>
                  <a className="hover:underline">
                    u/{data?.post?.creator.username}
                  </a>
                </Link>{" "}
                {moment(data?.post?.createdAt).fromNow()}
              </small>
              <h2 className="mb-2 text-2xl font-bold">{data?.post?.title}</h2>
              <ReactMarkdown className="markdown">
                {data?.post?.body || ""}
              </ReactMarkdown>
              <div className="lg:flex justify-between items-center mt-4">
                <div className="flex items-center text-gray-600 font-semibold">
                  <BsChatSquare className="mr-2 text-xl" />
                  <small>
                    {formatNumber(data?.post?.numberOfComments || 0)} comments
                  </small>
                </div>
                {data?.post?.creator.id === user?.me?.id && (
                  <EditDeleteBtn id={id as string} />
                )}
              </div>
            </div>
          </div>
          <div className="h-1 my-2 bg-gray-600 w-full"></div>
          <CommentForm id={id as string} />
          {data?.post?.comments.map((comment) => (
            <Comment id={id as string} key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
};
export default PostPage;
