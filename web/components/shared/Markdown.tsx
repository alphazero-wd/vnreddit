import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { FC } from "react";
import { SimpleMDEReactProps } from "react-simplemde-editor";

const MDEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const Markdown: FC<SimpleMDEReactProps> = ({ value, onChange }) => {
  return <MDEditor value={value} onChange={onChange} />;
};

export default Markdown;
