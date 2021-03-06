import { Formik } from "formik";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { AiOutlineLoading } from "react-icons/ai";
import AuthInput from "../../components/auth/AuthInput";
import {
  useCreateCommunityMutation,
  useJoinCommunityMutation,
  useMeQuery,
} from "../../generated/graphql";
import { useRedirect } from "../../utils/useRedirect";
import HeadPage from "../../components/html/Head";

const CreateCommunityPage: NextPage = () => {
  const [createCommunity, { loading }] = useCreateCommunityMutation();
  const { data } = useMeQuery();
  const [joinCommunity] = useJoinCommunityMutation();
  const router = useRouter();

  useRedirect(!data?.me, "/u/login");

  return (
    <>
      <HeadPage title="Create a community" />
      <div className="container w-full md:w-3/6">
        <h1 className="text-center font-bold mb-3 text-2xl">
          Create a community
        </h1>
        <Formik
          initialValues={{
            name: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await createCommunity({
              variables: {
                name: values.name,
              },
              update: (cache) => {
                cache.evict({
                  id: "Community:" + data?.createCommunity.community?.id,
                  fieldName: "communities",
                });
              },
            });

            const error = data?.createCommunity.error;
            if (error) {
              setErrors({ [error.field as string]: error.message });
            } else if (data?.createCommunity.community) {
              await joinCommunity({
                variables: {
                  commId: data.createCommunity.community.id,
                },
              });
              router.push(`/vr/${data.createCommunity.community.name}`);
            }
            return;
          }}
        >
          {({ handleSubmit, handleChange, errors, values }) => (
            <form className="mt-6 mb-3" onSubmit={handleSubmit}>
              <AuthInput
                onChange={handleChange}
                name="name"
                errors={errors}
                label="Community name"
              />
              <button
                disabled={loading}
                type="submit"
                className="bg-blue-500 flex items-center justify-center hover:bg-blue-400 transition-colors text-white rounded-md font-semibold w-full border-none px-3 py-2"
              >
                {loading && (
                  <AiOutlineLoading className="animate-spin text-xl mr-2" />
                )}{" "}
                Create community
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateCommunityPage;
