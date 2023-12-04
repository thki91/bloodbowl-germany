import { useEffect, useState } from "react";
import useContentful from "../hooks/useContentful";
import CarouselDefault from "./Carousel";
import Modal, { ModalTitle } from "./Modal";

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
        className=" mt-10 text-sm md:text-base"
      />
    </div>
  );
};

const News = ({}) => {
  const [newsData, setNewsData] = useState();
  const [modalContent, setModalContent] = useState();
  const { getNews } = useContentful();

  useEffect(() => {
    const getNewsArticles = async () => {
      const data = await getNews();
      setNewsData(data.slice(0, 3));
    };
    getNewsArticles();
  }, []);

  const handleClickReadMore = (news) => {
    setModalContent(<NewsModalContent news={news} />);
  };

  const NewsItem = ({ news }) => {
    return (
      <div className="rounded-sm flex-[45%] mb-5 lg:mb-10 text-white text-sm md:text-base">
        <h3 className="font-semibold mb-2 text-stone-200">
          <span className="text-stone-200">
            {new Date(news?.publishedAt)?.toLocaleDateString("de-DE")} |{" "}
          </span>
          {news?.title}
        </h3>
        <div>
          {news?.previewText}
          <a
            className="text-red-600 hover:text-red-500 transition cursor-pointer ml-0.5"
            onClick={() => handleClickReadMore(news)}
          >
            Weiterlesen
          </a>
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <div className="max-w-[350px] sm:max-w-[450px] md:max-w-[500px] mt-5 md:mt-10 mb-5 sm:mb-0 pr-5 sm:pr-0" id="news-carousel">
        <CarouselDefault
          items={newsData?.map((news) => (
            <NewsItem news={news} />
          ))}
        />
      </div>
    </>
  );
};

export default News;
