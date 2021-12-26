import { FC, ReactElement } from "react";

interface Props {
  title: string;
  body: ReactElement;
  onClose: () => void;
  isOpen: boolean;
  onSubmit: () => void;
}

const Modal: FC<Props> = ({ body, title, isOpen, onClose, onSubmit }) => {
  return (
    // <!-- This example requires Tailwind CSS v2.0+ -->
    <div className={`fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`${
            isOpen
              ? "ease-out duration-300 opacity-100"
              : "ease-in duration-200 opacity-0"
          } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className={`${
            isOpen
              ? "ease-in duration-200 opacity-100 translate-y-0 sm:scale-100"
              : "ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          } inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">{body}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-end">
            <button
              type="button"
              className="mr-3 bg-gray-200 rounded-full px-4 py-1 font-bold transition-all hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                onClose();
                onSubmit();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
