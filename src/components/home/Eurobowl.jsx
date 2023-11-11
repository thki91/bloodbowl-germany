import Heading from "../Heading";

const Eurobowl = () => {
  return (
    <section
      className="bg-stone-200 -mx-4 sm:-mx-10 px-6 sm:px-10 py-5 md:py-10 lg:py-20"
      id="was-ist-eurobowl"
    >
      <div className="xl:flex xl:items-center mt-2 transition-all ease-in-out duration-700">
        <div className="relative xl:min-w-[350px] transition-all duration-500">
          <img
            src="/bloodbowl.jpeg"
            className="hidden sm:block sm:flex-shrink-0 w-[100px] sm:w-[250px] xl:w-[350px] float-left clear-left xl:pr-10"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
        {/* desktop */}
        <div className="transition-all duration-700 flex-1">
          <div className="text-center sm:text-left">
            <Heading title="Eurobowl: Das Nationenturnier" />
          </div>
          <div className="xl:flex sm:gap-x-7 text-sm sm:text-base">
            <div className="flex-1 text-justify">
              <p>
                Der Eurobowl ist eines der am längsten laufenden Turniere in der
                Geschichte des Blood Bowl. Er findet seit 2003 jedes Jahr, mit
                Ausnahme der Jahre in denen die Blood Bowl-Weltmeisterschaft
                stattfand und den Covid-Jahren, statt. Der Eurobowl ist ein
                nationenübergreifendes Mannschaftsturnier für Teams mit 8
                Coaches. Dem Namen nach handelt es sich traditionell um eine
                Europameisterschaft, doch seit 2022 dürfen auch andere
                Nationalmannschaften teilnehmen.Jeder Coach des Teams nimmt an
                einem anderen Rennen in einem abgestuften Fähigkeitspaketsystem
                teil. Parallel zum Eurobowl finden die Europen statt, ein
                Teamturnier ohne nationale Beschränkungen für Teams mit 4
                Coaches.
              </p>
            </div>
            <div className="flex-1 text-justify">
              <p>
                Jede Mannschaft spielt 6 Runden Blood Bowl. Da es sich um ein
                Mannschaftsturnier handelt, basiert der Sieg in jedem Match auf
                den kombinierten Ergebnissen der gesamten Mannschaft. Dies führt
                tendenziell zu einem etwas anderen Meta als bei
                Einzelspielturnieren, nicht nur weil die Coaches
                unterschiedliche Rassen wählen müssen, sondern auch weil bei
                einem Teamturnier häufig "solidere Rassen", d.h. Rassen die
                weniger gewinnen, aber auch weniger verlieren gewählt werden.
                Nach der ersten Runde werden die Paarungen beider Mannschaften
                und die darin enthaltenen einzelnen Coaches nach dem
                Schweizer-System gepaart, was bedeutet, dass die stärksten
                Coaches gegen die stärksten Coaches der gegnerischen Mannschaft
                spielen. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Eurobowl;
