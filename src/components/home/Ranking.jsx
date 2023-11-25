import { useEffect, useState, useMemo } from "react";
import useContentful from "../../hooks/useContentful";
import Table from "../Table";
import Heading from "../Heading";
import ExternalLinkIcon from "../../assets/external-link.png";
import DropdownMenu from "../DropdownMenu";
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
  const { getRanking } = useContentful();

  useEffect(() => {
    const getRankings = async () => {
      const data = await getRanking();
      setRankingData(mapTableMemberLink(data?.rankingTable, 0));
      setRankingUpdatedAt(data.updatedAt);
    };
    getRankings();
  }, []);

  const columns = useMemo(() => {
    if (!rankingData?.length) return [];
    const rankingColumns = Object.keys(rankingData[0]);
    return rankingColumns.map((col, index) => ({
      accessorKey: col,
      enableSorting: index !== 0,
    }));
  }, [rankingData]);

  return (
    <section
      id="ranking"
      className="py-6 sm:py-10 px-6 sm:px-14 bg-stone-200 -mx-4 sm:-mx-10"
    >
      <div className="relative flex items-center gap-x-3 justify-center sm:mb-2">
        <Heading title="Community Ranking" />
        <div className="group relative">
          <div className="rounded-full w-4 h-4 flex items-center justify-center text-stone-500 hover:text-stone-600 font-semibold border border-stone-500 text-xs mb-[18px] cursor-pointer hover:border-stone-600 transition">
            i
          </div>
          <div className="opacity-0 pointer-events-none group-hover:opacity-100 absolute -right-16 top-5 bg-stone-700 p-4 rounded-md text-xs text-white transition w-[350px] sm:w-[400px] z-10">
            <p>
              <strong>*Aufgeführte Coaches: </strong> Gerankt werden nur Coaches
              der deutschen Community mit mind. 53% NAF-Winrate, 28 BB-2020 NAF
              Spielen, 170 NAF-Rating, 1150 Glicko-Rating, 175 Danish Rating und
              190 Danish Year Rating.
            </p>
            <p>
              {" "}
              <strong> ** Berechnung der Performance Wertung </strong>(y =
              (0,3*a/240) + (0,3*b/1730) + (0,15*c1/330) + (0,15*c2/330) +
              (0,075*d1/75%) + (0,025*d2/300))
            </p>
            <ul className="list-disc ml-6 mb-2">
              <li>
                Schwedische Wertung zu 30% (Update Nov. 2023) -&gt; a (max =
                240)
              </li>
              <li>
                NAF Global Glicko Wertung zu 30% (Update Aug. 2023) -&gt; b (max
                = 1730)
              </li>
              <li>
                Dänische Coach Wertung Jahr zu 15% (Update Okt. 2023) -&gt; c1
                (max = 330)
              </li>
              <li>
                Dänische Coach Wertung zu 15% (Update Okt. 2023) -&gt; c2 (max =
                330)
              </li>
              <li>
                NAF Siegquote BB2020 zu 7,5% (Update Nov. 2023) -&gt; d1 (max =
                75%)
              </li>
              <li>
                Höchste NAF-Wertung zu 2,5% (Update Nov. 2023) -&gt; d2 (max =
                300)
              </li>
            </ul>
            <p>
              <strong> *** Das Schwedische System </strong> wertet die Spiele
              von Turnieren mit mind. 5 Spielen – ausgenommen Stunty oder
              Multiple Races Spiele es sei denn sie verbessern die Wertung –
              nach der ELO-Formel (y = 4155,9x5 - 10625x4 + 10186x3 - 4496,9x2 +
              1009x - 120).
            </p>
            <p>
              <strong> *** Das Dänische System </strong> setzt alle Rassen
              gleich (z.B. so als ob alle nur Menschen spielen) und wendet dann
              NAF-ELO an.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-1.5">
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
              className="min-w-[900px]"
              updatedAt={rankingUpdatedAt}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default Ranking;
