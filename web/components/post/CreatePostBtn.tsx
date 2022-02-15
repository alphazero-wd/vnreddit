import Link from "next/link";
import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CommunityProps } from "../../utils/types";

interface Props {
  community?: CommunityProps;
}

const CreatePostBtn: FC<Props> = ({ community }) => {
  return (
    <Link
      passHref
      href={`${community ? `/vr/${community?.name}` : ""}/post/create`}
    >
      <button className="border border-gray-300 px-3 py-2 hover:bg-gray-300 transition-colors flex w-full items-center rounded-md">
        <button className="bg-blue-200 rounded-full p-2 mr-3">
          <AiOutlinePlus className="text-blue-500 text-2xl" />
        </button>
        Create post
      </button>
    </Link>
  );
};

export default CreatePostBtn;
