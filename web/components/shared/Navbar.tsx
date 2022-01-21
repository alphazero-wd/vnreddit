import Image from "next/image";
import { FC, useEffect } from "react";
import logo from "../../images/vnreddit-logo.svg";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { MeDocument, MeQuery, useMeQuery } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import jwtDecode from "jwt-decode";
import AuthBtn from "../auth/AuthBtn";
import Toggler from "./Toggler";
import SearchInput from "./SearchInput";

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
    const token = localStorage.getItem("token");
    if (token) {
      const decodedData = jwtDecode(token) as any;
      if (Date.now() > (decodedData.exp as number) * 1000) {
        logout();
      }
    }
  }, [data, logout]);
  return (
    <nav className="shadow-sm relative w-full px-3 py-2">
      <div className="flex justify-between items-center container">
        <Link href="/" passHref>
          <div className="flex cursor-pointer justify-center items-center">
            <Image src={logo} alt="VnReddit" />
            <div className="ml-2 text-xl font-bold">VnReddit</div>
          </div>
        </Link>
        <SearchInput />
        <div className="hidden lg:flex justify-center items-center">
          {!data?.me && <AuthBtn />}
          <Dropdown logout={logout} />
        </div>
        <Toggler logout={logout} />
      </div>
    </nav>
  );
};

export default Navbar;
