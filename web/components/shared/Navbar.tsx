import Image from "next/image";
import { FC, useEffect } from "react";
import logo from "../../images/vnreddit-logo.svg";
import { RiSearchLine } from "react-icons/ri";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { MeDocument, MeQuery, useMeQuery } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import jwtDecode from "jwt-decode";

const Navbar: FC = () => {
  const { data } = useMeQuery();

  const apolloClient = useApolloClient();
  const logout = () => {
    localStorage.removeItem("token");
    apolloClient.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        __typename: "Query",
        me: null,
      },
    });
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") as string);

    if (token) {
      const decodedData = jwtDecode(token) as any;
      if (Date.now() >= (decodedData.exp as number) * 1000) {
        // current: 1639141579004, exp: 1639144715
        logout();
      }
    }
  }, []);
  return (
    <nav className="shadow-sm w-full px-3 py-2 dark:bg-gray-900">
      <div className="flex justify-between items-center container">
        <Link href="/">
          <div className="flex cursor-pointer justify-center items-center">
            <Image src={logo} alt="VnReddit" />
            <div className="ml-2 text-xl font-bold dark:text-white">
              VnReddit
            </div>
          </div>
        </Link>

        <div className="flex px-3 py-2 rounded-md items-center border w-2/6 text-gray-600 border-gray-300 hover:border-blue-500 focus-within:border-blue-500 dark:hover:border-white dark:focus-within:border-white dark:text-gray-600">
          <RiSearchLine className="mr-3 text-xl" />
          <input
            type="text"
            className="border-transparent text-sm dark:bg-gray-900 focus:outline-none w-full "
            placeholder="Search VnReddit"
          />
        </div>
        {!data?.me ? (
          <div className="flex justify-center items-center">
            <button className="bg-blue-500 font-bold hover:bg-blue-400 text-white rounded-full px-4 py-2 mr-2">
              <Link href="/user/signup">Sign up</Link>
            </button>
            <button className="border rounded-full border-blue-500 font-bold transition-colors hover:bg-blue-500 hover:text-white text-blue-500 px-4 py-2">
              <Link href="/user/login">Login</Link>
            </button>
          </div>
        ) : (
          <Dropdown logout={logout} me={data.me} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
