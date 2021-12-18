import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import avatar from "../../images/avatar.png";
import { CgProfile } from "react-icons/cg";
import { FiMoon } from "react-icons/fi";
import { BiChevronDown, BiLogIn, BiLogOut, BiUser } from "react-icons/bi";
import { MdOutlineGroupWork, MdPostAdd } from "react-icons/md";
import { useMeQuery } from "../../generated/graphql";

interface Props {
  logout: () => void;
}

const Dropdown: FC<Props> = ({ logout }) => {
  const [theme, setTheme] = useState("dark");
  const { data } = useMeQuery();

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
          data-dropdown-toggle="dropdown"
          id="dropdownButton"
        >
          {data?.me ? (
            <>
              <Image
                src={avatar}
                className="object-cover"
                width={40}
                height={40}
              />
              <small className="font-bold text-sm dark:text-white">
                {data?.me?.username}
              </small>
            </>
          ) : (
            <>
              <BiUser className="text-gray-600 text-2xl" />
              <BiChevronDown className="text-gray-600 text-xl " />
            </>
          )}
        </button>
      </div>
      <div
        className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none border-gray-600 dark:bg-gray-900 dark:text-white"
        id="dropdown"
      >
        <div className="py-1">
          {data?.me && (
            <>
              <Link href="/u/profile">
                <a className="text-gray-700 dark:text-white w-full hover:bg-gray-200 dark:hover:bg-gray-600 flex font-semibold items-center px-4 py-2 text-sm">
                  <CgProfile className="mr-3 text-xl" />
                  Profile
                </a>
              </Link>
              <Link href="/vr/create">
                <a className="text-gray-700 dark:text-white w-full hover:bg-gray-200 dark:hover:bg-gray-600 flex font-semibold items-center px-4 py-2 text-sm">
                  <MdOutlineGroupWork className="mr-3 text-xl" />
                  Create a community
                </a>
              </Link>
              <Link href="/posts/create">
                <a className="text-gray-700 dark:text-white w-full hover:bg-gray-200 dark:hover:bg-gray-600 flex font-semibold items-center px-4 py-2 text-sm">
                  <MdPostAdd className="mr-3 text-xl" />
                  Create a post
                </a>
              </Link>
            </>
          )}
          <button className="text-gray-700 dark:text-white w-full hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold flex items-center justify-between px-4 py-2 text-sm">
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
          {data?.me ? (
            <button
              onClick={logout}
              className="text-gray-700 dark:text-white w-full hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold flex items-center px-4 py-2 text-sm"
            >
              <BiLogOut className="mr-3 text-xl" />
              Logout
            </button>
          ) : (
            <Link href="/u/login" passHref>
              <a className="text-gray-700 dark:text-white w-full hover:bg-gray-400 dark:hover:bg-gray-600 font-semibold flex items-center px-4 py-2 text-sm">
                <BiLogIn className="mr-3 text-xl" />
                Login / Signup
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
