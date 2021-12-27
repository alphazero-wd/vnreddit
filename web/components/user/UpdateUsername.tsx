import { Formik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { useUpdateUsernameMutation, useMeQuery } from "../../generated/graphql";
import AuthInput from "../auth/AuthInput";

const UpdateUsername: FC = () => {
  const [updateUsername] = useUpdateUsernameMutation();
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
        <Formik
          initialValues={{ username: "" }}
          onSubmit={async ({ username }, { setErrors }) => {
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
              alert("User updated successfully.");
            }
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
