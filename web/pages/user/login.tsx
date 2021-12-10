import { NextPage } from "next";
import Link from "next/link";
import AuthInput from "../../components/auth/AuthInput";

const Signup: NextPage = () => {
  return (
    <div className="container w-full md:w-3/6">
      <h1 className="text-center font-bold mb-3 text-2xl">
        Login to your account
      </h1>
      <form className="mt-6 mb-3">
        <AuthInput placeholder="Username or email" />
        <AuthInput placeholder="Password" type="password" />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
        >
          Login
        </button>
      </form>
      <div className="text-center">
        Don&apos;t have an account?{" "}
        <a className="text-blue-500 hover:text-blue-400 transition-colors">
          <Link href="/user/signup">Sign up</Link>
        </a>
      </div>
    </div>
  );
};

export default Signup;
