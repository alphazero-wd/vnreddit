import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { imageLoader } from "../../../utils/imageLoader";
import avatar from "../../../images/vnreddit-logo.svg";
import HeadPage from "../../../components/html/Head";
import Loading from "../../../components/shared/Loading";
import CreatePostBtn from "../../../components/post/CreatePostBtn";

const CommunityPage: NextPage = () => {
  const { query } = useRouter();
  const { data, loading } = useCommunityQuery({
    variables: { name: query.community as string },
  });
  const { data: user } = useMeQuery();
  const [tasks, setTasks] = useState([
    data?.community?.posts.length !== 0,
    !!data?.community?.description,
    !!data?.community?.imageUrl,
  ]);
  const [description, setDescription] = useState("");
  const [addDescription] = useAddDescriptionMutation();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setTasks([
      data?.community?.posts.length !== 0,
      !!data?.community?.description,
      !!data?.community?.imageUrl,
    ]);
  }, [data]);

  return (
    <>
      <HeadPage
        title={
          loading || !data?.community ? "Loading..." : data?.community?.name
        }
      />
      <div className="container lg:w-5/6">
        <div className="bg-gray-300 p-3 mb-4 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3">
                {data?.community?.imageUrl ? (
                  <Image
                    loader={imageLoader}
                    src={data.community.imageUrl}
                    width="60%"
                    height="60%"
                    className="rounded-full object-cover"
                    alt={data.community.name}
                  />
                ) : (
                  <Image
                    src={avatar}
                    width="60%"
                    height="60%"
                    className="rounded-full object-cover"
                    alt={data?.community?.name}
                  />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-3">
                  {data?.community?.name}
                </h1>
                <h6 className="text-gray-600 font-semibold">
                  {data?.community?.numberOfMembers} members
                </h6>
              </div>
            </div>
            <JoinCommunityBtn community={data?.community} />
          </div>
          <b className="text-center flex items-center"></b>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="order-2 lg:order-1 lg:col-span-2">
            {data?.community?.members.some(
              (member) => member.id === user?.me?.id
            ) && <CreatePostBtn community={data?.community} />}
            <div className="mt-4">
              {loading ? (
                <Loading />
              ) : (
                data?.community?.posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2">
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
