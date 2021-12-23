import { ErrorMessage, FormikErrors } from "formik";
import { ChangeEvent, FC } from "react";
import { MdOutlineError } from "react-icons/md";
import {
  CreateCommunityMutationVariables,
  CreatePostInput,
  LoginInput,
  SignupInput,
} from "../../generated/graphql";

interface Props {
  label: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errors: FormikErrors<
    | LoginInput
    | SignupInput
    | CreatePostInput
    | CreateCommunityMutationVariables
  >;
  value?: string;
}

const AuthInput: FC<Props> = ({
  value,
  errors,
  name,
  label,
  type,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label className="mb-3font-semibold block">{label}:</label>
      <input
        type={type || "text"}
        className={`border text-gray-800 bg-transparentpy-2 px-3 w-full focus:outline-none  ${
          Object.keys(errors).indexOf(name) !== -1
            ? "border-red-600 focus:ring-red-600"
            : "border-gray-800 focus:right-blue-500"
        } shadow-sm mb-1 focus:ring-2 rounded-md `}
        onChange={onChange}
        name={name}
        placeholder={`Enter your ${label.toLowerCase()} here`}
        value={value}
      />
      {Object.keys(errors).indexOf(name) !== -1 && (
        <div className="text-red-600 flex">
          <MdOutlineError className="text-2xl mr-2" />
          <ErrorMessage name={name}>{(msg) => <div>{msg}</div>}</ErrorMessage>
        </div>
      )}
    </div>
  );
};

export default AuthInput;
