import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { MdOutlineGroupWork, MdPostAdd } from "react-icons/md";
import { useMeQuery } from "../../generated/graphql";
import SearchInput from "./SearchInput";

interface Props {
  logout: () => void;
}

const Toggler: FC<Props> = ({ logout }) => {
  const [toggler, setToggler] = useState(false);
  const { data } = useMeQuery();
  const [height, setHeight] = useState<number | undefined>(0);
  const menu = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const menuHeight = menu.current?.getBoundingClientRect().height;
    setHeight(menuHeight);
  }, []);

  return (
    <>
      <button
        onClick={() => setToggler(!toggler)}
        className="border-none rounded-md hover:bg-gray-200 transition-colors lg:hidden text-2xl p-3"
        ref={toggleBtn}
      >
        <AiOutlineMenu pointerEvents="none" />
      </button>
      <div
        ref={menu}
        className={`w-full absolute transform transition-all ${
          toggler
            ? `h-[${height}] scale-100 translate-y-[${height}]`
            : "h-0 translate-y-0 scale-0"
        } lg:hidden left-0 top-full p-3 z-50 bg-white text-gray-800`}
      >
        <div className="w-full my-3 px-4">
          <SearchInput isHidden={false} />
        </div>
        {data?.me && (
          <>
            <Link href={`/u/profile/${data.me.username}`}>
              <a onClick={() => setToggler(false)} className="dropdown-item">
                <CgProfile className="mr-3 text-xl" />
                Profile
              </a>
            </Link>
            <Link href="/u/settings">
              <a onClick={() => setToggler(false)} className="dropdown-item">
                <FiSettings className="mr-3 text-xl" />
                Settings
              </a>
            </Link>
            <Link href="/vr/create">
              <a onClick={() => setToggler(false)} className="dropdown-item">
                <MdOutlineGroupWork className="mr-3 text-xl" />
                Create a community
              </a>
            </Link>
            <Link href="/post/create">
              <a onClick={() => setToggler(false)} className="dropdown-item">
                <MdPostAdd className="mr-3 text-xl" />
                Create a post
              </a>
            </Link>
          </>
        )}
        {data?.me ? (
          <button
            onClick={() => {
              logout();
              setToggler(false);
            }}
            className="dropdown-item"
          >
            <BiLogOut className="mr-3 text-xl" />
            Logout
          </button>
        ) : (
          <Link href="/u/login" passHref>
            <a onClick={() => setToggler(false)} className="dropdown-item">
              <BiLogIn className="mr-3 text-xl" />
              Login / Signup
            </a>
          </Link>
        )}
      </div>
    </>
  );
};

export default Toggler;
