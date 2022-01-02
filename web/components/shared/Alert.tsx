import { FC } from "react";
import { IconType } from "react-icons";

interface Props {
  message: string;
  color: "success" | "danger";
  Icon: IconType;
}

const Alert: FC<Props> = ({ message, color, Icon }) => {
  return (
    <div
      className={`p-4 border-l-8 flex items-center ${
        color === "success"
          ? "border-green-800 bg-green-300"
          : "border-red-600 bg-red-300"
      }`}
    >
      <Icon
        className={`text-xl text-${
          color === "success" ? "green" : "red"
        }-800 mr-3`}
      />
      <div>{message}</div>
    </div>
  );
};

export default Alert;
