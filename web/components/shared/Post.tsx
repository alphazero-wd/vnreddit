import { FC } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { BsChatSquare } from "react-icons/bs";
import { useRouter } from "next/router";

const Post: FC = () => {
  const router = useRouter();
  const readMore = (e: any) => {
    if (!e.target.classList.contains("vote-btn")) {
      router.push("/posts/2");
    }
  };
  return (
    <div
      onClick={readMore}
      className="cursor-pointer bg-white flex border mb-3 border-gray-300 hover:border-blue-500 rounded-md"
    >
      <div className="flex flex-col hover:bg-blue-100 bg-opacity-50 items-center border-r p-3">
        <button className="border-none vote-btn mb-3 text-gray-700 hover:text-red-700 hover:bg-gray-200 rounded-sm p-2 text-3xl">
          <FaChevronUp />
        </button>
        <span className="font-semibold text-md">11.4k</span>
        <button className=" hover:text-blue-600 vote-btn mt-3 text-gray-700 border-none hover:bg-gray-200 rounded-sm p-2 text-3xl">
          <FaChevronDown />
        </button>
      </div>
      <div className="flex-grow p-3">
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
        <button className="flex justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200">
          <BsChatSquare className="mr-2 text-xl" />
          <small>5.5k comments</small>
        </button>
      </div>
    </div>
  );
};

export default Post;