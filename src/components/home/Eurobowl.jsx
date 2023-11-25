import { useState, useEffect } from "react";
import Heading from "../Heading";
import Accordion from "../Accordion";
import useContentful from "../../hooks/useContentful";

const Eurobowl = () => {
  const [readMore, setReadMore] = useState(false);
  const [chartaData, setChartaData] = useState();
  const { getCharta } = useContentful();

  useEffect(() => {
    const getChartaData = async () => {
      const data = await getCharta();
      setChartaData(data);
    };
    getChartaData();
  }, []);

  return (
    <section
      className="bg-stone-200 -mx-4 sm:-mx-10 px-6 sm:px-10 py-5 md:py-10 lg:py-10 xl:py-14"
      id="was-ist-eurobowl"
    >
      {/* mobile */}
      <div className="sm:hidden text-center sm:text-left">
        <Heading title="Eurobowl: Das Nationenturnier" />
      </div>
      <div className="xl:flex xl:items-center -mt-2 sm:mt-2 transition-all ease-in-out duration-700">
        <div className="relative xl:min-w-[350px] transition-all duration-500">
          <img
            src="/bloodbowl.jpeg"
            className="pr-3 md:pr-0 sm:block sm:flex-shrink-0 w-[120px] sm:w-[250px] xl:w-[350px] float-left clear-left xl:pr-10"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
        <div className="transition-all duration-700 flex-1">
          {/* desktop */}
          <div className="hidden sm:block text-center sm:text-left">
            <Heading title="Eurobowl: Das Nationenturnier" />
          </div>
          <div className="xl:flex sm:gap-x-7 text-sm md:text-base">
            <div className="flex-1 xl:text-justify">
              <p>
                Der Eurobowl ist eines der am längsten laufenden Turniere in der
                Geschichte des Blood Bowl. Er findet seit 2003 jährlich, mit
                Ausnahme der World-Cup-Jahre und den Covid-Jahren, statt. Der
                Eurobowl ist ein nationenübergreifendes Mannschaftsturnier für
                Teams mit 8 Coaches. Traditionell handelt es um eine
                Europameisterschaft, doch seit 2022 dürfen auch andere
                Nationalmannschaften teilnehmen. Parallel zum Eurobowl finden
                die Europen statt, ein Teamturnier ohne nationale Beschränkungen
                für Teams mit 4 Coaches. Sowohl beim Eurobowl als auch der
                EurOpen spielt jede Mannschaft 6 Runden Blood Bowl.
                <a
                  onClick={() => setReadMore(!readMore)}
                  className={`md:hidden ml-0.5 ${readMore ? "hidden" : ""}`}
                >
                  Mehr lesen
                </a>
              </p>
            </div>
            <div
              className={`flex-1 xl:text-justify ${
                readMore ? "!block" : "hidden md:block"
              }`}
            >
              <p>
                Da es sich um ein Mannschaftsturnier handelt, basiert der Sieg
                in jedem Match auf den kombinierten Ergebnissen der gesamten
                Mannschaft. Dies führt tendenziell zu einem etwas anderen Meta
                als bei Einzelspielturnieren, nicht nur weil die Coaches
                unterschiedliche Rassen wählen müssen, sondern auch weil bei
                einem Teamturnier häufig "solidere Rassen" was die
                Sieg-Unentschieden-Niederlagen-Quote angeht, gewählt werden.
                Während des Turniers werden die Paarungen beider Mannschaften
                und die darin enthaltenen einzelnen Coaches nach dem
                Schweizer-System gepaart.
                <a
                  onClick={() => setReadMore(!readMore)}
                  className={`md:hidden ml-0.5 ${!readMore ? "hidden" : ""}`}
                >
                  Weniger lesen
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 md:mb-0">
        <Accordion
          title="Eurobowl Charta"
          children={
            <>
              {chartaData?.map(({ title, description }, index) => (
                <div key={title}>
                  <Accordion
                    title={title}
                    description={description}
                    isLastItem={chartaData.length - 1 === index}
                  />
                </div>
              ))}
            </>
          }
        />
      </div>
    </section>
  );
};

export default Eurobowl;
