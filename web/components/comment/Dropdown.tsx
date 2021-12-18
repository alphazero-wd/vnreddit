import { Dispatch, FC, SetStateAction, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  CommentFragment,
  useDeleteCommentMutation,
} from "../../generated/graphql";
import Modal from "../shared/Modal";
import { EditInterface } from "./Comment";

interface Props {
  setEdit: Dispatch<SetStateAction<EditInterface>>;
  comment: CommentFragment;
}

const CommentDropdown: FC<Props> = ({ setEdit, comment }) => {
  const [deleteComment] = useDeleteCommentMutation();
  return (
    <>
      <div className="relative inline-block text-left ml-5">
        <div>
          <button
            type="button"
            className="inline-flex w-full rounded-md text-sm font-medium text-gray-700 focus:outline-none"
          >
            <FiMoreHorizontal className="text-gray-600 text-xl " />
          </button>
        </div>

        <div className="origin-top-left absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 dark:bg-gray-800">
            <button
              onClick={() => {
                setEdit({ comment, isEdit: true });
              }}
              className="text-gray-700 w-full hover:bg-gray-600 dark:text-white flex items-center px-4 py-2"
            >
              <BsPencil className="mr-3" /> Edit comment
            </button>
            <button
              className="text-gray-700 w-full hover:bg-gray-600 flex items-center dark:text-white px-4 py-2"
              data-modal-toggle="default-modal"
            >
              <BsTrash className="mr-3" /> Delete comment
            </button>
          </div>
        </div>
      </div>
      <Modal
        onSubmit={async () => {
          await deleteComment({
            variables: {
              commentId: comment.id,
            },
          });
        }}
      />
    </>
  );
};

export default CommentDropdown;
