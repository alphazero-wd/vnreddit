import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import HeadPage from "../components/html/Head";
import Post from "../components/post/Post";
import Loading from "../components/shared/Loading";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import InfiniteScroll from "react-infinite-scroll-component";
import CreatePostBtn from "../components/post/CreatePostBtn";

const Home: NextPage = () => {
  const { data, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { data: user } = useMeQuery();

  return (
    <>
      <HeadPage title="VnReddit - Share your thoughts" />
      <div className="mx-auto lg:w-3/5">
        {user?.me && <CreatePostBtn />}
        <InfiniteScroll
          hasMore={data?.posts.hasMore || false}
          loader={<Loading />}
          dataLength={data?.posts.posts.length || 0}
          className="mt-3"
          next={() =>
            fetchMore({
              variables: {
                limit: variables?.limit,
                cursor: data?.posts.posts.at(-1)?.createdAt,
              },
            })
          }
        >
          {data?.posts.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
