import { useEffect, useState } from "react";
import useContentful from "../hooks/useContentful";
import CarouselDefault from "./Carousel";
import Modal, { ModalTitle } from "./Modal";

const News = ({}) => {
  const [newsData, setNewsData] = useState();
  const [modalContent, setModalContent] = useState();
  const { getNews } = useContentful();

  useEffect(() => {
    const getNewsArticles = async () => {
      const data = await getNews();
      const newsSorted = data.sort(function (a, b) {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });
      setNewsData(newsSorted);
    };
    getNewsArticles();
  }, []);

  const handleClickReadMore = (news) => {
    setModalContent(
      <div>
        <ModalTitle title={news.title} />
        <div
          dangerouslySetInnerHTML={{ __html: news.text }}
          className="mt-10 text-sm md:text-base"
        />
      </div>
    );
  };

  const NewsItem = ({ news }) => {
    return (
      <div className="rounded-sm flex-[45%] mb-5 md:mb-10 text-white text-sm sm:text-base">
        <h3 className="font-semibold mb-2 text-zinc-200">
          <span className="text-zinc-200">
            {new Date(news?.publishedAt)?.toLocaleDateString("de-DE")} |{" "}
          </span>
          {news?.title}
        </h3>
        <div>
          {news?.previewText}
          <a
            className="text-red-600 hover:text-red-500 transition cursor-pointer"
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
      <div className="max-w-[350px] sm:max-w-[450px] mt-5 sm:mt-10 mb-10 sm:mb-0 overflow-hidden pr-5 sm:pr-0">
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
