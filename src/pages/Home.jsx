import { useState } from "react";
import Layout from "../Layout";
import Heading from "../components/Heading";
import Team from "../components/home/Team";
import Facts from "../components/home/Facts";
import Ranking from "../components/home/Ranking";

function Home() {
  const [readMore, setReadMore] = useState(false);
  return (
    <Layout>
      <section
        className="bg-stone-200 -mx-10 px-10 py-5 md:py-10 lg:py-20"
        id="was-ist-bloodbowl"
      >
        {/* <div className="mb-5">
          <a className="py-2 px-4 border-b-2 border-red-600">Eurobowl</a>
          <a className="text-stone-400 px-4 py-2">Bloowbowl</a>
        </div> */}

        <div className="xl:flex xl:items-center mt-2 transition-all ease-in-out duration-700">
          <div
            className={`relative xl:min-w-[350px] transition-all duration-500 ${
              readMore ? "!min-w-0 !w-0" : ""
            }`}
          >
            <img
              src="/bloodbowl.jpeg"
              className="hidden sm:block sm:flex-shrink-0 w-[100px] sm:w-[250px] xl:w-[350px] float-left xl:pr-10"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          {/* desktop */}
          <div
            className={`hidden sm:block transition-all duration-700 ${
              readMore ? "sm:flex-[150%] xl:ml-0" : "flex-1"
            }`}
          >
            <Heading title="Was ist Bloodbowl?" />
            <div className="xl:flex sm:gap-x-7">
              <div className="flex-1 text-justify">
                <p>
                  Blood Bowl ist ein Brettspiel{" "}
                  <span className="italic">(Tabletop)</span>, bei dem sich zwei
                  Coaches, mit aus Fantasy-Figuren zusammen gesetzten Teams in
                  einem fiktiven Sport messen, der als Mischung aus Schach mit
                  Würfel und American Football beschrieben werden kann. Das
                  Spielfeld ist 26x15 quadratische Felder groß und in zwei
                  gleich große Hälften geteilt, die jeweils einem Team
                  zugewiesen sind. Die hinterste Feldreihe in jeder Hälfte ist
                  die <span className="italic">Endzone</span>. Zu Beginn eines
                  Spielabschnittes <span className="italic">(Drive)</span> wird
                  der Ball per <span className="italic">Kickoff</span> in die
                  Hälfte des Gegners befördert. Für jeden Coach gilt es mit
                  seinen maximal 11 Spielern den Ball zu sichern und durch
                  Laufen oder Werfen bis in die Endzone des Gegners zu
                  befördern, um so <span className="italic">Touchdowns</span> zu
                  erzielen bzw. dies zu verhindern.
                </p>
                {readMore && (
                  <p>
                    Den Coaches stehen verschiedene Spielmechanismen zur
                    Verfügung, um ihr Ziel - nach 16 Runden die meisten
                    Touchdowns - zu erreichen. Jeder Spieler eines Teams darf in
                    einer Runde eine von sechs möglichen Aktionen ausführen:
                    Bewegen, Blocken (gegnerischen Spieler eines benachbarten
                    Feldes angreifen), Passen, Ballübergabe, Foulen oder Blitzen
                    (Bewegen und Blocken). Je nach Aktion kommen verschiedene
                    Würfelmechanismen zum Einsatz. Misslingt eine Ballaktion
                    (Ballaufheben, Werfen, Fangen oder Übergeben) oder fällt ein
                    eigener Spieler beim Blocken oder Ausweichen hin, bedeutet
                    dies das sofortige Ende des Zuges: 
                    <span className="italic">Turnover</span>.
                  </p>
                )}
              </div>
              <div className="flex-1 text-justify">
                {!readMore && (
                  <p>
                    Den Coaches stehen verschiedene Spielmechanismen zur
                    Verfügung, um ihr Ziel - nach 16 Runden die meisten
                    Touchdowns - zu erreichen. Jeder Spieler eines Teams darf in
                    einer Runde eine von sechs möglichen Aktionen ausführen:
                    Bewegen, Blocken (gegnerischen Spieler eines benachbarten
                    Feldes angreifen), Passen, Ballübergabe, Foulen oder Blitzen
                    (Bewegen und Blocken). Je nach Aktion kommen verschiedene
                    Würfelmechanismen zum Einsatz. Misslingt eine Ballaktion
                    (Ballaufheben, Werfen, Fangen oder Übergeben) oder fällt ein
                    eigener Spieler beim Blocken oder Ausweichen hin, bedeutet
                    dies das sofortige Ende des Zuges: 
                    <span className="italic">Turnover</span>.{" "}
                    <a
                      onClick={() => setReadMore(!readMore)}
                      className="xl:block"
                    >
                      {readMore ? "Weniger" : "Mehr"} lesen
                    </a>
                  </p>
                )}
                {readMore && (
                  <>
                    <p>
                      Üblicherweise behält derjenige Coach die Überhand, dem es
                      besser gelingt, die spezifischen Stärken seines Teams zur
                      Geltung zu bringen. Die zur Verfügung stehenden
                      Spielertypen unterscheiden sich nämlich stark voneinander:
                      erstens durch die Basischarakteristika Bewegungsweite,
                      Stärke, Geschicklichkeit, Passfähigkeit und Rüstungswert,
                      zweitens durch besondere Fertigkeiten. Ein Coach sollte
                      seine Strategie danach ausrichten, ob ihm vor allem leicht
                      gerüstete, geschickte Spieler zur Verfügung stehen oder
                      schwer gepanzerte, langsame Raufbolde. Dies ist Abhängig
                      davon welche der 26 Rassen - elegante Elfen,
                      grobschlächtige Orks, verschlagene Skaven, gewaltige Oger,
                      bärtige Zwerge usw. - ein Coach sich ausgesucht hat.
                    </p>
                    <p>
                      Blood Bowl lässt sich zwar auch als Einzelmatch spielen,
                      die größte Faszination entwickelt es aber in Turnier- oder
                      Ligaformaten. Beides ist sowohl in Form des klassischen
                      Brettspiels als auch online über das Internet möglich.
                      Tabletop-Spiele finden in der Regel im Rahmen lokal
                      organisierter Ligen oder von Turnieren statt, welche
                      häufig am Wochenende mit 6 Partien im Schweizer System
                      ausgetragen werden und durchaus ein überregionales,
                      bisweilen sogar internationales Publikum ansprechen.{" "}
                      <a onClick={() => setReadMore(!readMore)}>
                        {readMore ? "Weniger" : "Mehr"} lesen
                      </a>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* mobile */}
          <div className="sm:hidden text-sm">
            <div className="text-center">
              <Heading title="Was ist Bloodbowl?" />
            </div>
            <p>
              Blood Bowl ist ein Brettspiel{" "}
              <span className="italic">(Tabletop)</span>, bei dem sich zwei
              Coaches, mit aus Fantasy-Figuren zusammen gesetzten Teams in einem
              fiktiven Sport messen, der als Mischung aus Schach mit Würfel und
              American Football beschrieben werden kann. Das Spielfeld ist 26x15
              quadratische Felder groß und in zwei gleich große Hälften geteilt,
              die jeweils einem Team zugewiesen sind. Die hinterste Feldreihe in
              jeder Hälfte ist die <span className="italic">Endzone</span>. Zu
              Beginn eines Spielabschnittes{" "}
              <span className="italic">(Drive)</span> wird der Ball per{" "}
              <span className="italic">Kickoff</span> in die Hälfte des Gegners
              befördert. Für jeden Coach gilt es mit seinen maximal 11 Spielern
              den Ball zu sichern und durch Laufen oder Werfen bis in die
              Endzone des Gegners zu befördern, um so{" "}
              <span className="italic">Touchdowns</span> zu erzielen bzw. dies
              zu verhindern.
            </p>
            {readMore && (
              <>
                <p>
                  Den Coaches stehen verschiedene Spielmechanismen zur
                  Verfügung, um ihr Ziel - nach 16 Runden die meisten Touchdowns
                  - zu erreichen. Jeder Spieler eines Teams darf in einer Runde
                  eine von sechs möglichen Aktionen ausführen: Bewegen, Blocken
                  (gegnerischen Spieler eines benachbarten Feldes angreifen),
                  Passen, Ballübergabe, Foulen oder Blitzen (Bewegen und
                  Blocken). Je nach Aktion kommen verschiedene Würfelmechanismen
                  zum Einsatz. Misslingt eine Ballaktion (Ballaufheben, Werfen,
                  Fangen oder Übergeben) oder fällt ein eigener Spieler beim
                  Blocken oder Ausweichen hin, bedeutet dies das sofortige Ende
                  des Zuges: <span className="italic">Turnover</span>.
                </p>
                <p>
                  Üblicherweise behält derjenige Coach die Überhand, dem es
                  besser gelingt, die spezifischen Stärken seines Teams zur
                  Geltung zu bringen. Die zur Verfügung stehenden Spielertypen
                  unterscheiden sich nämlich stark voneinander: erstens durch
                  die Basischarakteristika Bewegungsweite, Stärke,
                  Geschicklichkeit, Passfähigkeit und Rüstungswert, zweitens
                  durch besondere Fertigkeiten. Ein Coach sollte seine Strategie
                  danach ausrichten, ob ihm vor allem leicht gerüstete,
                  geschickte Spieler zur Verfügung stehen oder schwer
                  gepanzerte, langsame Raufbolde. Dies ist Abhängig davon welche
                  der 26 Rassen - elegante Elfen, grobschlächtige Orks,
                  verschlagene Skaven, gewaltige Oger, bärtige Zwerge usw. - ein
                  Coach sich ausgesucht hat.
                </p>
                <p>
                  Blood Bowl lässt sich zwar auch als Einzelmatch spielen, die
                  größte Faszination entwickelt es aber in Turnier- oder
                  Ligaformaten. Beides ist sowohl in Form des klassischen
                  Brettspiels als auch online über das Internet möglich.
                  Tabletop-Spiele finden in der Regel im Rahmen lokal
                  organisierter Ligen oder von Turnieren statt, welche häufig am
                  Wochenende mit 6 Partien im Schweizer System ausgetragen
                  werden und durchaus ein überregionales, bisweilen sogar
                  internationales Publikum ansprechen.
                </p>
              </>
            )}
            <a onClick={() => setReadMore(!readMore)}>
              {readMore ? "Weniger" : "Mehr"} lesen
            </a>
          </div>
        </div>
      </section>
      <Team />
      <Ranking />
      <Facts />
    </Layout>
  );
}

export default Home;
