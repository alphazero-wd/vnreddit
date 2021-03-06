import { NextPage } from "next";
import { Formik } from "formik";
import { useRouter } from "next/router";
import {
  useEditPostMutation,
  useMeQuery,
  usePostQuery,
} from "../../../generated/graphql";
import AuthInput from "../../../components/auth/AuthInput";
import Markdown from "../../../components/shared/Markdown";
import { AiOutlineLoading } from "react-icons/ai";
import { useRedirect } from "../../../utils/useRedirect";
import HeadPage from "../../../components/html/Head";
import Link from "next/link";

const EditPostPage: NextPage = () => {
  const [editPost, { loading }] = useEditPostMutation();
  const router = useRouter();
  const { data: user } = useMeQuery();
  const { id } = router.query;

  const { data } = usePostQuery({
    variables: { postId: id as string },
  });

  useRedirect(!user?.me, "/u/login");
  useRedirect(data?.post?.creator.id !== user?.me?.id, "/");

  return (
    <>
      <HeadPage title="Edit post" />
      <div className="container w-full md:w-3/6">
        <h1 className="text-center font-bold mb-3 text-2xl">Edit post</h1>
        <Formik
          initialValues={{
            title: data?.post?.title || "",
            body: data?.post?.body || "",
          }}
          onSubmit={async ({ title, body }, { setErrors }) => {
            const { data } = await editPost({
              variables: {
                post: {
                  id: id as string,
                  title,
                  body,
                },
              },
              update: (cache) => {
                cache.evict({ fieldName: "Post:" + id });
              },
            });
            const error = data?.editPost.error;
            if (data?.editPost.post) {
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
                value={values.title}
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
                <Link passHref href="/">
                  <button className="primary-btn mr-3">Cancel</button>
                </Link>
                <button
                  disabled={loading}
                  type="submit"
                  className="secondary-btn flex justify-center items-center"
                >
                  {loading && (
                    <AiOutlineLoading className="animate-spin mr-3" />
                  )}
                  Update post
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditPostPage;
