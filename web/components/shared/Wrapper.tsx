import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import {
  useMeQuery,
  useSendConfirmationEmailMutation,
} from "../../generated/graphql";
import Modal from "./Modal";
import Navbar from "./Navbar";

const Wrapper: FC = ({ children }) => {
  const { data } = useMeQuery();
  const [sendConfirmationEmail] = useSendConfirmationEmailMutation();
  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
      data?.me &&
      !data.me.isConfirmed &&
      router.pathname !== "/u/confirm/[token]"
    ) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen ">
        <section className="pt-4 sm:p-4 lg:p-6 min-h-full">{children}</section>
      </div>
      {modal && (
        <Modal
          title="You have not confirmed your account."
          body={
            <>
              {alert && (
                <div className="p-4 border-l-8 flex items-center border-green-800 bg-green-300">
                  <BsCheckCircle className="text-xl text-green-800 mr-2 inline" />
                  <div>
                    A confirmation email has been sent to your email account.
                  </div>
                </div>
              )}
              <p className="mt-2">
                You must confirm your account before accessing our website.
              </p>
            </>
          }
          isOpen={!data?.me?.isConfirmed}
          onClose={() => setModal(!data?.me?.isConfirmed)}
          onSubmit={async () => {
            data?.me && !data.me.isConfirmed && setAlert(true);
            await sendConfirmationEmail();
          }}
        />
      )}
    </>
  );
};

export default Wrapper;
