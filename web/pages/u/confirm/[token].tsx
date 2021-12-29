import { NextPage } from "next";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useConfirmUserMutation, useMeQuery } from "../../../generated/graphql";
import { useRedirect } from "../../../utils/useRedirect";

const ConfirmUser: NextPage = () => {
  const router = useRouter();
  const { data } = useMeQuery();
  const { token } = router.query;
  const [confirmUser, { error }] = useConfirmUserMutation();

  useRedirect(!data?.me, "/u/login");
  useRedirect(!!data?.me?.isConfirmed, "/");

  useEffect(() => {
    (async () => {
      if (data?.me && !data.me.isConfirmed) {
        const response = await confirmUser({
          variables: {
            token: token as string,
          },
          update: (cache) => {
            cache.evict({
              id: "User:" + data?.me?.id,
              fieldName: "isConfirmed",
            });
          },
        });
        console.log("response: ", response);

        if (response.data?.confirmUser) {
          const timeout = setTimeout(() => {
            router.push("/");
          }, 3000);
          return () => clearTimeout(timeout);
        }
      }
    })();
  }, [data]);

  if (error) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl mb-3 font-bold">
          Oops, something went wrong :(
        </h1>
        <Link href="/">
          <a className="px-3 py-2 font-semibold hover:bg-blue-400 text-white bg-blue-500 rounded-md">
            Back to home
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl mb-3 font-bold">
        Your account has been confirmed.
      </h1>
      <p className="mb-3">
        You are now redirecting to the home page after 3 seconds. If not, click
        the link below.
      </p>
      <Link href="/">
        <a className="px-3 py-2 font-semibold hover:bg-blue-400 text-white bg-blue-500 rounded-md">
          Back to home
        </a>
      </Link>
    </div>
  );
};

export default ConfirmUser;
