import Link from "next/link";
import { FC } from "react";

const AuthBtn: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <button className="secondary-btn">
        <Link href="/u/signup">Sign up</Link>
      </button>
      <button className="primary-btn">
        <Link href="/u/login">Login</Link>
      </button>
    </div>
  );
};

export default AuthBtn;
