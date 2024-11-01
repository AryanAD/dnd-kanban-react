import DeleteIcon from "../icons/DeleteIcon";
import { Column, Id } from "../types";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = (props: Props) => {
  const { column, deleteColumn } = props;

  return (
    <div className="bg-colBgColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBgColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBgColor border-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-colBgColor">
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-colBgColor"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div className="">Footer</div>
    </div>
  );
};

export default ColumnContainer;
