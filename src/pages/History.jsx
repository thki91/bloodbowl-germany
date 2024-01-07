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
import Facts from "../components/home/Facts";

function History() {
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
      <section
        className="py-5 sm:py-10 xl:flex items-start bg-stone-200 sm:-mx-14 lg:-mx-20 px-4 sm:px-14 lg:px-20"
        id="nationenrangliste-spielbilanz"
      >
        {nationalOverviewData && (
          <div className="mb-5 sm:mb-0 flex-[60%] xl:pr-10 border-b border-b-stone-400 xl:border-b-0 xl:border-r xl:border-r-stone-400 pb-7 xl:pb-0">
            <Heading
              title={nationalOverviewData?.title}
              centered
              description={nationalOverviewData?.description}
            />
            <Table
              data={nationalOverviewData?.table}
              columns={nationalOverviewColumns}
              className="min-w-[520px]"
              paginationNumbers={[12, 25]}
            />
          </div>
        )}
        {balanceSheetData && (
          <div className="flex-[40%] xl:pl-10 mt-7 xl:mt-0">
            <Heading
              title={balanceSheetData?.title}
              centered
              description={balanceSheetData?.description}
              tooltipClasses="!right-10"
            />
            <Table
              data={balanceSheetData?.table}
              columns={balanceSheetColumns}
              className="min-w-[520px]"
              paginationNumbers={[12, 25]}
            />
          </div>
        )}
      </section>
      <Facts />
      {nationalPlayersData?.table?.length > 0 && (
        <section
          className="py-5 sm:py-10 bg-stone-200 -mx-4 sm:-mx-14 lg:-mx-20 px-4 sm:px-20"
          id="rekordspieler"
        >
          <Heading
            title={nationalPlayersData?.title}
            centered
            description={nationalPlayersData?.description}
          />

          <div className="flex-1">
            <Table
              data={nationalPlayersData?.table}
              columns={nationalPlayersColumns}
              className="min-w-[550px] w-full"
            />
          </div>
        </section>
      )}
    </Layout>
  );
}

export default History;
