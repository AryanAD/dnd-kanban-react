import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (columnId: Id) => {
    const updatedColumns = columns.filter((col) => col.id !== columnId);
    setColumns(updatedColumns);
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="flex gap-4 m-auto">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={() => createNewColumn()}
          className="h-[60px] w-[350px] min-w-[350px] p-4 border-2 rounded-lg cursor-pointer bg-mainBgColor border-colBgColor ring-rose-400 hover:ring-2 flex gap-2"
        >
          <PlusIcon /> Add Column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
