const ArticleFilters = ({ handleClickFilter, selectedFilter }) => {
  return (
    <div className="text-sm md:text-base flex items-center justify-center mb-6 xl:mb-7 gap-x-4 whitespace-nowrap">
      <a
        className={`py-2 px-1 sm:px-4 border-b-2 ${
          selectedFilter === "ALL"
            ? "border-red-600"
            : "text-stone-400 border-white"
        }`}
        onClick={() => handleClickFilter("ALL")}
      >
        Alles
      </a>
      <a
        className={`py-2 px-1 sm:px-4 border-b-2 ${
          selectedFilter === "NEWS"
            ? "border-red-600"
            : "text-stone-400 border-white"
        }`}
        onClick={() => handleClickFilter("NEWS")}
      >
        News
      </a>
      <a
        className={`py-2 px-1 sm:px-4 border-b-2 ${
          selectedFilter === "BLOG"
            ? "border-red-600"
            : "text-stone-400 border-white"
        }`}
        onClick={() => handleClickFilter("BLOG")}
      >
        Blog
      </a>
      <a
        className={`py-2 px-1 sm:px-4 border-b-2 ${
          selectedFilter === "LIVE"
            ? "border-red-600"
            : "text-stone-400 border-white"
        }`}
        onClick={() => handleClickFilter("LIVE")}
      >
        Live
      </a>
    </div>
  );
};

export default ArticleFilters;
