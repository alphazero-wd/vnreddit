import Link from "next/link";
import { FC } from "react";
import { CommunityFragment, useMeQuery } from "../../generated/graphql";
import JoinCommunityBtn from "../community/JoinCommunityBtn";

interface Props {
  community?: CommunityFragment;
  userId?: string | null;
}

const Communities: FC<Props> = ({ community, userId }) => {
  const { data } = useMeQuery();
  return (
    <div className="flex items-center my-2 justify-between">
      <small className="block">
        <Link passHref href={`/vr/${community?.name}`}>
          <b className="block hover:underline cursor-pointer">
            vr/{community?.name}
          </b>
        </Link>
        <span>
          <b>{community?.numberOfMembers}</b>{" "}
          <span className="text-gray-600">members</span>
        </span>
      </small>
      {data?.me?.id === userId && <JoinCommunityBtn community={community} />}
    </div>
  );
};

export default Communities;
