import { NextPage } from "next";
import Link from "next/link";
import AuthInput from "../../components/auth/AuthInput";

const Signup: NextPage = () => {
  return (
    <div className="container w-full md:w-3/6">
      <h1 className="text-center font-bold mb-3 text-2xl">
        Become a member of VnReddit
      </h1>
      <form className="mt-6 mb-3">
        <AuthInput placeholder="Username" />
        <AuthInput placeholder="Email address" type="email" />
        <AuthInput placeholder="Password" type="password" />
        <AuthInput placeholder="Confirm password" type="password" />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
        >
          Sign up
        </button>
      </form>
      <div className="text-center">
        Already have an account?{" "}
        <a className="text-blue-500 hover:text-blue-400 transition-colors">
          <Link href="/user/login">Login</Link>
        </a>
      </div>
    </div>
  );
};

export default Signup;
