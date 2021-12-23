import { Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";
import AuthInput from "../../../components/auth/AuthInput";
import {
  MeDocument,
  MeQuery,
  useMeQuery,
  useResetPasswordMutation,
} from "../../../generated/graphql";
import { useRedirect } from "../../../utils/useRedirect";

const ResetPassword: NextPage = () => {
  const [resetPassword, { loading, data }] = useResetPasswordMutation();
  const router = useRouter();
  const { token } = router.query;
  const { data: user } = useMeQuery();
  useRedirect(!!user?.me, "/");

  if (data?.resetPassword.error?.field === "token") {
    return (
      <div className="container pt-8 text-center">
        <h2 className="font-bold text-4xl mb-3">
          Oops, something went wrong :(
        </h2>
        <p className="mb-6 mt-3 text-lg">{data.resetPassword.error.message}</p>
        <Link href="/">
          <a className="px-3 py-2 font-semibold hover:bg-blue-400 text-white bg-blue-500 rounded-md">
            Back to home
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container pt-8 w-full md:w-3/6">
      <h1 className="text-center font-bold mb-3 text-2xl">Reset Password</h1>
      <p className="mb-3 text-center ">Enter your new password</p>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await resetPassword({
            variables: {
              payload: {
                token: token as string,
                password: values.password,
                confirmPassword: values.confirmPassword,
              },
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.resetPassword.user,
                },
              });
            },
          });

          const error = data?.resetPassword.error;
          const user = data?.resetPassword.user;
          if (error && error.field !== "token") {
            setErrors({ [error.field as string]: error.message });
          }

          if (user) {
            router.push("/");
          }
        }}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <form className="mt-6 mb-3" onSubmit={handleSubmit}>
            <AuthInput
              onChange={handleChange}
              name="password"
              errors={errors}
              label="Password"
              type="password"
            />
            <AuthInput
              onChange={handleChange}
              name="confirmPassword"
              errors={errors}
              label="Confirm Password"
              type="password"
            />
            <button
              type="submit"
              className="bg-blue-500 flex items-center justify-center hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
              disabled={loading}
            >
              {loading && (
                <AiOutlineLoading className="animate-spin text-xl mr-2" />
              )}{" "}
              Reset
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
