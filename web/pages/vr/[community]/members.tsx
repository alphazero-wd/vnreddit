import { useRouter } from "next/router";
import { RiSearchLine } from "react-icons/ri";
import { useCommunityQuery } from "../../../generated/graphql";
import avatar from "../../../images/vnreddit-logo.svg";
import Image from "next/image";
import moment from "moment";
import { imageLoader } from "../../../utils/imageLoader";
import { useState } from "react";
import Link from "next/link";

export default function Members() {
  const { query } = useRouter();
  const { data } = useCommunityQuery({
    variables: {
      name: query.community as string,
    },
  });
  const [search, setSearch] = useState("");

  return (
    <div className="container w-4/5">
      <h2 className="font-bold text-2xl mb-3">
        Members of vr/{data?.community?.name}
      </h2>
      <div className="rounded-md">
        <div className="bg-gray-200 w-full">
          <div className="rounded-md flex items-center p-3">
            <input
              type="text"
              className="px-2 py-1 border border-gray-800 w-2/5 outline-none focus:outline-none rounded-l-md"
              placeholder="Search for a user"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="rounded-r-md p-2 border-none inline-block bg-gray-600 text-white">
              <RiSearchLine />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.community?.members
                      .filter((member) =>
                        member.username
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                      .map((member) => (
                        <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {member?.imageUrl ? (
                                  <Image
                                    loader={imageLoader}
                                    className="h-10 object-cover w-10 rounded-full"
                                    src={member.imageUrl}
                                    alt={member.username}
                                    width="40%"
                                    height="40%"
                                  />
                                ) : (
                                  <Image
                                    className="h-10 w-10 rounded-full"
                                    src={avatar}
                                    alt="vnreddit logo"
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <Link
                                  passHref
                                  href={`/u/profile/${member.username}`}
                                >
                                  <div className="text-sm font-medium hover:underline cursor-pointer text-gray-900">
                                    {member.username}
                                  </div>
                                </Link>
                                <div className="text-sm text-gray-500">
                                  {moment(member.createdAt).fromNow()}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
