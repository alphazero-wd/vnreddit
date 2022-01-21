import { NextPage } from "next";
import HeadPage from "../../components/html/Head";
import Delete from "../../components/user/Delete";
import UpdatePassword from "../../components/user/UpdatePassword";
import UpdateProfileImage from "../../components/user/UpdateProfileImage";
import UpdateUsername from "../../components/user/UpdateUsername";
import { useMeQuery } from "../../generated/graphql";
import { useRedirect } from "../../utils/useRedirect";

const Settings: NextPage = () => {
  const { data } = useMeQuery();
  useRedirect(!data?.me, "/u/login");
  return (
    <>
      <HeadPage title="VnReddit Settings" />
      <div className="container w-5/6 lg:p-4">
        <div className="w-2/5">
          <h2 className="text-xl font-semibold mb-8">Customize profile</h2>
          <UpdateUsername />
          <UpdateProfileImage />
          <UpdatePassword />
          <Delete />
        </div>
      </div>
    </>
  );
};

export default Settings;
