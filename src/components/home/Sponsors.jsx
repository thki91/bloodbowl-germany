import { useEffect, useState } from "react";
import useContentful from "../../hooks/useContentful";
import Heading from "../Heading";

function Sponsors() {
  const [sponsorsData, setSponsorsData] = useState();
  const { getSponsors } = useContentful();

  useEffect(() => {
    const getSponsorsData = async () => {
      const data = await getSponsors();
      setSponsorsData(data);
    };
    getSponsorsData();
  }, []);

  if (!sponsorsData) return null;
  return (
    <section className="pt-10 sm:pt-18 pb-10 sm:pb-16 bg-stone-800 -mx-4 sm:-mx-14 lg:-mx-20 text-white text-md sm:text-xl font-semibold">
      <div className="mx-auto max-w-[80%]">
        <Heading title="Sponsoren" centered />
        <div className="flex flex-wrap justify-center items-center">
          {sponsorsData?.map((sponsor) => {
            return (
              <div className="w-1/3 mt-[-1px] ml-[-1px]">
                <div className="border border-stone-600 flex justify-center items-center p-2">
                  <img
                    src={sponsor.logo}
                    className="w-20 sm:w-24"
                    alt="Feuerfurz Logo"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Sponsors;
