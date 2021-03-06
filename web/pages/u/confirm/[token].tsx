import { NextPage } from "next";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useConfirmUserMutation, useMeQuery } from "../../../generated/graphql";
import HeadPage from "../../../components/html/Head";

const ConfirmUser: NextPage = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  const { token } = router.query;
  const [confirmUser, { error }] = useConfirmUserMutation();

  useEffect(() => {
    (async () => {
      if (data?.me) {
        await confirmUser({
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

        const timeout = setTimeout(() => {
          router.push("/");
        }, 3000);
        return () => clearTimeout(timeout);
      }
    })();
  }, [data, confirmUser, token, router]);

  if (error) {
    return (
      <>
        <HeadPage title="Error: Something went wrong." />
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
      </>
    );
  }

  return (
    <>
      <HeadPage
        title={
          loading || !data?.me?.username
            ? "Loading..."
            : `${data?.me?.username} | Confirm`
        }
      />
      <div className="text-center p-4">
        <h1 className="text-2xl mb-3 font-bold">
          Your account has been confirmed.
        </h1>
        <p className="mb-3">
          You are now redirecting to the home page after 3 seconds. If not,
          click the link below.
        </p>
        <Link href="/">
          <a className="px-3 py-2 font-semibold hover:bg-blue-400 text-white bg-blue-500 rounded-md">
            Back to home
          </a>
        </Link>
      </div>
    </>
  );
};

export default ConfirmUser;
