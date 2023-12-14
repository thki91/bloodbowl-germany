import { useState, useEffect } from "react";
import Heading from "../Heading";
import Accordion from "../Accordion";
import useContentful from "../../hooks/useContentful";

const Eurobowl = () => {
  const [readMore, setReadMore] = useState(false);
  const [accordionsData, setAccordionsData] = useState();
  const { getAccordions } = useContentful();

  useEffect(() => {
    const getAccordionsData = async () => {
      const data = await getAccordions();
      setAccordionsData(data.filter((entry) => entry.type === "Eurobowl"));
    };
    getAccordionsData();
  }, []);

  return (
    <section
      className="bg-stone-200 -mx-4 sm:-mx-10 px-6 sm:px-10 py-5 md:py-10 lg:py-10 xl:py-"
      id="was-ist-eurobowl"
    >
      {/* mobile */}
      <div className="sm:hidden text-center sm:text-left">
        <Heading title="Eurobowl: Das Nationenturnier" />
      </div>
      <div className="xl:flex xl:items-center -mt-2 sm:mt-2 transition-all ease-in-out duration-700">
        <div className="relative xl:min-w-[350px] transition-all duration-500">
          <img
            src="/eurobowl.jpg"
            className="sm:block sm:flex-shrink-0 w-[120px] sm:w-[250px] sm:h-[230px] xl:w-[350px] xl:h-[300px] float-left clear-left rounded-[40px] xl:rounded-[100px] pr-3 xl:pr-10"
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
                Ausnahme der World-Cup und Covid-Jahre, statt. Als
                nationenübergreifendes Teamturnier handelt es sich beim Eurobowl
                traditionell um eine Europameisterschaft, doch seit 2022 dürfen
                auch andere Nationalteams teilnehmen. Ein Nationalteam besteht
                dabei aus 8 Coaches. Parallel zum Eurobowl finden die Eur’Open
                statt, ein Teamturnier ohne nationale Beschränkungen für Teams
                mit 4 Coaches. Sowohl beim Eurobowl als auch der Eur’Open spielt
                jedes Team 6 Runden Blood Bowl.
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
                Der Sieg in jeder Runde basiert auf den kombinierten Ergebnissen
                aller Coaches des Teams. Dies führt tendenziell zu einem etwas
                anderen Meta als bei Einzelspielturnieren, nicht nur weil die
                Coaches unterschiedliche Rassen wählen müssen, sondern auch weil
                bei Teamturnieren häufig "solidere Rassen" was die
                Sieg/Unentschieden zu Niederlagen Quote angeht, gewählt werden.
                Während des Turniers werden die Paarungen beider Teams und die
                darin enthaltenen einzelnen Coaches nach dem Schweizer-System
                gepaart. So spielen die stärksten Teams/Coaches gegeneinander.
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
        <>
          {accordionsData?.map(({ title, description }, index) => (
            <div key={title} className="mb-3">
              <Accordion
                title={title}
                description={description}
                isLastItem={accordionsData.length - 1 === index}
              />
            </div>
          ))}
        </>
      </div>
    </section>
  );
};

export default Eurobowl;
