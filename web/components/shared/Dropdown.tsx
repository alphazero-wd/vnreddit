import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import avatar from "../../images/avatar.png";
import { CgProfile } from "react-icons/cg";
import { FiMoon } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { getTheme } from "../../utils/theme";
import { useApolloClient } from "@apollo/client";
import { MeDocument, MeQuery } from "../../generated/graphql";

interface Props {
  me?: {
    id: string;
    username: string;
    email: string;
    createdAt: any;
  } | null;
  logout: () => void;
}

const Dropdown: FC<Props> = ({ me, logout }) => {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme() || "light");
  const [dropdown, setDropdown] = useState(false);
  const apolloClient = useApolloClient();

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center justify-center w-full rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setDropdown(!dropdown)}
        >
          <Image src={avatar} className="object-cover" width={40} height={40} />
          <small className="font-bold text-sm dark:text-white">
            {me?.username}
          </small>
        </button>
      </div>
      {dropdown && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none border-gray-600 dark:bg-gray-900 dark:text-white"
          role="menu"
        >
          <div className="py-1">
            <Link href="/user/profile">
              <a className="text-gray-700 dark:text-white w-full hover:bg-gray-400 dark:hover:bg-gray-600 flex font-semibold items-center px-4 py-2 text-sm">
                <CgProfile className="mr-3 text-xl" />
                Profile
              </a>
            </Link>
            <button className="text-gray-700 dark:text-white w-full hover:bg-gray-400 dark:hover:bg-gray-600 font-semibold flex items-center justify-between px-4 py-2 text-sm">
              <div className="flex items-center">
                <FiMoon className="mr-3 text-xl" />
                Dark Mode
              </div>
              <div
                className={`w-14 h-7 flex items-center ${
                  theme === "light" ? "bg-gray-300" : "bg-blue-500"
                } rounded-full mx-3 px-1`}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transition-transform transform ${
                    theme === "light" ? "translate-x-0" : "translate-x-7"
                  }`}
                ></div>
              </div>
            </button>
            <button
              onClick={() => logout()}
              className="text-gray-700 dark:text-white w-full hover:bg-gray-400 dark:hover:bg-gray-600 font-semibold flex items-center px-4 py-2 text-sm"
            >
              <BiLogOut className="mr-3 text-xl" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
