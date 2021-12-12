import { NextPage } from "next";
import Post from "../components/shared/Post";
import { usePostsQuery } from "../generated/graphql";

const Home: NextPage = () => {
  const { data } = usePostsQuery();

  return (
    <div className="md:container w-full lg:w-4/5">
      {data?.posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Home;
