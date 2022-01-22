import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import HeadPage from "../components/html/Head";
import Post from "../components/post/Post";
import Loading from "../components/shared/Loading";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import character from "../images/vnreddit.svg";
import InfiniteScroll from "react-infinite-scroll-component";

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
      <div className="md:container lg:grid grid-cols-12 gap-4 w-full xl:w-5/6">
        <div className="col-span-8">
          {user?.me && (
            <Link passHref href="/post/create">
              <button className="border mb-3 border-gray-300 px-3 py-2 hover:bg-gray-300 transition-colors flex w-full items-center rounded-md">
                <button className="bg-blue-200 rounded-full p-2 mr-3">
                  <AiOutlinePlus className="text-blue-500 text-2xl" />
                </button>
                Create post
              </button>
            </Link>
          )}
          <InfiniteScroll
            hasMore={data?.posts.hasMore || false}
            loader={<Loading />}
            dataLength={data?.posts.posts.length || 0}
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
        <div className="col-span-4 hidden lg:inline-block bg-white mt-3 border border-gray-600 rounded-md">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-11 h-auto mr-1 object-cover">
                <Image src={character} alt="Character" />
              </div>
              <b className="block">Home</b>
            </div>
            <p className="mb-3">
              Your personal VnReddit frontpage. Come here to check in with your
              favorite communities.
            </p>
            <Link passHref href="/post/create">
              <button className="primary-btn block w-full mb-3">
                Create Post
              </button>
            </Link>
            <Link passHref href="/vr/create">
              <button className="secondary-btn block w-full">
                Create Community
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
