import { useRouter } from "next/router";
import { FC, useState } from "react";
import {
  MeDocument,
  MeQuery,
  useDeleteUserMutation,
  useMeQuery,
} from "../../generated/graphql";
import { useRedirect } from "../../utils/useRedirect";
import Modal from "../shared/Modal";

const Delete: FC = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [modal, setModal] = useState(false);
  const { data } = useMeQuery();
  useRedirect(!data?.me, "/u/login");
  const router = useRouter();

  return (
    <>
      <div className="mb-8">
        <small className="uppercase tracking-wider font-bold text-gray-600">
          Delete account
        </small>
        <hr className="text-gray-800" />
      </div>
      <div className="mb-8">
        <p className="mb-3">There is no going back. Please be certain</p>
        <button
          onClick={() => setModal(true)}
          className="rounded-full bg-red-600 text-white py-1 px-3 transition-colors font-bold hover:bg-red-400"
        >
          Delete account
        </button>
      </div>
      {modal && (
        <Modal
          title="Delete account confirmation"
          body={
            <div>
              <p>
                Once your account is deleted, all the posts associate with your
                account will also be deleted. Are you sure about that?
              </p>
            </div>
          }
          onClose={() => setModal(false)}
          isOpen={modal}
          onSubmit={async () => {
            await deleteUser({
              update: (cache) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: { me: null },
                });
              },
            });
            router.push("/u/login");
          }}
        />
      )}
    </>
  );
};
export default Delete;
