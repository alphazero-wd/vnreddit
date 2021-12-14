import { NextPage } from "next";
import Link from "next/link";

const ErrorPage: NextPage = () => {
  return (
    <div className="container pt-8 text-center dark:text-white">
      <h2 className="font-bold text-4xl mb-3">Oops, Page does not exist :(</h2>
      <p className="mb-6 mt-3 text-lg">
        Sorry, we could not find what you are looking for.
      </p>
      <Link href="/">
        <a className="px-3 py-2 font-semibold hover:bg-blue-400 text-white bg-blue-500 rounded-md">
          Back to home
        </a>
      </Link>
    </div>
  );
};

export default ErrorPage;
