import { useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "../icons/DeleteIcon";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  tasks: Task[];
  handleDeleteColumn: (id: Id) => void;
  handleUpdateColumn: (id: Id, title: string) => void;
  handleCreateTask: (columnId: Id) => void;
  handleDeleteTask: (id: Id) => void;
}

const ColumnContainer = (props: Props) => {
  const {
    column,
    tasks,
    handleDeleteColumn,
    handleUpdateColumn,
    handleCreateTask,
    handleDeleteTask,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column?.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-colBgColor w-[350px] opacity-40 border border-rose-400 h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-colBgColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBgColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBgColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-colBgColor">
            0
          </div>
          {editMode ? (
            <input
              autoFocus
              value={column.title}
              className="px-2 bg-black border rounded-md outline-none focus:border-rose-400"
              onChange={(e) => handleUpdateColumn(column.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          ) : (
            column.title
          )}
        </div>
        <button
          onClick={() => handleDeleteColumn(column.id)}
          className="px-1 py-2 rounded stroke-gray-400 hover:bg-colBgColor hover:stroke-red-500"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
      <button
        onClick={() => handleCreateTask(column.id)}
        className="flex items-center gap-2 p-4 border-2 rounded-md border-colBgColor border-x-colBgColor hover:bg-mainBgColor hover:text-rose-500 active:bg-black"
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
