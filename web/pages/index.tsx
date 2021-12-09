import { NextPage } from "next";
import Post from "../components/shared/Post";

const Home: NextPage = () => {
  return (
    <section className="p-6">
      <div className="container w-3/4">
        <Post />
      </div>
    </section>
  );
};

export default Home;
