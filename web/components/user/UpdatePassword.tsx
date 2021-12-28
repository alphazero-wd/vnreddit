import { Formik } from "formik";
import { FC } from "react";
import { useUpdatePasswordMutation } from "../../generated/graphql";
import AuthInput from "../auth/AuthInput";

const UpdatePassword: FC = () => {
  const [updatePassword] = useUpdatePasswordMutation();

  return (
    <>
      <div className="mb-8">
        <small className="uppercase tracking-wider font-bold text-gray-600">
          Security
        </small>
        <hr className="text-gray-800" />
      </div>
      <div className="mb-8">
        <Formik
          initialValues={{ confirmPassword: "", newPassword: "", password: "" }}
          onSubmit={async (values, { setErrors, setValues }) => {
            const response = await updatePassword({
              variables: values,
            });
            const error = response?.data?.updatePassword.error;
            if (error) {
              setErrors({ [error.field as string]: error.message });
              setValues({ ...values, [error.field as string]: "" });
            } else {
              alert("Password updated successfully.");
              setValues({ password: "", newPassword: "", confirmPassword: "" });
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <AuthInput
                type="password"
                onChange={handleChange}
                name="password"
                label="Password"
                errors={errors}
                value={values.password}
              />
              <AuthInput
                type="password"
                onChange={handleChange}
                name="newPassword"
                label="New password"
                errors={errors}
                value={values.newPassword}
              />
              <AuthInput
                type="password"
                onChange={handleChange}
                name="confirmPassword"
                label="Confirm new password"
                errors={errors}
                value={values.confirmPassword}
              />
              <button type="submit" className="primary-btn mt-3">
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UpdatePassword;
