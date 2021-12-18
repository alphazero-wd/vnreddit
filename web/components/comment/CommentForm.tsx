import { ErrorMessage, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { MdOutlineError } from "react-icons/md";
import { useCreateCommentMutation, useMeQuery } from "../../generated/graphql";
import { MDEditor } from "../../utils/MDEditor";
import AuthBtn from "../auth/AuthBtn";

interface Props {
  id: string;
}

const CommentForm: FC<Props> = ({ id }) => {
  const router = useRouter();
  const { data } = useMeQuery();
  const [createComment] = useCreateCommentMutation();
  return (
    <div className="py-4 px-8">
      {data?.me ? (
        <>
          <small className="dark:text-white font-semibold block mb-3">
            Comment as{" "}
            <span className="cursor-pointer hover:underline text-blue-500">
              <Link href="/u/profile">
                <>{data?.me?.username}</>
              </Link>
            </span>
          </small>
          <Formik
            initialValues={{ body: "" }}
            onSubmit={async ({ body }, { setErrors }) => {
              const response = await createComment({
                variables: {
                  payload: {
                    body,
                    postId: id,
                  },
                },
                update: (cache) => {
                  cache.evict({ fieldName: "comments" });
                },
              });

              const error = response.data?.createComment.error;
              if (response.data?.createComment.comment) {
                router.reload();
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
                <MDEditor
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
        <div className="flex rounded-md p-3 border border-gray-600 justify-between items-center">
          <p>Login or sign up to leave a comment</p>
          <AuthBtn />
        </div>
      )}
    </div>
  );
};

export default CommentForm;
