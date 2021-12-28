import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCake } from "react-icons/bi";
import AboutCommunity from "../../../components/community/AboutCommunity";
import CommunityMembers from "../../../components/community/CommunityMembers";
import CommunityTasks from "../../../components/community/CommunityTasks";
import JoinCommunityBtn from "../../../components/community/JoinCommunityBtn";
import Post from "../../../components/post/Post";
import Modal from "../../../components/shared/Modal";
import {
  useAddDescriptionMutation,
  useCommunityQuery,
  useMeQuery,
} from "../../../generated/graphql";

const CommunityPage: NextPage = () => {
  const { query } = useRouter();
  const { data } = useCommunityQuery({
    variables: { name: query.community as string },
  });
  const { data: user } = useMeQuery();
  const router = useRouter();
  const [tasks, setTasks] = useState([
    data?.community?.posts.length !== 0,
    !!data?.community?.description,
  ]);
  const [description, setDescription] = useState("");
  const [addDescription] = useAddDescriptionMutation();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setTasks([
      data?.community?.posts.length !== 0,
      !!data?.community?.description,
    ]);
  }, [data]);

  return (
    <>
      <div className="container lg:w-4/5">
        <div className="bg-gray-300 p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-3">
                {data?.community?.name}
              </h1>
              <h6 className="text-gray-600 font-semibold">
                {data?.community?.numberOfMembers} members
              </h6>
            </div>
            <JoinCommunityBtn community={data?.community} />
          </div>
          <b className="text-center flex items-center"></b>
        </div>
        <div className="lg:grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {data?.community?.members.some(
              (member) => member.id === user?.me?.id
            ) && (
              <Link href={`/vr/${data?.community?.name}/post/create`}>
                <button className="border border-gray-300 px-3 py-2 hover:bg-gray-300 transition-colors flex w-full items-center rounded-md">
                  <button className="bg-blue-200 rounded-full p-2 mr-3">
                    <AiOutlinePlus className="text-blue-500 text-2xl" />
                  </button>
                  Create post
                </button>
              </Link>
            )}
            <div className="mt-4">
              {data?.community?.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <AboutCommunity community={data?.community} />
            {data?.community?.members.find(
              (member) => member.id === user?.me?.id
            ) && (
              <CommunityTasks
                setModal={setModal}
                community={data.community}
                tasks={tasks}
              />
            )}
            <CommunityMembers community={data?.community} />
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          title="Add a description"
          body={
            <textarea
              className="w-full outline-none min-h-full text-base border border-gray-500 p-2 rounded-md block"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
            />
          }
          onClose={() => setModal(false)}
          isOpen={modal}
          onSubmit={async () => {
            await addDescription({
              variables: {
                id: data!.community!.id,
                description,
              },
              update: (cache) => {
                cache.evict({ id: "Community:" + data?.community?.id });
              },
            });
          }}
        />
      )}
    </>
  );
};

export default CommunityPage;
