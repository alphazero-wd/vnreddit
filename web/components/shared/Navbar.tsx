import Image from "next/image";
import { FC } from "react";
import logo from "../../images/vnreddit-logo.svg";
import { RiSearchLine } from "react-icons/ri";
import Dropdown from "./Dropdown";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <nav className="shadow-sm w-full px-3 py-2 dark:bg-gray-900">
      <div className="flex justify-between items-center container">
        <Link href="/">
          <div className="flex cursor-pointer justify-center items-center">
            <Image src={logo} alt="Vnreddit" />
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
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;
