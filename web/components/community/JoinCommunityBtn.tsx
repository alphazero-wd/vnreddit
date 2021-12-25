import { FC } from "react";
import {
  CommunityFragment,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
  useMeQuery,
} from "../../generated/graphql";

interface Props {
  community?: CommunityFragment | null;
}

const JoinCommunityBtn: FC<Props> = ({ community }) => {
  const [joinCommunity] = useJoinCommunityMutation();
  const [leaveCommunity] = useLeaveCommunityMutation();
  const { data } = useMeQuery();
  return (
    <button
      onClick={async () => {
        const existingMember = community?.members.find(
          (member) => member.id === data?.me?.id
        );
        if (existingMember) {
          await leaveCommunity({
            variables: {
              commId: community!.id,
            },
            update: (cache) => {
              cache.evict({ id: `Community:${community?.id}` });
            },
          });
        } else {
          await joinCommunity({
            variables: {
              commId: community!.id,
            },
            update: (cache) => {
              cache.evict({ id: `Community:${community?.id}` });
            },
          });
        }
      }}
      className={`px-4 mr-3 border rounded-full py-1 transition-all font-bold ${
        community?.members.some((member) => member.id === data?.me?.id)
          ? "bg-blue-500 text-white hover:bg-blue-400"
          : "border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white"
      }`}
    >
      {community?.members.some((member) => member.id === data?.me?.id)
        ? "Leave"
        : "Join"}
    </button>
  );
};
export default JoinCommunityBtn;
