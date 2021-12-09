import { FC } from "react";

interface Props {
  placeholder: string;
  type?: string;
}

const AuthInput: FC<Props> = ({ placeholder, type }) => {
  return (
    <input
      type={type || "text"}
      className="border py-2 px-3 w-full font-normal border-gray-200 shadow-sm mb-4 focus:ring-2 focus:border-transparent rounded-md focus:ring-blue-500"
      placeholder={placeholder}
    />
  );
};

export default AuthInput;
