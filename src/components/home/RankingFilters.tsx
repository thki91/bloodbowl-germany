export const RankingFilters = ({ filterOptions, handleChangeOption }) => {
  return (
    <div className="overflow-x-auto scrollbar-transparent -mt-2">
      <div className="text-xs sm:text-sm lg:text-base flex items-center sm:justify-center mb-6 gap-x-1.5 whitespace-nowrap min-w-max">
        {filterOptions?.map(({ label, value, selected }) => (
          <a
            className={`py-2 px-1 sm:px-4 border-b-2 ${
              selected ? "border-red-600" : "text-stone-500 border-stone-300"
            }`}
            onClick={() => handleChangeOption(value)}
            key={label}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};
