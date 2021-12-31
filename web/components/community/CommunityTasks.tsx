import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { CommunityProps } from "../../utils/types";
interface Props {
  community?: CommunityProps | null;
  tasks: boolean[];
  setModal: Dispatch<SetStateAction<boolean>>;
}

const CommunityTasks: FC<Props> = ({ community, tasks, setModal }) => {
  const router = useRouter();
  const TaskOneCompleted = !tasks[0] ? AiOutlinePlus : AiOutlineCheck;
  const TaskTwoCompleted = !tasks[1] ? BsChatLeftText : AiOutlineCheck;
  return (
    <div className="bg-white px-3 py-4 border border-gray-600 rounded-md">
      <b>Setup vr/{community?.name}</b>
      <p className="mt-2 text-sm text-gray-600 font-bold">
        <span className="text-blue-500">
          {tasks.filter((task) => task).length} of {tasks.length}
        </span>{" "}
        tasks completed
      </p>
      <small className="block my-2">
        Get your community off the ground with these tasks
      </small>
      <div
        onClick={() =>
          !tasks[0] && router.push(`/vr/${community?.name}/post/create`)
        }
        className={`flex ${
          !tasks[0] ? "cursor-pointer hover:bg-gray-100" : ""
        } items-center p-3 mb-3 rounded-md`}
      >
        <div className="bg-gray-300 p-2 mr-3 rounded-full">
          <TaskOneCompleted className="text-gray-600 text-xl" />
        </div>
        Create your first post
      </div>
      <div
        className={`flex items-center p-3 mb-3 rounded-md ${
          !tasks[1] ? "hover:bg-gray-100 cursor-pointer" : ""
        } `}
        onClick={() => !tasks[1] && setModal(true)}
      >
        <div className="bg-gray-300 p-2 mr-3 rounded-full">
          <TaskTwoCompleted className="text-gray-600 text-xl" />
        </div>
        Add a description
      </div>
    </div>
  );
};

export default CommunityTasks;
