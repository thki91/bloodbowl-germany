const NewsItem = ({ news, handleClickReadMore }) => {
  return (
    <div className="relative self-stretch rounded-md p-1 sm:p-4 flex-[48%] lg:max-w-[48%] mb-5 lg:mb-0 text-sm md:text-base bg-stone-200 shadow-md">
      <div
        className={`absolute -right-0 rounded-sm text-xs tracking-wider font-semibold p-1.5 -top-0 ${
          news.type.toUpperCase() === "BLOG"
            ? "bg-amber-500 text-white"
            : "bg-stone-900 text-white"
        }`}
      >
        {news.type.toUpperCase()}
      </div>
      <a
        className="lg:pointer-events-none text-black hover:text-black"
        onClick={() => handleClickReadMore(news)}
      >
        <div className="flex items-center lg:items-start xl:items-center">
          {news.picture && (
            <div
              className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-md overflow-hidden mr-3 lg:mr-4 mb-1 flex-shrink-0 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url('${news.picture}?w=250')` }}
            />
          )}
          <div>
            <div className="sm:hidden text-stone-500 font-semibold mb-0.5">
              {new Date(news?.publishedAt)?.toLocaleDateString("de-DE", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
              })}
            </div>
            <h3 className="font-semibold sm:mb-1 pr-10">
              <span className="hidden sm:inline mr-2">
                {new Date(news?.publishedAt)?.toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}{" "}
                |
              </span>
              {news?.title}
            </h3>
            <div className="hidden sm:block font-normal">
              {news?.previewText}
              <a
                className="text-red-600 hover:text-red-500 transition cursor-pointer ml-0.5 pointer-events-auto"
                onClick={() => handleClickReadMore(news)}
              >
                Weiterlesen
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
export default NewsItem;
