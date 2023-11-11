import { useEffect, useState, useMemo } from "react";
import useContentful from "../../hooks/useContentful";
import Table from "../Table";
import Heading from "../Heading";

const Pagination = ({ numbers, handleSetRowsToShow, currentRowsToShow }) => {
  return (
    <div className="flex justify-end ml-auto mt-4 gap-x-1.5">
      {numbers.map((number) => (
        <a
          className={`w-6 h-6 border rounded-md flex items-center justify-center text-xs ${
            currentRowsToShow === number
              ? "border-red-500 text-red-500"
              : "border-stone-300 text-stone-600 "
          }`}
          onClick={() => handleSetRowsToShow(number)}
          key={`pagination-${number}`}
        >
          {number}
        </a>
      ))}
    </div>
  );
};

function Ranking() {
  const [rankingData, setRankingData] = useState();
  const [rowsToShow, setRowsToShow] = useState(10);
  const { getRanking } = useContentful();

  useEffect(() => {
    const getRankings = async () => {
      const data = await getRanking();
      const dataWithLinks = data?.map((col) => {
        let name = Object.values(col)[1];
        name = (
          <a
            href={`https://member.thenaf.net/index.php?module=NAF&type=coachpage&coach=${name}`}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
        );
        const keyToUpdate = Object.keys(col)[1];
        col[keyToUpdate] = name;
        return col;
      });
      setRankingData(dataWithLinks);
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
      <div className="flex items-center gap-x-3 justify-center sm:justify-start">
        <Heading title="Ranking" />
        <div className="group relative">
          <div className="rounded-full w-4 h-4 flex items-center justify-center text-stone-500 hover:text-stone-600 font-semibold border border-stone-500 text-xs mb-[18px] cursor-pointer hover:border-stone-600 transition">
            i
          </div>
          <div className="opacity-0 pointer-events-none group-hover:opacity-100 absolute -left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-5 bg-stone-600 p-4 rounded-md text-xs text-white transition w-[280px] sm:w-[350px] z-10">
            <p>
              * min. 50% NAF-Winrate, 20 BB-2020 NAF Spiele, 165 NAF-Rating,
              1150 Glicko-Rating, 170 Danish Coach Rating und 180 Danish Year.
            </p>
            <p> **Berechnung des Rankings</p>
            <ul className="list-disc ml-2.5">
              <li>
                Glicko NAF zu 35% (Spielstärke über Zeit) im internen
                Rankingvergleich
              </li>
              <li>
                Danish Coach Rating zu 17,5% (Kurzfristige Form) im internen
                Rankingvergleich
              </li>
              <li>
                Danish Coach Rating Year zu 17,5% (Mittelfristige Form) im
                internen Rankingvergleich
              </li>
              <li>
                Siegquote NAF BB2020 zu 25% (Spielstärke über Rassen) im
                internen Rankingvergleich{" "}
              </li>
              <li>
                Höchste NAF-Wertung zu 5% (Spielstärke) im internen
                Rankingvergleich
              </li>
            </ul>
          </div>
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
          <Pagination
            numbers={[10, 25, 50]}
            handleSetRowsToShow={(number) => setRowsToShow(number)}
            currentRowsToShow={rowsToShow}
          />
        </>
      )}
    </section>
  );
}

export default Ranking;
