import { useState } from "react";
import MinusIcon from "../icons/DeleteIcon";
import { Task, Id } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TasksTypes {
  task: Task;
  handleDeleteTask: (id: Id) => void;
  handleUpdateTask: (id: Id, content: string) => void;
}

const TaskCard: React.FC<TasksTypes> = ({
  task,
  handleDeleteTask,
  handleUpdateTask,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task?.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-mainBgColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-lg border-2 border-rose-500 cursor-grab relative opacity-50"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBgColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-lg hover:ring-2 hover:ring-inset hover:ring-red-500 cursor-grab relative"
      >
        <textarea
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode();
          }}
          className="w-full h-full text-lg text-white bg-transparent rounded-lg outline-none resize-none"
          value={task.content}
          placeholder="Enter task description"
          onBlur={toggleEditMode}
          onChange={(e) => handleUpdateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-mainBgColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-lg hover:ring-2 hover:ring-inset hover:ring-red-500 cursor-grab relative task"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <p className="w-full h-[90%] my-auto overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
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
