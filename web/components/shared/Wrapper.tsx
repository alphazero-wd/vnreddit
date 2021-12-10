import { FC } from "react";

const Wrapper: FC = ({ children }) => {
  return (
    <div className="bg-gray-200 h-screen">
      <section className="pt-4 md:p-4 lg:p-6 ">{children}</section>
    </div>
  );
};

export default Wrapper;
