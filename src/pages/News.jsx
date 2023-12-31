import Layout from "../Layout";
import { useEffect, useState } from "react";
import useContentful from "../hooks/useContentful";
import Modal from "../components/Modal";
import ArticleFilters from "../components/news/ArticleFilters";
import NewsItem from "../components/news/NewsItem";
import { useLocation } from "react-router-dom";
import NewsModalContent from "../components/news/NewsModalContent";

const NEWS_CHUNK = 10;

function News() {
  const [newsData, setNewsData] = useState();
  const [newsToShow, setNewsToShow] = useState(NEWS_CHUNK);
  const [modalContent, setModalContent] = useState();
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const { search } = useLocation();
  const { getNews } = useContentful();

  useEffect(() => {
    const getNewsArticles = async () => {
      const data = await getNews();
      setNewsData(data);

      const idQueryParam = new URLSearchParams(search)?.get("id");
      if (idQueryParam) {
        const newsToShowInModal = data.find(
          (newsEntry) => newsEntry.id === idQueryParam
        );
        if (newsToShowInModal)
          setModalContent(<NewsModalContent news={newsToShowInModal} />);
      }
    };
    getNewsArticles();
  }, [search]);

  const handleClickReadMore = (news) => {
    setModalContent(<NewsModalContent news={news} />);
  };

  const handleClickShowNews = () => {
    if (newsToShow >= newsData?.length) {
      setNewsToShow(NEWS_CHUNK);
    } else {
      setNewsToShow(newsToShow + NEWS_CHUNK);
    }
  };

  const getSelectedArticles = () =>
    newsData?.slice(0, newsToShow)?.filter((item) => {
      if (selectedFilter === "ALL") return true;
      return item.type.toUpperCase() === selectedFilter;
    });

  return (
    <Layout>
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <section className="py-6 sm:py-10 sm:mb-4 sm:mt-0">
        <ArticleFilters
          handleClickFilter={(filter) => setSelectedFilter(filter)}
          selectedFilter={selectedFilter}
        />
        <div className="lg:flex items-center justify-start gap-x-6 gap-y-6 flex-wrap">
          {newsData &&
            getSelectedArticles().map((news) => (
              <NewsItem
                news={news}
                key={news.publishedAt}
                handleClickReadMore={handleClickReadMore}
              />
            ))}
        </div>

        {getSelectedArticles()?.length > NEWS_CHUNK && (
          <a
            onClick={handleClickShowNews}
            className="flex justify-end mt-5 px-2 lg:px-8 xl:px-10 text-sm md:text-base"
          >
            {newsToShow >= getSelectedArticles()?.length
              ? "Weniger anzeigen"
              : "Mehr anzeigen"}
          </a>
        )}
      </section>
      <section className="pt-10 sm:pt-18 pb-10 sm:pb-10 bg-stone-800 -mx-4 sm:-mx-14 lg:-mx-20 text-white">
        <div className="mx-auto max-w-[80%] text-center flex flex-col justify-center items-center">
          <h3 className="mb-2 sm:mb-4 font-semibold">News & Blog abonnieren</h3>
          <div className="text-base md:text-lg max-w-[500px]">
            Um stets auf dem Laufenden zu bleiben, melde dich für unseren
            Newsblogletter an! Du bekommst dann eine Info per Mail, sobald es
            einen neuen News- oder Blogbeitrag gibt.
          </div>
          <div className="flex items-center justify-center gap-x-5 pt-5">
            <a
              className="bg-red-600 hover:bg-red-500 py-2 px-3 rounded-md font-semibold transition text-white hover:text-white"
              href="https://seu2.cleverreach.com/f/375593-376397/"
              target="_blank"
            >
              Anmelden
            </a>
            <a
              href="https://seu2.cleverreach.com/f/375593-376397/wwu/"
              className="bg-stone-800 hover:bg-stone-900 border-stone-600 border py-2 px-3 rounded-md font-semibold transition text-white hover:text-white"
              target="_blank"
            >
              Abmelden
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default News;
