import Layout from "../Layout";
import { useEffect, useState } from "react";
import useContentful from "../hooks/useContentful";
import Modal from "../components/Modal";
import { NewsModalContent } from "../components/News";

const NEWS_CHUNK = 8;

function News() {
  const [newsData, setNewsData] = useState();
  const [newsToShow, setNewsToShow] = useState(NEWS_CHUNK);
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
      <div className="relative self-stretch rounded-md p-1 sm:p-4 flex-[48%] lg:max-w-[48%] mb-5 lg:mb-0 text-sm md:text-base bg-stone-200 shadow-md">
        <div className="absolute -right-0 bg-stone-300 rounded-sm text-xs tracking-wider font-semibold p-1.5 text-stone-800 -top-0">
          NEWS
        </div>
        <a
          className="lg:pointer-events-none text-black hover:text-black"
          onClick={() => handleClickReadMore(news)}
        >
          <div className="flex items-center lg:items-start xl:items-center">
            {news.picture && (
              <div
                className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-md overflow-hidden mr-3 lg:mr-4 mb-1 flex-shrink-0 bg-contain bg-no-repeat bg-center"
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

  const handleClickShowNews = () => {
    if (newsToShow >= newsData?.length) {
      setNewsToShow(NEWS_CHUNK);
    } else {
      setNewsToShow(newsToShow + NEWS_CHUNK);
    }
  };

  return (
    <Layout>
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <section className="py-6 sm:py-10 mt-4 sm:my-5">
        <div className="lg:flex items-center justify-start gap-x-6 gap-y-6 flex-wrap">
          {newsData?.slice(0, newsToShow).map((news) => (
            <NewsItem news={news} />
          ))}
        </div>
        <div className="flex justify-end mt-5 px-2 lg:px-8 xl:px-10 text-sm md:text-base">
          <a onClick={handleClickShowNews}>
            {newsToShow >= newsData?.length
              ? "Weniger anzeigen"
              : "Mehr anzeigen"}
          </a>
        </div>
      </section>
      <section className="pt-10 sm:pt-18 pb-10 sm:pb-16 bg-stone-800 -mx-4 sm:-mx-10 text-white">
        <div className="mx-auto max-w-[80%] text-center flex flex-col justify-center items-center">
          <h3 className="mb-2 font-semibold">News & Blog abonnieren</h3>
          <div className="text-sm md:text-base max-w-[500px]">
            Um stets auf dem Laufenden zu bleiben, melde dich{" "}
            <a href="#">hier</a> für unseren Newsblogletter an! Du bekommst dann
            eine Info per Mail, sobald es einen neuen News- oder Blogbeitrag
            gibt.
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default News;
