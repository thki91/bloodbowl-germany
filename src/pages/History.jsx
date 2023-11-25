import { useEffect, useState } from "react";
import Layout from "../Layout";
import { useMemo } from "react";
import Table from "../components/Table";
import ExternalLinkIcon from "../assets/external-link.png";
import PropTypes from "prop-types";
import useContentful from "../hooks/useContentful";
import { mapTableMemberLink } from "../helper/table";
import Heading from "../components/Heading";

const HistoryItem = ({ historyItem }) => {
  const columns = useMemo(() => {
    if (!historyItem.resultTable?.length) return [];
    const resultTableColumns = Object.keys(historyItem.resultTable[0]);
    return resultTableColumns.map((col) => ({
      accessorKey: col,
    }));
  }, [historyItem]);

  const tableData = mapTableMemberLink(historyItem.resultTable, 0);

  return (
    <div className="bg-stone-200 rounded-md p-3 sm:p-4 relative">
      {historyItem.resultsLink && (
        <a href={historyItem.resultsLink} target="_blank" rel="noreferrer">
          <div className="absolute right-0 top-0 hover:bg-stone-300 transition p-3 rounded-bl-md rounded-tr-md opacity-80">
            <img src={ExternalLinkIcon} className="w-4" />
          </div>
        </a>
      )}
      <div className="flex items-center mb-5">
        <img
          src={historyItem.logo}
          className="w-14 sm:w-16 flex-shrink-0"
          style={{ mixBlendMode: "multiply" }}
        />
        <div className="ml-4">
          <h3 className="text-lg lg:text-xl font-semibold mb-0.5 mr-10">
            {historyItem.title}
          </h3>
          <div className="font-semibold text-sm sm:text-base">
            Ergebnis: {historyItem.endResult}
          </div>
        </div>
      </div>
      <div className="flex items-start overflow-x-auto">
        <div className="flex-1">
          <Table data={tableData} columns={columns} className="min-w-[500px]" />
        </div>
      </div>
    </div>
  );
};

HistoryItem.propTypes = {
  historyItem: PropTypes.object,
};

function History() {
  const [eurobowlResultsData, setEurobowlResultsData] = useState();
  const [nationalOverviewData, setNationalOverviewData] = useState();
  const [nationalPlayersData, setNationalPlayersData] = useState();
  const [balanceSheetData, setBalanceSheetData] = useState();
  const {
    getEurobowlResults,
    getNationalOverview,
    getNationalPlayers,
    getGermanBalanceSheet,
  } = useContentful();

  useEffect(() => {
    const getEurobowlResultsData = async () => {
      const data = await getEurobowlResults();
      setEurobowlResultsData(data);
    };

    const getNationalOverviewData = async () => {
      const data = await getNationalOverview();
      setNationalOverviewData(data);
    };

    const getNationalPlayersData = async () => {
      const data = await getNationalPlayers();
      setNationalPlayersData(data);
    };

    const getGermanBalanceSheetData = async () => {
      const data = await getGermanBalanceSheet();
      setBalanceSheetData(data);
    };

    getEurobowlResultsData();
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
      <section className="py-10">
        <div className="mb-10">
          Die Spieldaten wurden der NAF-DB und aus den persönlichen Unterlagen
          die Spieler entnommen. Insbesondere bei den ersten Eurobowls gab es
          keine NAF-Pflicht, daher können einige Spiele in der Statistik fehlen.
        </div>
        <div className="lg:flex items-start flex-wrap gap-6 mb-6">
          {eurobowlResultsData?.map((item) => {
            return (
              <div
                key={item.title}
                className="overflow-hidden lg:max-w-[49%] lg:flex-[48%] mb-6 lg:mb-0"
              >
                <HistoryItem historyItem={item} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-5 flex items-start gap-x-10">
        {nationalOverviewData && (
          <div className="flex-1 pr-10 border-r border-r-stone-300">
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
          <div className="">
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

      {nationalPlayersData && (
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
