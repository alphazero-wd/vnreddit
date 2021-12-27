import { NextPage } from "next";
import UpdateUsername from "../../components/user/UpdateUsername";

const Settings: NextPage = () => {
  return (
    <div className="container w-5/6 lg:p-4">
      <div className="w-2/5">
        <h2 className="text-xl font-semibold mb-8">Customize profile</h2>
        <UpdateUsername />
      </div>
    </div>
  );
};

export default Settings;
