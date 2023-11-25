import { useEffect, useState } from "react";
import useContentful from "../../hooks/useContentful";
import _ from "lodash";

const FlipCard = ({ front, back }) => {
  return (
    <div className="flip-card flex-1">
      <div className="flip-card-inner">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
};

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState();
  const { getStatistics } = useContentful();

  useEffect(() => {
    const getStatisticsData = async () => {
      const data = await getStatistics();
      setStatisticsData(data.length === 1 ? data[0] : null);
    };
    getStatisticsData();
  }, []);

  if (!statisticsData) return null;
  const basicStatisticBoxClasses =
    "p-4 rounded-md pt-6 text-center mx-auto text-white";

  return (
    <section className="pb-8 md:pb-16 pt-0 md:pt-5">
      <div className="md:flex gap-x-3 md:gap-x-6 xl:gap-x-10 items-center justify-center">
        <FlipCard
          front={
            <div
              className={`${basicStatisticBoxClasses} bg-stone-800`}
              dangerouslySetInnerHTML={{
                __html: statisticsData.frontTextBlack,
              }}
            />
          }
          back={
            <div
              className={`${basicStatisticBoxClasses} bg-stone-800`}
              dangerouslySetInnerHTML={{
                __html: statisticsData.backTextBlack,
              }}
            />
          }
        />
        <FlipCard
          front={
            <div
              className={`${basicStatisticBoxClasses} bg-gradient-to-t from-red-600 from-0% via-50% to-red-800`}
              dangerouslySetInnerHTML={{
                __html: statisticsData.frontTextRed,
              }}
            />
          }
          back={
            <div
              className={`${basicStatisticBoxClasses} bg-gradient-to-t from-red-600 from-0% via-50% to-red-800`}
              dangerouslySetInnerHTML={{
                __html: statisticsData.backTextRed,
              }}
            />
          }
        />
        <FlipCard
          front={
            <div
              className={`${basicStatisticBoxClasses} bg-gradient-to-t from-amber-300 from-0% via-50% to-amber-600`}
              dangerouslySetInnerHTML={{
                __html: statisticsData.frontTextYellow,
              }}
            />
          }
          back={
            <div
              className={`${basicStatisticBoxClasses} bg-gradient-to-t from-amber-300 from-0% via-50% to-amber-600`}
              dangerouslySetInnerHTML={{
                __html: statisticsData.backTextYellow,
              }}
            />
          }
        />
      </div>
    </section>
  );
};

export default Statistics;
