import { useEffect, useState, useMemo } from "react";
import useContentful from "../../hooks/useContentful";
import Table from "../Table";
import Heading from "../Heading";
import ExternalLinkIcon from "../../assets/external-link.png";
import DropdownMenu from "../DropdownMenu";
import Pagination from "../Pagination";
import { mapTableMemberLink } from "../../helper/table";

const dropdownRankingLinks = [
  {
    text: "Norddeutsche BB Meisterschaft",
    link: "http://nbbm.dbbc-ev.de",
  },
  {
    text: "Süddeutsche BB Meisterschaft",
    link: "http://www.sbbm-turniere.com",
  },
  { text: "Dach Meisterschaft", link: "http://sbbm.dbbc-ev.de/dach_winners" },
];

function Ranking() {
  const [rankingData, setRankingData] = useState();
  const [rankingUpdatedAt, setRankingUpdatedAt] = useState();
  const [rowsToShow, setRowsToShow] = useState(12);
  const { getRanking } = useContentful();

  useEffect(() => {
    const getRankings = async () => {
      const data = await getRanking();
      setRankingData(mapTableMemberLink(data?.rankingTable, 1));
      setRankingUpdatedAt(data.updatedAt);
    };
    getRankings();
  }, []);

  const columns = useMemo(() => {
    if (!rankingData?.length) return [];
    const rankingColumns = Object.keys(rankingData[0]);
    return rankingColumns.map((col, index) => ({
      accessorKey: col,
      enableSorting: index !== 1,
    }));
  }, [rankingData]);

  return (
    <section
      id="ranking"
      className="py-6 sm:py-10 px-6 sm:px-14 bg-stone-200 -mx-4 sm:-mx-10"
    >
      <div className="relative flex items-center gap-x-3 justify-center sm:justify-start">
        <Heading title="Community Ranking" />
        <div className="group relative">
          <div className="rounded-full w-4 h-4 flex items-center justify-center text-stone-500 hover:text-stone-600 font-semibold border border-stone-500 text-xs mb-[18px] cursor-pointer hover:border-stone-600 transition">
            i
          </div>
          <div className="opacity-0 pointer-events-none group-hover:opacity-100 absolute -right-0 sm:left-0 sm:translate-x-0 top-5 bg-stone-600 p-4 rounded-md text-xs text-white transition w-[300px] sm:w-[400px] z-10">
            <p> *Berechnung des Rankings</p>
            <ul className="list-disc ml-2.5 mb-2">
              <li>
                <strong>
                  Beste 8 NAF-Turniere 2023 (Swedish System) zu 25%
                </strong>{" "}
                (Mittelfristige Form) im internen Rankingvergleich
              </li>
              <li>
                <strong>Siegquote NAF BB2020 zu 20%</strong> (Spielstärke über
                Rassen) im internen Rankingvergleich
              </li>
              <li>
                <strong>Danish Coach Rating Year zu 20%</strong> (Mittelfristige
                Form) im internen Rankingvergleich
              </li>
              <li>
                <strong>Danish Coach Rating zu 15%</strong> (Kurzfristige Form)
                im internen Rankingvergleich
              </li>
              <li>
                <strong>Glicko NAF zu 15%</strong> (Spielstärke über Zeit) im
                internen Rankingvergleich
              </li>
              <li>
                <strong>Höchste NAF-Wertung zu 5%</strong> (Spielstärke) im
                internen Rankingvergleich
              </li>
            </ul>
            <p>
              ** Gerankt werden nur Coaches mit min. 53% NAF-Winrate, mind. 28
              BB-2020 NAF Spielen, 170 NAF-Rating, 1150 Glicko-Rating, 175
              Danish Coach Rating und 190 Danish Year Rating, sowie mit
              Spielberechtigung für Deutschland.
            </p>
            <p>
              ***Negative Ausreißer wurden nicht gewertet; teilweise weniger als
              8 Turniere in der Wertung. Nur Turniere mit mind. 5 Spielen.
              Letztes EB-Ergebnis wird gewertet. Formel des schwedischen System
              richtet sich nach ELO (y = 4155,9x5 - 10625x4 + 10186x3 - 4496,9x2
              + 1009x - 120).
            </p>
          </div>
        </div>
        <div className="sm:ml-auto absolute right-0 top-1.5 sm:relative sm:top-0">
          <DropdownMenu
            image={ExternalLinkIcon}
            items={dropdownRankingLinks}
            iconClasses="!mr-0 !w-4 !h-4 mb-5"
            containerClasses="!-right-2.5"
          />
        </div>
      </div>
      {rankingData?.length && (
        <>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              data={rankingData}
              limit={rowsToShow}
              className="min-w-[900px]"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            {rankingUpdatedAt && (
              <div className="text-xs italic text-stone-500">
                Zuletzt aktualisiert am{" "}
                {new Date(rankingUpdatedAt)?.toLocaleDateString("de-DE")}
              </div>
            )}
            <Pagination
              numbers={[12, 25, 50]}
              handleSetRowsToShow={(number) => setRowsToShow(number)}
              currentRowsToShow={rowsToShow}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default Ranking;
