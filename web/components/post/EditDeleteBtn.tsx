import router from "next/router";
import { FC, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeletePostMutation } from "../../generated/graphql";
import Modal from "../shared/Modal";

interface Props {
  id: string;
}

const EditDeleteBtn: FC<Props> = ({ id }) => {
  const [modal, setModal] = useState(false);
  const [deletePost] = useDeletePostMutation();
  return (
    <>
      <div className="flex justify-center items-center">
        <Link href={`/post/edit/${id}`}>
          <button className="flex justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200">
            <FaEdit className="mr-2" />
            <small>Edit</small>
          </button>
        </Link>
        <button
          onClick={() => setModal(true)}
          className="ml-3 flex justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200"
        >
          <FaTrash className="mr-2" />
          <small>Delete</small>
        </button>
      </div>
      {modal && (
        <Modal
          title="Delete Post Confirmation"
          body={<p>Are you sure you want to delete this post?</p>}
          onSubmit={async () => {
            await deletePost({
              variables: {
                postId: id as string,
              },
              update: (cache) => {
                cache.evict({ id: "Post:" + id });
              },
            });
            router.push("/");
          }}
          onClose={() => setModal(false)}
          isOpen={modal}
        />
      )}
    </>
  );
};

export default EditDeleteBtn;
