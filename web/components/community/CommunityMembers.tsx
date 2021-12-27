import Link from "next/link";
import { FC } from "react";
import { CommunityProps } from "../../utils/types";

interface Props {
  community?: CommunityProps | null;
}
const CommunityMembers: FC<Props> = ({ community }) => {
  return (
    <div className="bg-white mt-3 border border-gray-600 rounded-md">
      <div className="text-white px-3 py-4 bg-blue-500">
        <b className="mb-5">Members</b>
      </div>
      <div className="px-3 py-4">
        {community?.members.slice(0, 10).map((member) => (
          <Link href={`/u/profile/${member.username}`}>
            <small className="text-blue-500 mb-3 cursor-pointer font-bold block hover:underline">
              u/{member.username}
            </small>
          </Link>
        ))}
        {(community?.members.length || 0) > 10 && (
          <div className="text-right">
            <small className="cursor-pointer font-bold tracking-wider inline-block uppercase text-right text-blue-500 rounded-md p-2">
              <Link href={`/vr/${community?.name}/members`}>
                View all members
              </Link>
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityMembers;
