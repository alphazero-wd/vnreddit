import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import avatarImg from "../../images/avatar.png";
import ReactMarkdown from "react-markdown";
import {
  CommentFragment,
  useEditCommentMutation,
  useMeQuery,
} from "../../generated/graphql";
import CommentDropdown from "./Dropdown";
import { ErrorMessage, Formik } from "formik";
import Markdown from "../shared/Markdown";
import { MdOutlineError } from "react-icons/md";
import { gql } from "@apollo/client";

interface Props {
  comment: CommentFragment;
  id: string;
}

export interface EditInterface {
  comment: CommentFragment | null;
  isEdit: boolean;
}

const Comment: FC<Props> = ({ comment, id }) => {
  const [edit, setEdit] = useState<EditInterface>({
    comment: null,
    isEdit: false,
  });
  const { data } = useMeQuery();

  const [editComment] = useEditCommentMutation();

  return (
    <div className="my-3 p-3">
      <div className="flex items-center">
        <div
          style={{ maxWidth: "40px", maxHeight: "40px" }}
          className="object-cover"
        >
          <Image src={avatarImg} alt="Avatar" />
        </div>
        <small>
          <a className="font-bold">
            <Link href={`/u/profile/${comment.commentator?.username}`}>
              {comment.commentator?.username}
            </Link>
          </a>{" "}
          <span className="text-gray-600 ml-3">
            {moment(comment.createdAt).fromNow()}
          </span>
        </small>
        {comment.commentator?.id === data?.me?.id && (
          <CommentDropdown id={id} comment={comment} setEdit={setEdit} />
        )}
      </div>
      {edit.isEdit ? (
        <Formik
          initialValues={{ body: edit.comment?.body }}
          onSubmit={async ({ body }, { setErrors }) => {
            const response = await editComment({
              variables: {
                payload: {
                  commentId: comment.id,
                  body: body || "",
                },
              },
              update: (cache) => {
                cache.writeFragment<{
                  body: string;
                }>({
                  id: "Comment:" + comment.id,
                  fragment: gql`
                    fragment BodyComment on Comment {
                      body
                    }
                  `,
                  data: {
                    body: body || "",
                  },
                });
              },
            });
            const error = response.data?.editComment.error;

            if (error) {
              setErrors({ [error.field as string]: error.message });
            } else {
              setEdit({ comment: null, isEdit: false });
            }
          }}
        >
          {({ handleSubmit, errors, values, setValues }) => (
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
                placeholder="Write your comments here..."
                value={values.body || ""}
                className={errors.body ? "border border-red-600" : ""}
              />
              <div className="flex justify-end items-center mt-3">
                <button
                  className="bg-white rounded-full px-4 font-semibold py-1 text-black mr-3 hover:bg-gray-600 hover:text-white"
                  onClick={() => setEdit({ isEdit: false, comment: null })}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-blue-500 hover:bg-blue-400 px-4 font-semibold py-1 text-white"
                >
                  Edit comment
                </button>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <ReactMarkdown className="mt-2 ml-10">{comment.body}</ReactMarkdown>
      )}
    </div>
  );
};

export default Comment;
