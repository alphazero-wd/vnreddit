import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import avatarImg from "../../images/avatar.png";

const Comment: FC = () => {
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
            <Link href="/user/alphazero">alphazero</Link>
          </a>{" "}
          <span className="text-gray-600">8 hr. ago</span>
        </small>
      </div>
      <p className="mt-2 ml-10">A great post.</p>
    </div>
  );
};

export default Comment;
