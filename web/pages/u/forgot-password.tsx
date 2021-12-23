import { NextPage } from "next";
import { Formik } from "formik";
import AuthInput from "../../components/auth/AuthInput";
import { useForgotPasswordMutation, useMeQuery } from "../../generated/graphql";
import { AiOutlineLoading } from "react-icons/ai";
import { useRedirect } from "../../utils/useRedirect";

const ForgotPassword: NextPage = () => {
  const [forgotPassword, { data, loading }] = useForgotPasswordMutation();
  const { data: user } = useMeQuery();
  useRedirect(!!user?.me, "/");

  if (data?.forgotPassword.successMessage) {
    return (
      <div className="text-center container w-full md:w-3/6">
        <h1 className="font-bold mb-3 text-2xl">Email Has Been Sent</h1>
        <p className="mb-3">
          A verification message has been sent to your email account. Please
          check in both inbox and spams
        </p>
        <a
          onClick={() => location.reload()}
          className="cursor-pointer text-blue-500 block hover:text-blue-300"
        >
          Need to change your email? Click here
        </a>
      </div>
    );
  }

  return (
    <div className="container w-full md:w-3/6">
      <h1 className="text-center font-bold mb-3 text-2xl">Forgot Password</h1>
      <p className="mb-3 text-center ">
        Enter your email and we will send a verification message to your
        account.
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await forgotPassword({
            variables: {
              email: values.email,
            },
          });

          const error = data?.forgotPassword.error;
          if (error) {
            setErrors({ [error.field as string]: error.message });
          }
        }}
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
              disabled={loading}
            >
              {loading && (
                <AiOutlineLoading className="animate-spin text-xl mr-2" />
              )}{" "}
              Send
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
