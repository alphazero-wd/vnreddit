import router from "next/router";
import { FC } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeletePostMutation } from "../../generated/graphql";

interface Props {
  id: string;
}

const EditDeleteBtn: FC<Props> = ({ id }) => {
  const [deletePost] = useDeletePostMutation();
  return (
    <div className="flex justify-center items-center">
      <Link href={`/posts/edit/${id}`}>
        <button className="flex justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-400">
          <FaEdit className="mr-2" />
          <small>Edit</small>
        </button>
      </Link>
      <button
        onClick={async () => {
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
        className="ml-3 flex justify-center items-center px-2 py-1 text-gray-600 font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-400"
      >
        <FaTrash className="mr-2" />
        <small>Delete</small>
      </button>
    </div>
  );
};

export default EditDeleteBtn;
