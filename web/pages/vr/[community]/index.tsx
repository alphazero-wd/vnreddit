import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { BiCake } from "react-icons/bi";
import JoinCommunityBtn from "../../../components/community/JoinCommunityBtn";
import Post from "../../../components/post/Post";
import { useCommunityQuery } from "../../../generated/graphql";

const CommunityPage: NextPage = () => {
  const { query } = useRouter();
  const { data } = useCommunityQuery({
    variables: { name: query.community as string },
  });
  const router = useRouter();
  let TaskOneCompleted =
    data?.community?.posts.length === 0 ? AiOutlinePlus : AiOutlineCheck;

  return (
    <div className="container lg:w-4/5">
      <div className="bg-gray-300 p-3 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-3">{data?.community?.name}</h1>
            <h6 className="text-gray-600 font-semibold">
              {data?.community?.numberOfMembers} members
            </h6>
          </div>
          <JoinCommunityBtn community={data?.community} />
        </div>
        <p className="my-3 text-gray-800">{data?.community?.description}</p>
        <hr />
        <b className="text-center flex items-center">
          <BiCake className="text-xl mr-3" />
          Created {moment(data?.community?.createdAt).format("MMMM D, YYYY")}
        </b>
      </div>
      <div className="lg:grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Link href={`/vr/${data?.community?.name}/post/create`}>
            <button className="border border-gray-300 px-3 py-2 hover:bg-gray-300 transition-colors flex w-full items-center rounded-md">
              <button className="bg-blue-200 rounded-full p-2 mr-3">
                <AiOutlinePlus className="text-blue-500 text-2xl" />
              </button>
              Create post
            </button>
          </Link>
          <div className="mt-4">
            {data?.community?.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="px-3 py-4 border border-gray-600 rounded-md ">
          <b>Setup vr/{data?.community?.name}</b>
          <p className="mt-2 text-sm text-gray-600 font-bold">
            <span className="text-blue-500">2 of 3</span> tasks completed
          </p>
          <small className="block my-2">
            Get your community off the ground with these tasks
          </small>
          <div
            onClick={() =>
              data?.community?.posts.length === 0 &&
              router.push(`/vr/${data?.community?.name}/post/create`)
            }
            className={`flex ${
              data?.community?.posts.length === 0 ? "cursor-pointer" : ""
            } items-center hover:bg-gray-300 p-3 mb-3 rounded-md`}
          >
            <button className="bg-gray-400 p-2 mr-3 rounded-full">
              <TaskOneCompleted className="text-gray-600 text-2xl" />
            </button>
            Create your first post
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
