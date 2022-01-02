import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Post from "../components/post/Post";
import Loading from "../components/shared/Loading";
import { usePostsQuery } from "../generated/graphql";
import character from "../images/vnreddit.svg";

const Home: NextPage = () => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 3,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const sidebar = useRef<HTMLDivElement>(null);
  const sidebarText = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sidebar.current && sidebarText.current) {
      const { height } = sidebarText.current.getBoundingClientRect();
      sidebar.current.style.height = `${height}px`;
    }
  }, []);

  return (
    <div className="md:container grid grid-cols-12 gap-4 w-full lg:w-5/6">
      <div className="col-span-8">
        {data?.posts.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {data?.posts.hasMore && (
          <div className="text-center mb-3 flex justify-center items-center mt-3">
            <button
              onClick={() => {
                const posts = data!.posts.posts;
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor: posts[posts.length - 1].createdAt,
                  },
                });
              }}
              className="flex justify-center items-center bg-blue-500 font-semibold px-4 py-2 text-white rounded-lg"
              disabled={loading}
            >
              {loading && <AiOutlineLoading className="animate-spin mr-3" />}
              Load more
            </button>
          </div>
        )}
        {loading && <Loading />}
      </div>

      <div
        ref={sidebar}
        className="col-span-4 bg-white mt-3 border border-gray-600 rounded-md"
      >
        <div ref={sidebarText} className=" p-4">
          <div className="flex items-center mb-3">
            <div className="w-11 h-auto object-cover">
              <Image src={character} alt="Character" />
            </div>
            <b className="ml-3 block">Home</b>
          </div>
          <p className="mb-3">
            Your personal VnReddit frontpage. Come here to check in with your
            favorite communities.
          </p>
          <Link href="/post/create">
            <button className="primary-btn block w-full mb-3">
              Create Post
            </button>
          </Link>
          <Link href="/vr/create">
            <button className="secondary-btn block w-full">
              Create Community
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
