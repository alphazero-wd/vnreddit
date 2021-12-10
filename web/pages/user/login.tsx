import { Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthInput from "../../components/auth/AuthInput";
import { useLoginMutation } from "../../generated/graphql";

const Signup: NextPage = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

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
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: {
              user: values,
            },
          });
          const error = response.data?.login.error;
          const user = response.data?.login.user;
          if (user) {
            router.push("/");
            localStorage.setItem("token", JSON.stringify(user.token));
          } else if (error && error.field) {
            setErrors({ [error.field]: error.message });
          }
        }}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <form className="mt-6 mb-3" onSubmit={handleSubmit}>
            <AuthInput
              onChange={handleChange}
              name="usernameOrEmail"
              errors={errors}
              placeholder="Username or email"
            />
            <AuthInput
              onChange={handleChange}
              name="password"
              errors={errors}
              placeholder="Password"
              type="password"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
            >
              Login
            </button>
          </form>
        )}
      </Formik>
      <div className="text-center">
        Don&apos;t have an account?{" "}
        <a className="text-blue-500 hover:text-blue-400 transition-colors">
          <Link href="/user/signup">Sign up</Link>
        </a>
      </div>
    </div>
  );
};

export default Signup;
