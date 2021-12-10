import { NextPage } from "next";
import Post from "../components/shared/Post";

const Home: NextPage = () => {
  return (
    <div className="md:container w-full lg:w-4/5">
      <Post />
    </div>
  );
};

export default Home;
