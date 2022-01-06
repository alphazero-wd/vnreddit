import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Post from "../components/post/Post";
import Loading from "../components/shared/Loading";
import { usePostsQuery } from "../generated/graphql";
import character from "../images/vnreddit.svg";

const Home: NextPage = () => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const sidebar = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);
  const sidebarText = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const actualHeight = sidebarText.current?.getBoundingClientRect().height;
    setHeight(actualHeight);
  }, [sidebarText.current]);

  useEffect(() => {
    const onScroll = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isNearBottom && !loading && data?.posts.hasMore) {
        fetchMore({
          variables: {
            limit: variables?.limit,
            cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
          },
        });
      }
    };
    if (data?.posts.hasMore) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [data]);

  return (
    <div className="md:container lg:grid grid-cols-12 gap-4 w-full lg:w-5/6">
      <div className="col-span-8">
        {data?.posts.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {loading && <Loading />}
      </div>

      <div
        ref={sidebar}
        className={`lg:h-[${height}] col-span-4 hidden lg:block bg-white mt-3 border border-gray-600 rounded-md`}
      >
        <div ref={sidebarText} className="p-4">
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
