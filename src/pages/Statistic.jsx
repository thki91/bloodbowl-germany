import { useEffect, useState } from "react";
import Layout from "../Layout";
import { useMemo } from "react";
import Table from "../components/Table";
import useContentful from "../hooks/useContentful";
import { mapTableMemberLink, mapTableRace } from "../helper/table";
import Heading from "../components/Heading";
import _ from "lodash";
import EurobowlResults from "../components/statistic/EurobowlResults";
import Statistics from "../components/statistic/Statistics";

function Statistic() {
  const [nationalOverviewData, setNationalOverviewData] = useState();
  const [nationalPlayersData, setNationalPlayersData] = useState();
  const [balanceSheetData, setBalanceSheetData] = useState();
  const { getNationalOverview, getNationalPlayers, getGermanBalanceSheet } =
    useContentful();

  useEffect(() => {
    const getNationalOverviewData = async () => {
      const data = await getNationalOverview();
      setNationalOverviewData(data);
    };

    const getNationalPlayersData = async () => {
      const data = await getNationalPlayers();
      data.table = mapTableMemberLink(data?.table, 0);
      data.table = mapTableRace(data?.table, 1);
      setNationalPlayersData(data);
    };

    const getGermanBalanceSheetData = async () => {
      const data = await getGermanBalanceSheet();
      setBalanceSheetData(data);
    };
    getNationalOverviewData();
    getNationalPlayersData();
    getGermanBalanceSheetData();
  }, []);

  const nationalOverviewColumns = useMemo(() => {
    if (!nationalOverviewData?.table?.length) return [];
    const tableColumns = Object.keys(nationalOverviewData.table[0]);
    return tableColumns.map((col) => ({
      accessorKey: col,
    }));
  }, [nationalOverviewData]);

  const balanceSheetColumns = useMemo(() => {
    if (!balanceSheetData?.table?.length) return [];
    const tableColumns = Object.keys(balanceSheetData.table[0]);
    return tableColumns.map((col) => ({
      accessorKey: col,
    }));
  }, [balanceSheetData]);

  const nationalPlayersColumns = useMemo(() => {
    if (!nationalPlayersData?.table?.length) return [];
    const tableColumns = Object.keys(nationalPlayersData.table[0]);
    return tableColumns.map((col) => ({
      accessorKey: col,
    }));
  }, [nationalPlayersData]);

  return (
    <Layout>
      <EurobowlResults />
      <Statistics />
      <section className="py-5 sm:py-10 xl:flex items-start gap-x-10 bg-stone-200 -mx-4 sm:-mx-10 px-4 sm:px-10">
        {nationalOverviewData && (
          <div className="mb-5 sm:mb-0 flex-1 xl:pr-10 xl:border-r xl:border-r-stone-400">
            <Heading title={nationalOverviewData?.title} centered />
            <Table
              data={nationalOverviewData?.table}
              columns={nationalOverviewColumns}
              className="min-w-[500px]"
              paginationNumbers={[12, 25]}
            />
          </div>
        )}
        {balanceSheetData && (
          <div>
            <Heading title={balanceSheetData?.title} centered />
            <Table
              data={balanceSheetData?.table}
              columns={balanceSheetColumns}
              className="min-w-[500px]"
              paginationNumbers={[12, 25]}
            />
          </div>
        )}
      </section>
      <section className="py-5 bg-stone-800 -mx-4 sm:-mx-10 px-4 sm:px-10">
        <div class="collage-row">
          <div class="collage-column">
            <img src="/collage/1.png" className="w-full" />
            <img src="/collage/10.png" className="w-full" />
          </div>
          <div class="collage-column">
            <img src="/collage/3.png" className="w-full" />
            <img src="/collage/5.png" className="w-full" />
          </div>
          <div class="collage-column">
            <img src="/collage/6.png" className="w-full" />
            <img src="/collage/2.jpg" className="w-full" />
          </div>
          <div class="collage-column">
            <img src="/collage/7.png" className="w-full" />
            <img src="/collage/11.png" className="w-full" />
          </div>
          <div class="collage-column">
            <img src="/collage/9.png" className="w-full" />
            <img src="/collage/4.png" className="w-full" />
          </div>
        </div>
      </section>
      {nationalPlayersData?.table?.length > 0 && (
        <section className="py-5 sm:py-10 bg-stone-200 -mx-4 sm:-mx-10 px-4 sm:px-10">
          <Heading title={nationalPlayersData?.title} centered />

          <div className="flex-1 pl-5">
            <Table
              data={nationalPlayersData?.table}
              columns={nationalPlayersColumns}
              className="min-w-[500px] w-full"
            />
          </div>
        </section>
      )}
    </Layout>
  );
}

export default Statistic;
