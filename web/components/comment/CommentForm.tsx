import { ErrorMessage, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { MdOutlineError } from "react-icons/md";
import { useCreateCommentMutation, useMeQuery } from "../../generated/graphql";
import Markdown from "../shared/Markdown";
import AuthBtn from "../auth/AuthBtn";

interface Props {
  id: string;
}

const CommentForm: FC<Props> = ({ id }) => {
  const { data } = useMeQuery();
  const [createComment] = useCreateCommentMutation();
  return (
    <div className="p-2 w-full">
      {data?.me ? (
        <>
          <small className="font-semibold block mb-3">
            Comment as{" "}
            <span className="cursor-pointer hover:underline text-blue-500">
              <Link href="/u/profile">
                <>{data?.me?.username}</>
              </Link>
            </span>
          </small>
          <Formik
            initialValues={{ body: "" }}
            onSubmit={async (values, { setErrors, setValues }) => {
              const response = await createComment({
                variables: {
                  payload: {
                    body: values.body,
                    postId: id,
                  },
                },
                update: (cache) => {
                  cache.evict({ id: "Post:" + id });
                },
              });

              const error = response.data?.createComment.error;
              if (response.data?.createComment.comment) {
                setValues({ ...values, body: "" });
                return;
              } else if (error) {
                setErrors({ [error?.field as string]: error?.message });
              }
            }}
          >
            {({ handleSubmit, setValues, values, errors }) => (
              <form onSubmit={handleSubmit}>
                {errors.body && (
                  <div className="flex items-center mb-3 text-red-600">
                    <MdOutlineError className="mr-2" />
                    <ErrorMessage name="body" className="text-red-600 mb-2">
                      {(msg) => <div>{msg}</div>}
                    </ErrorMessage>
                  </div>
                )}
                <Markdown
                  onChange={(value) =>
                    setValues({ ...values, body: value as string })
                  }
                  value={values.body}
                  className={errors.body ? "border border-red-600" : ""}
                />
                <div className="flex justify-end items-center mt-3">
                  <button
                    type="submit"
                    className="rounded-full bg-blue-500 hover:bg-blue-400 px-4 font-semibold py-1 text-white"
                  >
                    Create comment
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </>
      ) : (
        <div className="lg:flex rounded-md p-3 border border-gray-600 justify-between items-center">
          <p className=" mb-3 lg:mb-0 ">Login or sign up to leave a comment</p>
          <AuthBtn />
        </div>
      )}
    </div>
  );
};

export default CommentForm;
