import Layout from "../Layout";
import { useEffect, useState } from "react";
import useContentful from "../hooks/useContentful";
import Modal from "../components/Modal";
import { NewsModalContent } from "../components/News";
import Facts from "../components/home/Facts";

function News() {
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
    setModalContent(<NewsModalContent news={news} />);
  };

  const NewsItem = ({ news }) => {
    return (
      <div className="self-stretch rounded-md p-1 sm:p-4 flex-[48%] md:max-w-[48%] mb-5 md:mb-0 text-sm md:text-base bg-stone-200 shadow-md">
        <a
          className="md:pointer-events-none text-black hover:text-black"
          onClick={() => handleClickReadMore(news)}
        >
          <div className="flex items-center md:items-start xl:items-center">
            {news.picture && (
              <div
                className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-md overflow-hidden mr-3 md:mr-4 mb-1 flex-shrink-0 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url('${news.picture}')` }}
              />
            )}
            <div>
              <div className="sm:hidden text-stone-500 font-semibold mb-0.5">
                {new Date(news?.publishedAt)?.toLocaleDateString("de-DE")}
              </div>
              <h3 className="font-semibold sm:mb-2">
                <span className="hidden sm:inline mr-2">
                  {new Date(news?.publishedAt)?.toLocaleDateString("de-DE")} |
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

  return (
    <Layout>
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <section className="py-6 sm:py-10 mt-4 sm:my-5">
        <div className="md:flex items-center justify-start gap-x-6 gap-y-6 flex-wrap">
          {newsData?.map((news) => (
            <NewsItem news={news} />
          ))}
        </div>
      </section>
      <Facts />
    </Layout>
  );
}

export default News;
