import { ModalTitle } from "../Modal";

export const NewsModalContent = ({ news }) => {
  return (
    <div>
      <ModalTitle title={news.title} />
      {news.picture && (
        <div className="float-left clear-left w-32 rounded-md h-32 overflow-hidden mr-2 mb-1 flex items-center">
          <div
            className="w-full h-full rounded-md overflow-hidden mr-5 md:mr-4 mb-1 flex-shrink-0 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${news.picture}')` }}
          />
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: news.text }}
        className="mt-10 text-sm md:text-base"
      />
      {news.author && (
        <div className="flex justify-end text-stone-400 font-semibold text-sm">
          Autor: {news.author}
        </div>
      )}
    </div>
  );
};

export default NewsModalContent;
