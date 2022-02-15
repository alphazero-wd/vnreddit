import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { CommunityFragment, useMeQuery } from "../../generated/graphql";
import { imageLoader } from "../../utils/imageLoader";
import JoinCommunityBtn from "../community/JoinCommunityBtn";
import logo from "../../images/vnreddit-logo.svg";

interface Props {
  community?: CommunityFragment;
  userId?: string | null;
}

const Communities: FC<Props> = ({ community, userId }) => {
  const { data } = useMeQuery();
  return (
    <div className="flex items-center my-2 justify-between">
      <div className="flex items-center">
        <div className="mr-3">
          {community?.imageUrl ? (
            <Image
              loader={imageLoader}
              src={community.imageUrl}
              alt={community.name}
              width="30%"
              className="rounded-full"
              height="30%"
            />
          ) : (
            <Image
              width="30%"
              height="30%"
              loader={imageLoader}
              className="rounded-full"
              src={logo}
              alt={community?.name}
            />
          )}
        </div>
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
      </div>
      {data?.me?.id === userId && <JoinCommunityBtn community={community} />}
    </div>
  );
};

export default Communities;
