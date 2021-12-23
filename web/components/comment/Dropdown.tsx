import { Dispatch, FC, SetStateAction, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  CommentFragment,
  useDeleteCommentMutation,
} from "../../generated/graphql";
import { EditInterface } from "./Comment";

interface Props {
  setEdit: Dispatch<SetStateAction<EditInterface>>;
  comment: CommentFragment;
  id: string;
}

const CommentDropdown: FC<Props> = ({ setEdit, comment, id }) => {
  const [dropdown, setDropdown] = useState(false);
  const [deleteComment] = useDeleteCommentMutation();
  return (
    <>
      <div className="relative inline-block text-left ml-5">
        <div>
          <button
            type="button"
            className="inline-flex w-full rounded-md text-sm font-medium text-gray-700 focus:outline-none"
            onClick={() => setDropdown(!dropdown)}
          >
            <FiMoreHorizontal className="text-gray-600 text-xl " />
          </button>
        </div>

        <div
          className={`
          ${
            !dropdown
              ? "transform opacity-0 scale-95"
              : "transform opacity-100 scale-100"
          } 
        origin-top-left absolute transition-all right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            <button
              onClick={() => {
                setEdit({ comment, isEdit: true });
                setDropdown(false);
              }}
              className="text-gray-700 w-full hover:bg-gray-300 flex items-center px-4 py-2"
            >
              <BsPencil className="mr-3" /> Edit comment
            </button>
            <button
              className="text-gray-700 w-full hover:bg-gray-300 flex items-center px-4 py-2"
              data-modal-toggle="default-modal"
              onClick={async () => {
                setDropdown(false);
                await deleteComment({
                  variables: {
                    commentId: comment.id,
                  },
                  update: (cache) => {
                    cache.evict({ id: "Comment:" + comment.id });
                    cache.evict({
                      id: "Post:" + id,
                      fieldName: "numberOfComments",
                    });
                  },
                });
              }}
            >
              <BsTrash className="mr-3" /> Delete comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentDropdown;
