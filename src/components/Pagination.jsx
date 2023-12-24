const Pagination = ({ numbers, handleSetRowsToShow, currentRowsToShow }) => {
  return (
    <div className="flex justify-end ml-auto gap-x-1.5">
      {numbers.map((number) => (
        <span
          className={`link w-6 h-6 border rounded-md flex items-center justify-center text-xs ${
            currentRowsToShow === number
              ? "border-red-500 text-red-500"
              : "border-stone-300 !text-stone-600 "
          }`}
          onClick={() => handleSetRowsToShow(number)}
          key={`pagination-${number}`}
        >
          {number}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
