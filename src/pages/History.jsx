import { useEffect, useState } from "react";
import Layout from "../Layout";
import { useMemo } from "react";
import Table from "../components/Table";
import useContentful from "../hooks/useContentful";
import { mapTableMemberLink } from "../helper/table";
import Heading from "../components/Heading";
import _ from "lodash";
import EurobowlResults from "../components/history/EurobowlResults";
import Statistics from "../components/history/Statistics";

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
      <section className="py-5 xl:flex items-start gap-x-10 bg-stone-200 -mx-4 sm:-mx-10 px-4 sm:px-10">
        {nationalOverviewData && (
          <div className="mb-5 sm:mb-0 flex-1 xl:pr-10 xl:border-r xl:border-r-stone-400">
            <Heading title={nationalOverviewData?.title} />
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
            <Heading title={balanceSheetData?.title} />
            <Table
              data={balanceSheetData?.table}
              columns={balanceSheetColumns}
              className="min-w-[500px]"
              paginationNumbers={[12, 25]}
            />
          </div>
        )}
      </section>

      {nationalPlayersData?.table?.length > 0 && (
        <section className="py-10">
          <Heading title={nationalPlayersData?.title} />
          <Table
            data={nationalPlayersData?.table}
            columns={nationalPlayersColumns}
            className="min-w-[500px]"
          />
        </section>
      )}
    </Layout>
  );
}

export default History;
