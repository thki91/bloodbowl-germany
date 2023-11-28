import { useEffect, useState } from "react";
import { useMemo } from "react";
import Table from "../Table";
import ExternalLinkIcon from "../../assets/external-link.png";
import PropTypes from "prop-types";
import useContentful from "../../hooks/useContentful";
import { mapTableMemberLink, mapTableRace } from "../../helper/table";
import Heading from "../Heading";
import _ from "lodash";
import DropdownMenu from "../DropdownMenu";

const EurobowlResultFilters = ({
  sortedEurobowlResults,
  handleSortedEurobowlResultsSelection,
  shouldScrollToTop = false,
}) => {
  return (
    <div className="overflow-x-auto scrollbar-transparent -mt-2">
      <div className="text-xs sm:text-sm md:text-base flex items-center sm:justify-center mb-6 gap-x-1.5 whitespace-nowrap">
        {sortedEurobowlResults?.map(({ label, value, selected }) => (
          <a
            className={`py-2 px-1 sm:px-4 border-b-2 ${
              selected ? "border-red-600" : "text-stone-400 border-white"
            }`}
            onClick={() =>
              handleSortedEurobowlResultsSelection(value, shouldScrollToTop)
            }
            key={label}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};
const EurobowlResult = ({ result }) => {
  const columns = useMemo(() => {
    if (!result.resultTable?.length) return [];
    const resultTableColumns = Object.keys(result.resultTable[0]);
    return resultTableColumns.map((col) => ({
      accessorKey: col,
    }));
  }, [result]);

  const tableData = useMemo(() => {
    if (!result.resultTable.length) return [];
    result.resultTable = mapTableRace(result.resultTable, 1);
    return mapTableMemberLink(result.resultTable, 0);
  }, [result?.resultTable]);

  const links = [];
  if (result.resultsLink) {
    links.push({ text: "Ergebnisse", link: result.resultsLink });
  }
  if (result.reportLink) {
    links.push({ text: "Bericht", link: result.reportLink });
  }
  return (
    <div>
      <div className="absolute right-0 top-0 p-3 opacity-80">
        {links.length > 0 && (
          <div className="relative">
            <DropdownMenu
              image={ExternalLinkIcon}
              items={links}
              iconClasses="mr-0 w-[16px]"
              containerClasses="!right-0"
            />
          </div>
        )}
      </div>
      <div className="flex items-center mb-5">
        <img
          src={result.logo}
          className="h-14 sm:h-16 flex-shrink-0"
          style={{ mixBlendMode: "multiply" }}
        />
        <div className="ml-4">
          <h3 className="text-lg lg:text-xl font-semibold mb-0.5 mr-10">
            {result.title}
          </h3>
          <div className="font-semibold">Ergebnis: {result.endResult}</div>
        </div>
      </div>
      <Table
        data={tableData}
        columns={columns}
        className="min-w-[500px] !w-full"
      />
    </div>
  );
};

EurobowlResult.propTypes = {
  result: PropTypes.object,
};

const EurobowlResults = () => {
  const [eurobowlResultsData, setEurobowlResultsData] = useState();
  const [sortedEurobowlResults, setSortedEurobowlResults] = useState();
  const { getEurobowlResults } = useContentful();

  useEffect(() => {
    const getEurobowlResultsData = async () => {
      const data = await getEurobowlResults();
      const eurobowlYears = _.chunk(
        data?.map((data) => data.year),
        2
      );
      setSortedEurobowlResults([
        ...eurobowlYears.map((yearChunk, index) => ({
          value: yearChunk,
          label: yearChunk.join(" / "),
          selected: index === 0,
        })),
        { label: "Alle", value: data?.map((data) => data.year) },
      ]);
      setEurobowlResultsData(data);
    };

    getEurobowlResultsData();
  }, []);

  const handleSortedEurobowlResultsSelection = (
    yearsToShow,
    shouldScrollToTop
  ) => {
    const newSortedEurobowlReslts = [...sortedEurobowlResults].map(
      (result) => ({ ...result, selected: result.value === yearsToShow })
    );
    setSortedEurobowlResults(newSortedEurobowlReslts);
    if (shouldScrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const isInYearSelection = (year) => {
    const selectedYears = sortedEurobowlResults.find(
      (result) => result.selected
    );
    return selectedYears.value.includes(year);
  };

  return (
    <section className="py-10 pb-5 md:pb-7">
      <div className="relative flex items-center gap-x-3 justify-center">
        <Heading title="Eurobowl Ergebnisse Deutschland" />
        <div className="group relative">
          <div className="rounded-full w-4 h-4 flex items-center justify-center text-stone-500 hover:text-stone-600 font-semibold border border-stone-500 text-xs mb-[18px] cursor-pointer hover:border-stone-600 transition">
            i
          </div>
          <div className="opacity-0 pointer-events-none group-hover:opacity-100 absolute -right-0 top-5 bg-stone-700 p-4 rounded-md text-xs text-white transition w-[200px] sm:w-[300px] z-10">
            <p>
              Die Spieldaten wurden der NAF-DB und aus den persönlichen
              Unterlagen die Spieler entnommen. Insbesondere bei den ersten
              Eurobowls gab es keine NAF-Pflicht, daher können einige Spiele in
              der Statistik fehlen.
            </p>
            <p>🌐 Journeyman, der das Team verstärkt hat</p>
            <p>👑 Kapitän des jeweiligen Eurobowlteams</p>
          </div>
        </div>
      </div>

      <EurobowlResultFilters
        sortedEurobowlResults={sortedEurobowlResults}
        handleSortedEurobowlResultsSelection={
          handleSortedEurobowlResultsSelection
        }
      />

      <div className="lg:flex items-start flex-wrap gap-4 xl:gap-6">
        {eurobowlResultsData
          ?.filter((item) => item.year && isInYearSelection(item.year))
          ?.map((item) => {
            return (
              <div
                key={item.title}
                className="lg:max-w-[49%] lg:flex-[49%] mb-6 lg:mb-0 bg-stone-200 rounded-md p-3 sm:p-4 relative text-sm md:text-base"
              >
                <EurobowlResult result={item} />
              </div>
            );
          })}
      </div>

      {sortedEurobowlResults?.some(
        (res) => res.selected && res.label === "Alle"
      ) && (
        <div className="mt-5">
          <EurobowlResultFilters
            sortedEurobowlResults={sortedEurobowlResults}
            handleSortedEurobowlResultsSelection={
              handleSortedEurobowlResultsSelection
            }
            shouldScrollToTop
          />
        </div>
      )}
    </section>
  );
};

export default EurobowlResults;
