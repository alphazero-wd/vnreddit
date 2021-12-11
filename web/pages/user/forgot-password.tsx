import { NextPage } from "next";
// import router from "next/router";
// import { MeQuery, MeDocument } from "../../generated/graphql";
import Link from "next/link";
import { Formik } from "formik";
import AuthInput from "../../components/auth/AuthInput";

const ForgotPassword: NextPage = () => {
  return (
    <div className="container w-full md:w-3/6">
      <h1 className="text-center dark:text-white font-bold mb-3 text-2xl">
        Forgot Password
      </h1>
      <p className="mb-3 text-center dark:text-white">
        Enter your email and we will send a verification message to your
        account.
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={() => {}}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <form className="mt-6 mb-3" onSubmit={handleSubmit}>
            <AuthInput
              onChange={handleChange}
              name="email"
              errors={errors}
              label="Email"
            />
            <button
              type="submit"
              className="bg-blue-500 flex items-center justify-center hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
            >
              {/* {loading && (
                <AiOutlineLoading className="animate-spin text-xl mr-2" />
              )}{" "} */}
              Send
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
