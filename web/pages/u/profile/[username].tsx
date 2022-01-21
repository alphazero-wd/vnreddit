import { NextPage } from "next";
import { useRouter } from "next/router";
import Post from "../../../components/post/Post";
import { useMeQuery, useUserQuery } from "../../../generated/graphql";
import Image from "next/image";
import avatar from "../../../images/vnreddit-logo.svg";
import { GiCakeSlice } from "react-icons/gi";
import moment from "moment";
import Link from "next/link";
import Communities from "../../../components/user/Communities";
import postImg from "../../../images/post.svg";
import { imageLoader } from "../../../utils/imageLoader";
import HeadPage from "../../../components/html/Head";

const ProfilePage: NextPage = () => {
  const { query } = useRouter();
  const { data } = useUserQuery({
    variables: {
      username: query.username as string,
    },
  });

  const { data: user } = useMeQuery();
  return (
    <>
      <HeadPage title={`${data?.user?.username}`} />
      <div className="container lg:w-4/5 lg:grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {data?.user?.posts.length === 0 && (
            <div className="flex justify-center text-center items-center flex-col">
              <div className="w-3/5">
                <Image src={postImg} alt={data.user.username} />
              </div>
              <h2 className="text-xl font-semibold mt-3">
                It seems like user {data.user.username} have not post anything.
              </h2>
            </div>
          )}

          {data?.user?.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <div className="lg:block hidden">
          <div className="bg-white px-3 py-4 border border-gray-600 rounded-md">
            <div className="flex flex-col justify-center items-center ">
              {data?.user?.imageUrl ? (
                <Image
                  loader={imageLoader}
                  src={data.user.imageUrl}
                  width="100%"
                  height="100%"
                  className="rounded-full object-cover"
                  alt={data.user.username}
                />
              ) : (
                <Image
                  loader={imageLoader}
                  src={avatar}
                  width="100%"
                  height="100%"
                  className="rounded-full object-cover"
                  alt={data?.user?.username}
                />
              )}

              <h1 className="text-2xl my-2 font-bold">
                {data?.user?.username}
              </h1>
              <small className="text-gray-600 font-bold">
                u/{data?.user?.username}
              </small>
            </div>
            <small className="block my-2">
              <b className="block mb-1 text-base">Cake day</b>
              <span>
                <GiCakeSlice className="text-blue-500 mr-2 inline" />
                <span className="text-gray-600">
                  {moment(data?.user?.createdAt).format("MMMM D, YYYY")}
                </span>
              </span>
            </small>
            {data?.user?.id === user?.me?.id && (
              <button className="secondary-btn w-full my-3">
                <Link href="/post/create">New post</Link>
              </button>
            )}
          </div>
          {(data?.user?.communities || []).length > 0 && (
            <div className="mt-3 bg-white px-3 py-4 border border-gray-600 rounded-md">
              <b className="block mb-2">
                {data?.user?.id === user?.me?.id ? "You're m" : "M"}embers of
                these communities
              </b>
              {data?.user?.communities.map((c) => (
                <Communities userId={data.user?.id} key={c.id} community={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
