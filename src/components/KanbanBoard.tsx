const KanbanBoard = () => {
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
       <div className="m-auto">
    <button className="h-[60px] w-[350px] min-w-[350px] p-4 border-2 rounded-lg cursor-pointer bg-mainBgColor border-colBgColor ring-rose-400 hover:ring-2">
    Add Column
  </button>
       </div>
    </div>
  );
};

export default KanbanBoard;
