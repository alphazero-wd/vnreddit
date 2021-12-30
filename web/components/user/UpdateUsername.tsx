import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useUpdateUsernameMutation, useMeQuery } from "../../generated/graphql";
import { useAlert } from "../../utils/useAlert";
import AuthInput from "../auth/AuthInput";
import Alert from "../shared/Alert";

const UpdateUsername: FC = () => {
  const [updateUsername, { data: result }] = useUpdateUsernameMutation();
  const [alert, setAlert] = useAlert();
  const { data } = useMeQuery();

  return (
    <>
      <div className="mb-8">
        <small className="uppercase tracking-wider font-bold text-gray-600">
          Profile information
        </small>
        <hr className="text-gray-800" />
      </div>
      <div className="mb-8">
        {alert && (
          <Alert
            message={result?.updateUsername.successMessage || ""}
            color="success"
            Icon={BsCheckCircle}
          />
        )}
        <Formik
          initialValues={{ username: "" }}
          onSubmit={async ({ username }, { setErrors, setValues }) => {
            const response = await updateUsername({
              variables: { username },
              update: (cache) => {
                cache.evict({ id: "User:" + data?.me?.id });
              },
            });
            const error = response?.data?.updateUsername.error;
            if (error) {
              setErrors({ [error.field as string]: error.message });
            } else {
              setAlert(true);
            }
            setValues({ username: "" });
          }}
        >
          {({ errors, handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <AuthInput
                  type="text"
                  onChange={handleChange}
                  name="username"
                  label="Username"
                  errors={errors}
                />
                <small
                  className={`block ${
                    values.username.length > 30
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {values.username.length > 30
                    ? 0
                    : 30 - values.username.length}{" "}
                  characters remaining
                </small>
              </div>
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

export default UpdateUsername;
