import { ErrorMessage, FormikErrors } from "formik";
import { ChangeEvent, FC } from "react";
import { MdOutlineError } from "react-icons/md";

interface Props {
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errors: FormikErrors<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

const AuthInput: FC<Props> = ({
  errors,
  name,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <input
        type={type || "text"}
        className={`border py-2 px-3 w-full font-normal focus:outline-none  ${
          Object.keys(errors).indexOf(name) !== -1
            ? "border-red-600 focus:ring-red-600"
            : "border-gray-200 focus:right-blue-500"
        } shadow-sm mb-1 focus:ring-2 focus:border-transparent rounded-md `}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {Object.keys(errors).indexOf(name) !== -1 && (
        <div className="flex items-center text-red-600">
          <MdOutlineError className="mr-2" />
          <ErrorMessage name={name}>{(msg) => <div>{msg}</div>}</ErrorMessage>
        </div>
      )}
    </div>
  );
};

export default AuthInput;
