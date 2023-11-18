import Layout from "../Layout";
import { useEffect, useState } from "react";
import useContentful from "../hooks/useContentful";
import Modal, { ModalTitle } from "../components/Modal";

function Archive() {
  const [newsData, setNewsData] = useState();
  const [modalContent, setModalContent] = useState();
  const { getNews } = useContentful();

  useEffect(() => {
    const getNewsArticles = async () => {
      const data = await getNews();
      setNewsData(data);
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
      <div className="self-stretch rounded-md p-3 sm:p-4 flex-[48%] sm:max-w-[48%] xl:max-w-[32%] xl:flex-[32%] mb-4 sm:mb-0 text-sm sm:text-base bg-stone-200">
        <h3 className="font-semibold mb-2 ">
          <span className="">
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
    <Layout>
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <section className="py-6 sm:py-10 mb-[150px] xl:mb-[300px]">
        {/* <Heading title="Newsarchiv" /> */}
        <div className="sm:flex items-start justify-start gap-x-5 gap-y-5 flex-wrap">
          {newsData?.map((news) => (
            <NewsItem news={news} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Archive;
