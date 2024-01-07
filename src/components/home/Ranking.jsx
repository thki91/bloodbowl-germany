import { useEffect, useState, useMemo } from "react";
import useContentful from "../../hooks/useContentful";
import Table from "../Table";
import Heading from "../Heading";
import LinkIcon from "../../assets/linkIconBlack.png";
import DropdownMenu from "../DropdownMenu";
import Accordion from "../Accordion";
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
  const [rankingTitle, setRankingTitle] = useState();
  const [rankingDescription, setRankingDescription] = useState();
  const [rankingAccordion, setRankingAccordion] = useState();
  const { getRanking, getAccordions } = useContentful();

  useEffect(() => {
    const getRankings = async () => {
      const data = await getRanking();
      setRankingData(mapTableMemberLink(data?.rankingTable, 0));
      setRankingUpdatedAt(data.updatedAt);
      setRankingTitle(data.title);
      setRankingDescription(data.description);
    };
    getRankings();
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
      className="relative py-8 sm:py-10 px-6 sm:px-14 lg:px-20 bg-stone-200 -mx-4 sm:-mx-14 lg:-mx-20"
    >
      <Heading title={rankingTitle} description={rankingDescription} centered />
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
            <Table
              columns={columns}
              data={rankingData}
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
