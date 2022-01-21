import { useRouter } from "next/router";
import { FC } from "react";
import FacebookLogin from "react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import {
  MeDocument,
  MeQuery,
  useAuthFacebookMutation,
} from "../../generated/graphql";

const FacebookLoginBtn: FC = () => {
  const [authFacebook] = useAuthFacebookMutation();
  const router = useRouter();
  const responseFacebook = async (res: any) => {
    const {
      name,
      email,
      picture: {
        data: { url },
      },
    } = res;
    const response = await authFacebook({
      variables: {
        user: {
          name,
          email,
          imageUrl: url,
        },
      },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.authFacebook,
          },
        });
      },
    });
    localStorage.setItem("token", response.data?.authFacebook.token || "");
    router.push("/");
  };
  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!}
      callback={responseFacebook}
      autoLoad={false}
      cssClass="uppercase flex justify-center items-center hover:text-white hover:bg-gray-800 transition-colors w-full my-3 font-bold text-gray-800 p-2 border border-gray-600 rounded-md"
      fields="name,email,picture"
      icon={<FaFacebook className="mr-3 text-blue-500" />}
    />
  );
};

export default FacebookLoginBtn;
