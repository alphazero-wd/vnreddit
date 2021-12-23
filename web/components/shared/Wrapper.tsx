import { FC } from "react";
import Navbar from "./Navbar";

const Wrapper: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen ">
        <section className="pt-4 md:p-4 lg:p-6 min-h-full">{children}</section>
      </div>
    </>
  );
};

export default Wrapper;
