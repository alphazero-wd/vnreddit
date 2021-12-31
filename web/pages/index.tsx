import { NextPage } from "next";
import { AiOutlineLoading } from "react-icons/ai";
import Post from "../components/post/Post";
import { usePostsQuery } from "../generated/graphql";

const Home: NextPage = () => {
  const { data, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 3,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className="md:container w-full lg:w-4/5">
      {data?.posts.posts.map(post => (
        <Post loading={loading} key={post.id} post={post} />
      ))}
      {data?.posts.hasMore && (
        <div className="text-center flex justify-center items-center mt-3">
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
    </div>
  );
};

export default Home;
