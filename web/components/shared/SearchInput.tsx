import Image from "next/image";
import router from "next/router";
import { FC, useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useCommunitiesQuery } from "../../generated/graphql";
import avatar from "../../images/vnreddit-logo.svg";
import { formatNumber } from "../../utils/formatNumber";
import { imageLoader } from "../../utils/imageLoader";

const SearchInput: FC = () => {
  const [search, setSearch] = useState("");
  const { data, fetchMore } = useCommunitiesQuery({
    variables: {
      search,
    },
  });

  useEffect(() => {
    if (search.length > 3) {
      const clearSearch = setTimeout(() => {
        fetchMore({ variables: { search } });
      }, 1000);
      return () => clearTimeout(clearSearch);
    }
  }, [search, fetchMore]);

  return (
    <div className="relative z-50 h-auto lg:w-2/6">
      <div className="flex px-3 py-2 rounded-md items-center border w-full text-gray-600 border-gray-300 hover:border-blue-500 focus-within:border-blue-500">
        <RiSearchLine className="mr-3 text-xl" />
        <input
          type="text"
          className="border-transparent bg-transparent text-sm focus:outline-none w-full "
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
        {data?.communities.map((c) => (
          <div
            key={c.id}
            className="p-2 w-full cursor-pointer hover:bg-blue-500 hover:text-white"
            onClick={() => {
              setSearch("");
              router.push(`/vr/${c.name}`);
            }}
          >
            <div className="flex items-center">
              {c.imageUrl ? (
                <Image
                  loader={imageLoader}
                  src={c.imageUrl}
                  className="rounded-full"
                  width="30%"
                  height="30%"
                  alt={c.name}
                />
              ) : (
                <Image
                  src={avatar}
                  className="rounded-full"
                  width="30%"
                  height="30%"
                  alt={c.name}
                />
              )}
              <div className="ml-3">
                <b className="block">vr/{c.name}</b>
                <small className="block">
                  {formatNumber(c.numberOfMembers)} members
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
