import { useEffect, useState, useMemo } from "react";
import useContentful from "../../hooks/useContentful";
import Table from "../Table";
import Heading from "../Heading";
import LinkIcon from "../../assets/linkIconBlack.png";
import DropdownMenu from "../DropdownMenu";
import Accordion from "../Accordion";
import { mapTableMemberLink } from "../../helper/table";
import { RankingFilters } from "./RankingFilters";

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
  const [rankingAccordion, setRankingAccordion] = useState();
  const { getAccordions, getRankings } = useContentful();

  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const getRankingsData = async () => {
      const data = await getRankings();
      setFilterOptions(
        data
          ?.sort((a, b) => b.year - a.year)
          .map((data, index) => ({
            value: data.year,
            label: data.year,
            selected: index === 0,
          }))
      );
      setRankingData(data);
    };
    getRankingsData();
  }, []);

  useEffect(() => {
    const getCommunityRankingAccordion = async () => {
      const data = await getAccordions();
      const communityRankingAccordion = data.find(
        (entry) => entry.type === "Community Ranking"
      );
      if (communityRankingAccordion) {
        setRankingAccordion(communityRankingAccordion);
      }
    };
    getCommunityRankingAccordion();
  }, []);

  const selectedRankingData = useMemo(() => {
    if (!rankingData) return [];
    const selectedFilterValue = filterOptions.find(
      (filter) => filter.selected
    )?.value;

    if (!selectedFilterValue) return [];

    const selectedRanking = rankingData.find(
      (data) => data.year === selectedFilterValue
    );
    setRankingUpdatedAt(selectedRanking.updatedAt);
    return mapTableMemberLink(selectedRanking.rankingTable, 0);
  }, [rankingData, filterOptions]);

  const columns = useMemo(() => {
    if (!selectedRankingData?.length) return [];
    const rankingColumns = Object.keys(selectedRankingData[0]);
    return rankingColumns.map((col, index) => ({
      accessorKey: col,
      enableSorting: index !== 0,
    }));
  }, [selectedRankingData]);

  const handleChangeOption = (year) => {
    setFilterOptions((prev) => {
      return prev.map((option) => {
        return {
          ...option,
          selected: option.value === year,
        };
      });
    });
  };
  return (
    <section
      id="ranking"
      className="relative py-8 sm:py-10 px-6 sm:px-14 lg:px-20 bg-stone-200 -mx-4 sm:-mx-14 lg:-mx-20"
    >
      <Heading
        title="Community Ranking"
        description='Zur deutschen Community gehören Coaches, die mind. 50% ihrer Turniere in Deutschland absolviert haben - unabhängig ihrer Nationalität - oder aber bei der NAF die Nationalität "Germany" eingetragen haben.'
        centered
      />
      <div className="absolute right-4 top-9 sm:right-20 sm:top-12">
        <DropdownMenu
          image={LinkIcon}
          items={dropdownRankingLinks}
          iconClasses="!mr-0 !w-6 !h-6 mb-5"
          containerClasses="!-right-2.5"
          altText="Weitere Ranking Links"
        />
      </div>
      {rankingData?.length && (
        <>
          <div className="overflow-x-auto">
            <RankingFilters
              filterOptions={filterOptions}
              handleChangeOption={handleChangeOption}
            />
            <Table
              columns={columns}
              data={selectedRankingData}
              className="min-w-[900px]"
              updatedAt={rankingUpdatedAt}
              paginationNumbers={[15, 30, 60]}
            />
            {rankingAccordion && (
              <div className="mt-5">
                <Accordion
                  title={rankingAccordion.title}
                  description={rankingAccordion.description}
                />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Ranking;
