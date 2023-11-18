import { useEffect, useState } from "react";
import useContentful from "../../hooks/useContentful";
import CarouselDefault from "../Carousel";

const FactItem = ({ text, iconUrl }) => {
  return (
    <>
      <img src={iconUrl} className="w-12 text-center mx-auto mb-7" />
      <div className=" text-center mb-2">Wusstest du...</div>
      <div className="pb-8 sm:pb-12 text-center">{text}</div>
    </>
  );
};

function Facts() {
  const [factsData, setFactsData] = useState();
  const { getFacts } = useContentful();

  useEffect(() => {
    const getFactsData = async () => {
      const data = await getFacts();
      setFactsData(data);
    };
    getFactsData();
  }, []);

  return (
    <section className="pt-10 sm:pt-18 pb-10 sm:pb-16 bg-stone-800 -mx-4 sm:-mx-10 text-white text-md sm:text-xl font-semibold">
      <div className="mx-auto max-w-[80%]">
        {factsData?.length > 0 && (
          <CarouselDefault
            items={factsData?.map((fact) => (
              <FactItem text={fact.description} iconUrl={fact.icon} />
            ))}
          />
        )}
      </div>
    </section>
  );
}

export default Facts;
