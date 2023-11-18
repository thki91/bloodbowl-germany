import Layout from "../Layout";
import Malta from "/history/malta.jpg";
import Cardiff from "/history/cardiff.jpg";
import { useMemo } from "react";
import Table from "../components/Table";
import Heading from "../components/Heading";
import PropTypes from "prop-types";

const historyData = [
  {
    id: "eurobowl_malta_2022",
    title: "Eurobowl XV (2022)",
    location: "Pembroke, Malta",
    logo: Malta,
    result: "Endergebnis: 2. Platz / 24",
    coach: [
      {
        name: "Arioso 👑",
        race: "High Elves",
        w: 3,
        d: 1,
        l: 2,
        tdPlus: 5,
        tdMinus: 4,
      },
      { name: "Baki", race: "Orc", w: 2, d: 3, l: 1, tdPlus: 7, tdMinus: 5 },
      {
        name: "Ignaz",
        race: "Chaos Dwarves",
        w: 1,
        d: 3,
        l: 2,
        tdPlus: 6,
        tdMinus: 7,
      },
      {
        name: "Junior84",
        race: "Lizardmen",
        w: 2,
        d: 2,
        l: 2,
        tdPlus: 5,
        tdMinus: 4,
      },
      { name: "Miko", race: "Skaven", w: 1, d: 5, l: 0, tdPlus: 7, tdMinus: 6 },
      {
        name: "Oventa",
        race: "Dwarf",
        w: 1,
        d: 4,
        l: 1,
        tdPlus: 6,
        tdMinus: 6,
      },
      {
        name: "Sprinter",
        race: "Dark Elves",
        w: 3,
        d: 1,
        l: 2,
        tdPlus: 9,
        tdMinus: 5,
      },
      {
        name: "Stimme",
        race: "Slann",
        w: 3,
        d: 2,
        l: 1,
        tdPlus: 8,
        tdMinus: 3,
      },
    ],
  },
  {
    id: "eurobowl_cardiff_2018",
    title: "Eurobowl XIII (2018)",
    location: "Cardiff, Wales",
    logo: Cardiff,
    result: "Endergebnis: 10. Platz / 22",
    coach: [
      {
        name: "Arioso",
        race: "Norse",
        w: 2,
        d: 3,
        l: 1,
        tdPlus: 9,
        tdMinus: 7,
      },
      {
        name: "Candlejack 👑",
        race: "Undead",
        w: 2,
        d: 1,
        l: 3,
        tdPlus: 8,
        tdMinus: 11,
      },
      {
        name: "DocMaxx",
        race: "Wood Elves",
        w: 3,
        d: 2,
        l: 1,
        tdPlus: 14,
        tdMinus: 6,
      },
      {
        name: "Miko",
        race: "Necromantic",
        w: 4,
        d: 0,
        l: 2,
        tdPlus: 9,
        tdMinus: 5,
      },
      {
        name: "Oventa",
        race: "Dwarves",
        w: 3,
        d: 2,
        l: 1,
        tdPlus: 6,
        tdMinus: 3,
      },
      {
        name: "Planlos",
        race: "Lizardmen",
        w: 2,
        d: 2,
        l: 2,
        tdPlus: 9,
        tdMinus: 9,
      },
      {
        name: "RoterSternHochDahl",
        race: "Chaos Pact",
        w: 1,
        d: 0,
        l: 5,
        tdPlus: 3,
        tdMinus: 10,
      },
      {
        name: "Sprinter",
        race: "Dark Elves",
        w: 3,
        d: 3,
        l: 0,
        tdPlus: 10,
        tdMinus: 4,
      },
    ],
  },
];

const HistoryItem = ({ historyItem }) => {
  const columns = useMemo(
    () => [
      {
        header: "Coach",
        accessorKey: "name",
      },
      {
        header: "Rasse",
        accessorKey: "race",
      },
      {
        header: "W",
        accessorKey: "w",
      },
      {
        header: "D",
        accessorKey: "d",
      },
      {
        header: "L",
        accessorKey: "l",
      },
      {
        header: "TD+",
        accessorKey: "tdPlus",
      },
      {
        header: "TD-",
        accessorKey: "tdMinus",
      },
    ],
    []
  );

  return (
    <div className="bg-zinc-100 rounded-sm p-3 overflow-x-auto">
      <h3 className="text-xl font-semibold mb-5">
        {historyItem.title} - {historyItem.location}
      </h3>
      <div className="flex items-start">
        <div className="mr-8 flex flex-col justify-center items-center">
          <img
            src={historyItem.logo}
            className="w-24 mb-3"
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="text-xs font-bold text-center max-w-[90px]">
            {historyItem.result}
          </div>
        </div>
        <div className="flex-1">
          <Table data={historyItem.coach} columns={columns} />
        </div>
      </div>
    </div>
  );
};

HistoryItem.propTypes = {
  historyItem: PropTypes.object,
};

function History() {
  return (
    <Layout>
      <section className="py-10">
        <div className="mb-10">
          Die Spieldaten wurden der NAF-DB und aus den persönlichen Unterlagen
          die Spieler entnommen. Insbesondere bei den ersten Eurobowls gab es
          keine NAF-Pflicht, daher können einige Spiele in der Statistik fehlen.
        </div>
        <div className="flex items-center flex-wrap gap-6">
          {historyData.map((item) => {
            return (
              <div key={item.id} className="overflow-hidden">
                <HistoryItem historyItem={item} />
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export default History;
