import { useState } from "react";
import MinusIcon from "../icons/DeleteIcon";
import { Task, Id } from "../types";

interface TasksTypes {
  task: Task;
  handleDeleteTask: (id: Id) => void;
}

const TaskCard: React.FC<TasksTypes> = ({ task, handleDeleteTask }) => {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div
      className="bg-mainBgColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-lg hover:ring-2 hover:ring-inset hover:ring-red-500 cursor-grab relative"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {task.content}
      {mouseOver && (
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="absolute p-2 rounded-lg stroke-white right-4 top-1/2-translate-y-1/2 bg-colBgColor opacity-60 hover:opacity-100"
        >
          <MinusIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
