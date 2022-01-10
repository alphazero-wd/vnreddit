import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import {
  MeDocument,
  MeQuery,
  useAuthGoogleMutation,
} from "../../generated/graphql";

const GoogleLoginBtn: FC = () => {
  const router = useRouter();
  const [authGoogle] = useAuthGoogleMutation();

  const onSuccess = async (res: any) => {
    const { tokenId: token } = res;
    const response = await authGoogle({
      variables: {
        token,
      },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.authGoogle,
          },
        });
      },
    });
    localStorage.setItem("token", response.data?.authGoogle?.token || "");

    router.push("/");
  };
  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
      onSuccess={onSuccess}
      onFailure={(err) => console.log("err: ", err)}
      render={(renderProps) => (
        <button
          type="button"
          className="uppercase flex hover:text-white hover:bg-gray-800 transition-colors justify-center items-center w-full my-3 font-bold text-gray-800 p-2 border border-gray-600 rounded-md"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <FcGoogle className="mr-3" /> Login with google
        </button>
      )}
    />
  );
};

export default GoogleLoginBtn;
