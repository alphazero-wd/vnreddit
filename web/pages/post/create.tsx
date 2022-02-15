import { Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import AuthInput from "../../components/auth/AuthInput";
import HeadPage from "../../components/html/Head";
import Markdown from "../../components/shared/Markdown";
import { useCreatePostMutation, useMeQuery } from "../../generated/graphql";
import { useRedirect } from "../../utils/useRedirect";

const CreatePost: NextPage = () => {
  const [createPost, { loading }] = useCreatePostMutation();
  const { data } = useMeQuery();
  const [communityId, setCommunityId] = useState("");
  const router = useRouter();

  useRedirect(!data?.me, "/u/login");
  return (
    <>
      <HeadPage title="Create a post" />
      <div className="container w-full md:w-5/6">
        <h1 className="text-center font-bold mb-3 text-2xl">Create post</h1>
        <Formik
          initialValues={{ title: "", body: "" }}
          onSubmit={async ({ title, body }, { setErrors }) => {
            const { data } = await createPost({
              variables: {
                post: {
                  communityId: communityId ?? null,
                  title,
                  body,
                },
              },
              update: (cache) => {
                cache.evict({ fieldName: "posts" });
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
          {({ setValues, errors, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <AuthInput
                name="title"
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
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
