import { NextPage } from "next";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsChatSquare } from "react-icons/bs";
import Comment from "../../components/shared/Comment";

const PostPage: NextPage = () => {
  return (
    <div className="container w-full md:w-2/3">
      <div className="bg-white">
        <div className="flex mb-3 rounded-md ">
          <div className="flex flex-col bg-gray-100 items-center p-3 z-50">
            <button className="border-none mb-3 text-gray-700 hover:text-red-700 hover:bg-gray-200 rounded-sm p-2 text-3xl">
              <FaChevronUp />
            </button>
            <span className="font-semibold text-md">11.4k</span>
            <button className="hover:text-blue-600 mt-3 text-gray-700 border-none hover:bg-gray-200 rounded-sm p-2 text-3xl">
              <FaChevronDown />
            </button>
          </div>
          <div className="flex-grow p-3 bg-white">
            <small className="text-gray-600">
              Posted by u/alphazero 16 hours ago
            </small>
            <h2 className="mb-2 text-2xl font-bold">My first post</h2>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              repudiandae, iure beatae aliquid nam voluptatibus eaque inventore
              nesciunt doloribus ipsam animi fugit consectetur neque odit,
              dignissimos distinctio quibusdam commodi dolor ab sint ea! Dolore
              quaerat maxime necessitatibus aspernatur expedita doloribus sunt
              repellat id dolores exercitationem, fugiat natus, a laboriosam
              dolorem!
            </p>
            <div className="flex items-center text-gray-600 font-semibold">
              <BsChatSquare className="mr-2 text-xl" />
              <small>5.5k comments</small>
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
