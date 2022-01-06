import { FC, FormEvent, ChangeEvent } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useUpdateProfileImageMutation } from "../../generated/graphql";
import { useAlert } from "../../utils/useAlert";
import Alert from "../shared/Alert";

const UpdateProfileImage: FC = () => {
  const [alert] = useAlert();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    await updateProfileImage({
      variables: {
        image: file,
      },
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await updateProfileImage({ variables: {
    //     imageUrl,
    //   },
    //   update: (cache) => {
    //     cache.evict({ id: "User:" + data?.me?.id, fieldName: "imageUrl" });
    //   },
    // });
    // setImageUrl("");
  };

  return (
    <>
      <div className="mb-8">
        <small className="uppercase tracking-wider font-bold text-gray-600">
          Update profile picture
        </small>
        <hr className="text-gray-800" />
      </div>
      <div className="mb-8">
        {alert && (
          <Alert message="Hello World" color="success" Icon={BsCheckCircle} />
        )}
        <form onSubmit={onSubmit}>
          <div className="flex items-center">
            <div>
              <label htmlFor="image">Upload your profile image</label>
              <input
                type="file"
                accept="image/jpg, image/png, image/svg"
                onChange={onChange}
              />
            </div>
          </div>
          <button type="submit" className="primary-btn mt-3">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfileImage;
