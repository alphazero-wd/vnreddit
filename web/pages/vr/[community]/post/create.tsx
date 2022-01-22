import { NextPage } from "next";
import { Field, Formik } from "formik";
import {
  useCommunityQuery,
  useCreatePostMutation,
  useMeQuery,
} from "../../../../generated/graphql";
import { useRouter } from "next/router";
import AuthInput from "../../../../components/auth/AuthInput";
import { AiOutlineLoading } from "react-icons/ai";
import Markdown from "../../../../components/shared/Markdown";
import { useRedirect } from "../../../../utils/useRedirect";
import { useState } from "react";
import HeadPage from "../../../../components/html/Head";

const CreatePost: NextPage = () => {
  const [createPost, { loading }] = useCreatePostMutation();
  const [communityId, setCommunityId] = useState<string>("");
  const { data } = useMeQuery();
  const router = useRouter();

  const { data: community, loading: fetching } = useCommunityQuery({
    variables: {
      name: router.query.community as string,
    },
  });
  useRedirect(!data?.me, "/u/login");

  return (
    <>
      <HeadPage
        title={
          fetching || !community?.community
            ? "Loading..."
            : `Create a post for ${community?.community?.name}`
        }
      />
      <div className="container w-full lg:w-3/6">
        <h1 className="text-center font-bold mb-3 text-2xl">Create post</h1>
        <Formik
          initialValues={{ title: "", body: "" }}
          onSubmit={async ({ title, body }, { setErrors }) => {
            const { data } = await createPost({
              variables: {
                post: {
                  title,
                  body,
                  communityId: community?.community?.id || null,
                },
              },
              update: (cache) => {
                cache.evict({ fieldName: "posts" });
                cache.evict({ id: "Community:" + community?.community?.id });
                cache.evict({
                  id: "User:" + data?.createPost.post?.creator.id,
                });
              },
            });
            const error = data?.createPost.error;
            if (data?.createPost.post) {
              router.push("/");
            }

            if (error) {
              setErrors({ [error.field as string]: error.message });
            }
            return data;
          }}
        >
          {({ setValues, handleChange, errors, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <select
                name="communityId"
                className="w-full px-3 py-2 border-transparent rounded-md border border-gray-800 hover:outline-none mb-3"
                onChange={(e) => setCommunityId(e.target.value)}
                value={communityId}
              >
                {data?.me?.communities.map((c) => (
                  <option value={c.id} key={c.id}>
                    vr/{c.name}
                  </option>
                ))}
              </select>
              <AuthInput
                name="title"
                onChange={handleChange}
                label="Title"
                errors={errors}
              />
              <div>
                <label htmlFor="body" className="mb-2 font-semibold block">
                  Body:{" "}
                </label>
                <Markdown
                  value={values.body}
                  onChange={(value) =>
                    setValues({ ...values, body: value || "" })
                  }
                  placeholder="Body (optional)"
                />
              </div>
              <div className="flex justify-center items-center mt-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="flex justify-center items-center mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  {loading && (
                    <AiOutlineLoading className="animate-spin mr-3" />
                  )}
                  Create post
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreatePost;
