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
  const [dropdown, setDropdown] = useState(false);
  const { data } = useMeQuery();

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setDropdown(!dropdown)}
        >
          {data?.me ? (
            <>
              <Image
                src={avatar}
                className="object-cover"
                width={40}
                height={40}
              />
              <small className="font-bold text-sm">{data?.me?.username}</small>
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
        className={`
          ${
            !dropdown
              ? "transform opacity-0 scale-95"
              : "transform opacity-100 scale-100"
          } 
        origin-top-right transition-all absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none border-gray-600 "
        `}
      >
        <div className="py-1">
          {data?.me && (
            <>
              <Link href="/u/profile">
                <a className="text-gray-700 w-full hover:bg-gray-200 flex font-semibold items-center px-4 py-2 text-sm">
                  <CgProfile className="mr-3 text-xl" />
                  Profile
                </a>
              </Link>
              <Link href="/vr/create">
                <a className="text-gray-700 w-full hover:bg-gray-200 flex font-semibold items-center px-4 py-2 text-sm">
                  <MdOutlineGroupWork className="mr-3 text-xl" />
                  Create a community
                </a>
              </Link>
              <Link href="/post/create">
                <a className="text-gray-700 w-full hover:bg-gray-200 flex font-semibold items-center px-4 py-2 text-sm">
                  <MdPostAdd className="mr-3 text-xl" />
                  Create a post
                </a>
              </Link>
            </>
          )}
          {data?.me ? (
            <button
              onClick={logout}
              className="text-gray-700 w-full hover:bg-gray-200 font-semibold flex items-center px-4 py-2 text-sm"
            >
              <BiLogOut className="mr-3 text-xl" />
              Logout
            </button>
          ) : (
            <Link href="/u/login" passHref>
              <a className="text-gray-700 w-full hover:bg-gray-400 font-semibold flex items-center px-4 py-2 text-sm">
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
