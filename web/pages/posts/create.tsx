import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import { Formik } from "formik";
// import AuthInput from "../../components/auth/AuthInput";
import { useCreatePostMutation, useMeQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import AuthInput from "../../components/auth/AuthInput";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react";

interface MDEditorProps {
  onChange: (value: string) => void;
  value: string;
}

const MDEditor = dynamic<MDEditorProps>(
  () => import("@uiw/react-md-editor").then((mod) => mod.default) as any,
  { ssr: false }
);

const CreatePost: NextPage = () => {
  const [createPost, { loading }] = useCreatePostMutation();
  const { data } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!data?.me) {
      router.replace("/user/login");
    }
  }, [data]);

  return (
    <div className="container w-full md:w-3/6">
      <h1 className="text-center dark:text-white font-bold mb-3 text-2xl">
        Create post
      </h1>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async ({ title, body }, { setErrors }) => {
          console.log(title, body);
          const { data } = await createPost({
            variables: {
              post: {
                title,
                body,
              },
            },
          });
          const error = data?.createPost.error;
          if (data?.createPost.post) {
            router.push("/");
          }

          if (error) {
            setErrors({ [error.field as string]: error.message });
          }
        }}
      >
        {({ values, setValues, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <AuthInput
              name="title"
              label="Title"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              errors={errors}
            />

            <div>
              <label
                htmlFor="body"
                className="dark:text-white mb-2 font-semibold block"
              >
                Body:{" "}
              </label>
              <MDEditor
                onChange={(value) =>
                  setValues({ ...values, body: value || "" })
                }
                value={values.body}
              />
            </div>
            <div className="flex justify-center items-center mt-3">
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center items-center mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                {loading && <AiOutlineLoading className="animate-spin mr-3" />}
                Create post
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;
