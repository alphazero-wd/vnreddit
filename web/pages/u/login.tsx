import { Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import AuthInput from "../../components/auth/AuthInput";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../../generated/graphql";
import { AiOutlineLoading } from "react-icons/ai";
import { useRedirect } from "../../utils/useRedirect";
import HeadPage from "../../components/html/Head";

const Signup: NextPage = () => {
  const [login, { loading }] = useLoginMutation();
  const { data } = useMeQuery();
  useRedirect(!!data?.me, "/");

  return (
    <>
      <HeadPage title="Login" />
      <div className="container w-full md:w-3/6">
        <h1 className="text-center font-bold mb-3 text-2xl">
          Login to your account
        </h1>
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: {
                user: values,
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.user,
                  },
                });
              },
            });
            console.log("response: ", response);
            const error = response.data?.login.error;
            const user = response.data?.login.user;
            if (user) {
              localStorage.setItem("token", user.token);
            } else if (error && error.field) {
              setErrors({ [error.field]: error.message });
            }
            return response;
          }}
        >
          {({ handleSubmit, handleChange, errors }) => (
            <form className="mt-6 mb-3" onSubmit={handleSubmit}>
              <AuthInput
                onChange={handleChange}
                name="usernameOrEmail"
                errors={errors}
                label="Username or email"
              />
              <AuthInput
                onChange={handleChange}
                name="password"
                errors={errors}
                label="Password"
                type="password"
              />
              <span className="text-blue-500 cursor-pointer mb-3 block hover:text-blue-300">
                <Link href="/u/forgot-password">Forgot password?</Link>
              </span>
              <button
                disabled={loading}
                type="submit"
                className="bg-blue-500 flex items-center justify-center hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
              >
                {loading && (
                  <AiOutlineLoading className="animate-spin text-xl mr-2" />
                )}{" "}
                Login
              </button>
            </form>
          )}
        </Formik>
        <div className="text-center">
          Don&apos;t have an account?{" "}
          <span className="cursor-pointer text-blue-500 hover:text-blue-400 transition-colors">
            <Link href="/u/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
