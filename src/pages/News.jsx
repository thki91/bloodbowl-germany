import Layout from "../Layout";
import { useCallback, useEffect, useState } from "react";
import useContentful from "../hooks/useContentful";
import Modal from "../components/Modal";
import ArticleFilters from "../components/news/ArticleFilters";
import NewsItem from "../components/news/NewsItem";
import { useLocation } from "react-router-dom";
import NewsModalContent from "../components/news/NewsModalContent";

const NEWS_CHUNK = 10;

function News() {
  const [newsData, setNewsData] = useState([]);
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

  const getSelectedArticles = useCallback(() => {
    const dataToShow = [...newsData];
    return dataToShow?.slice(0, newsToShow)?.filter((item) => {
      if (selectedFilter === "ALL") return true;
      return item.type.toUpperCase() === selectedFilter;
    });
  }, [newsData, newsToShow, selectedFilter]);

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
                key={news.title}
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
      <section className="pt-9 sm:pt-18 pb-10 sm:pb-10 bg-stone-800 -mx-4 sm:-mx-14 lg:-mx-20 text-white">
        <h3 className="mb-8 font-semibold text-center">
          Unsere Community auf Discord
        </h3>

        <div className="mx-auto text-center flex flex-col justify-center items-center px-6 sm:px-12 lg:px-32">
          <div class="iframe-container">
            <iframe
              src="https://e.widgetbot.io/channels/259586290142412800/889188324504404008"
              frameborder="0"
              allowtransparency="true"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default News;
