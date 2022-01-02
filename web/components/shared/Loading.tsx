import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="border shadow rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-200 h-10 w-10 mb-3"></div>
        <div className="flex-1 space-y-6 py-1 mb-3">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-200 rounded col-span-2"></div>
              <div className="h-2 bg-gray-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
