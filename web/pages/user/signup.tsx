import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthInput from "../../components/auth/AuthInput";

const SIGNUP_MUTATION = gql`
  mutation Signup($user: SignupInput!) {
    signup(user: $user) {
      user {
        id
        username
        email
        token
      }
      error {
        field
        message
      }
    }
  }
`;

const Signup: NextPage = () => {
  const [signup] = useMutation(SIGNUP_MUTATION);
  const router = useRouter();

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
        onSubmit={async (values, { setErrors }) => {
          const response = await signup({
            variables: {
              user: values,
            },
          });
          const user = response?.data.signup.user;
          const error = response?.data.signup.error;

          if (user) {
            router.push("/");
            localStorage.setItem("token", JSON.stringify(user.token));
          } else if (error) {
            setErrors({ [error.field]: error.message });
          }
        }}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <form className="mt-6 mb-3" onSubmit={handleSubmit}>
            <AuthInput
              name="username"
              placeholder="Username"
              onChange={handleChange}
              errors={errors}
            />
            <AuthInput
              placeholder="Email address"
              onChange={handleChange}
              name="email"
              errors={errors}
            />
            <AuthInput
              placeholder="Password"
              type="password"
              onChange={handleChange}
              name="password"
              errors={errors}
            />
            <AuthInput
              placeholder="Confirm password"
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              errors={errors}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
            >
              Sign up
            </button>
          </form>
        )}
      </Formik>
      <div className="text-center">
        Already have an account?{" "}
        <a className="text-blue-500 hover:text-blue-400 transition-colors">
          <Link href="/user/login">Login</Link>
        </a>
      </div>
    </div>
  );
};

export default Signup;
