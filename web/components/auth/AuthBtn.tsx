import Link from "next/link";
import { FC } from "react";

const AuthBtn: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <button className="px-4 mr-3 rounded-full bg-blue-500 py-1 text-white font-bold hover:bg-blue-400">
        <Link href="/u/signup">Sign up</Link>
      </button>
      <button className="px-4 mr-3 border rounded-full border-blue-500 py-1 font-bold hover:bg-blue-500 transition-all text-blue-500 hover:text-white">
        <Link href="/u/login">Login</Link>
      </button>
    </div>
  );
};

export default AuthBtn;
