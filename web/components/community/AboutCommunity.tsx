import moment from "moment";
import Link from "next/link";
import { FC } from "react";
import { BiCake } from "react-icons/bi";
import { CommunityProps } from "../../utils/types";

interface Props {
  community?: CommunityProps | null;
}

const AboutCommunity: FC<Props> = ({ community }) => {
  return (
    <div className="bg-white mb-3 border border-gray-600 rounded-md">
      <div className="text-white px-3 py-4 bg-blue-500">
        <b className="mb-5">About community</b>
      </div>
      <div className="px-3 py-4">
        <p>{community?.description}</p>
        <div className="my-3 text-center">
          <b className="text-lg block">{community?.numberOfMembers}</b>
          <b className="text-gray-600 text-sm">Members</b>
        </div>
        <hr className="text-gray-600 my-3" />
        <div className="flex items-center">
          <BiCake className="text-xl mr-3" />
          Created {moment(community?.createdAt).format("MMMM D, YYYY")}
        </div>
        <button className="secondary-btn my-3 w-full">
          <Link href={`/vr/${community?.name}/post/create`}>Create Post</Link>
        </button>
      </div>
    </div>
  );
};

export default AboutCommunity;
