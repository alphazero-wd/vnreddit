import Image from "next/image";
import { FC, useEffect, useState } from "react";
import logo from "../../images/vnreddit-logo.svg";
import { RiSearchLine } from "react-icons/ri";
import Dropdown from "./Dropdown";
import Link from "next/link";
import {
  MeDocument,
  MeQuery,
  useCommunitiesQuery,
  useMeQuery,
} from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import jwtDecode from "jwt-decode";
import AuthBtn from "../auth/AuthBtn";
import { useRouter } from "next/router";

const Navbar: FC = () => {
  const { data } = useMeQuery();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: communities, fetchMore } = useCommunitiesQuery({
    variables: {
      search,
    },
  });
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
      if (Date.now() > (decodedData.exp as number) * 1000) {
        logout();
      }
    }
  }, [data]);

  useEffect(() => {
    if (search.length > 3) {
      const clearSearch = setTimeout(() => {
        fetchMore({ variables: { search } });
      }, 1000);
      return () => clearTimeout(clearSearch);
    }
  }, [search]);

  return (
    <nav className="shadow-sm w-full px-3 py-2">
      <div className="flex justify-between items-center container">
        <Link href="/">
          <div className="flex cursor-pointer justify-center items-center">
            <Image src={logo} alt="VnReddit" />
            <div className="ml-2 text-xl font-bold">VnReddit</div>
          </div>
        </Link>
        <div className="relative w-2/6">
          <div className="lg:flex hidden px-3 py-2 rounded-md items-center border w-full text-gray-600 border-gray-300 hover:border-blue-500 focus-within:border-blue-500">
            <RiSearchLine className="mr-3 text-xl" />
            <input
              type="text"
              className="border-transparent text-sm focus:outline-none w-full "
              placeholder="Search VnReddit"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            className={`${
              search.length > 3 ? "block" : "hidden"
            } origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
          >
            {communities?.communities.map((c) => (
              <div
                className="p-2 cursor-pointer hover:bg-gray-300 w-full"
                onClick={() => {
                  setSearch("");
                  router.push(`/vr/${c.name}`);
                }}
              >
                vr/{c.name}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center">
          {!data?.me && <AuthBtn />}
          <Dropdown logout={logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
