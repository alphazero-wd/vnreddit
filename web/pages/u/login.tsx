import { Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthInput from "../../components/auth/AuthInput";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../../generated/graphql";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react";
import { useRedirect } from "../../utils/useRedirect";

const Signup: NextPage = () => {
  const router = useRouter();
  const [login, { loading }] = useLoginMutation();
  const { data } = useMeQuery();
  useRedirect(!!data?.me, "/");

  useEffect(() => {
    if (data?.me) {
      router.replace("/");
    }
  }, [data]);

  return (
    <div className="container w-full md:w-3/6">
      <h1 className="text-center font-bold mb-3 text-2xl">
        Login to your account
      </h1>
      <Formik
        initialValues={{
          usernameOrEmail: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors, setValues }) => {
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
            localStorage.setItem("token", JSON.stringify(user.token));
            // setValues({
            //   usernameOrEmail: "",
            //   password: "",
            // });
          } else if (error && error.field) {
            setErrors({ [error.field]: error.message });
            // setValues({ ...values, [error.field]: "" });
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
            <Link href="/u/forgot-password">
              <a className="text-blue-500 mb-3 block hover:text-blue-300">
                Forgot password?
              </a>
            </Link>
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
        <a className="text-blue-500 hover:text-blue-400 transition-colors">
          <Link href="/u/signup">Sign up</Link>
        </a>
      </div>
    </div>
  );
};

export default Signup;
