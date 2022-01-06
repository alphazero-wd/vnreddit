import { Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthInput from "../../components/auth/AuthInput";
import {
  MeDocument,
  MeQuery,
  useMeQuery,
  useSignupMutation,
} from "../../generated/graphql";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react";
import { useRedirect } from "../../utils/useRedirect";

const Signup: NextPage = () => {
  const [signup, { loading }] = useSignupMutation();
  const { data } = useMeQuery();
  const router = useRouter();
  useRedirect(!!data?.me, "/");

  useEffect(() => {
    if (data?.me) {
      router.replace("/");
    }
  }, [data]);

  return (
    <div className="container w-full md:w-3/6">
      <h1 className="text-center font-bold mb-3 text-2xl">
        Become a member of VnReddit
      </h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { setErrors, setValues }) => {
          const response = await signup({
            variables: {
              user: values,
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.signup.user,
                },
              });
            },
          });
          const user = response.data?.signup.user;
          const error = response.data?.signup.error;

          if (user) {
            localStorage.setItem("token", user.token);
          } else if (error && error.field) {
            setErrors({ [error.field]: error.message });
          }
          return response;
        }}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <form className="mt-6 mb-3" onSubmit={handleSubmit}>
            <AuthInput
              name="username"
              label="Username"
              onChange={handleChange}
              errors={errors}
            />
            <AuthInput
              label="Email address"
              onChange={handleChange}
              name="email"
              errors={errors}
            />
            <AuthInput
              label="Password"
              type="password"
              onChange={handleChange}
              name="password"
              errors={errors}
            />
            <AuthInput
              label="Confirm password"
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              errors={errors}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 transition-colors flex items-center justify-center text-white rounded-md font-semibold w-full border-none px-3 py-2"
              disabled={loading}
            >
              {loading && (
                <AiOutlineLoading className="mr-2 animate-spin text-xl" />
              )}{" "}
              Sign up
            </button>
          </form>
        )}
      </Formik>
      <div className="text-center ">
        Already have an account?{" "}
        <a className="text-blue-500 hover:text-blue-400 transition-colors">
          <Link href="/u/login">Login</Link>
        </a>
      </div>
    </div>
  );
};

export default Signup;
