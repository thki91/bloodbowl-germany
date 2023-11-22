import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import SortAscIcon from "../assets/sort-asc.png";
import SortDescIcon from "../assets/sort-desc.png";
import Pagination from "./Pagination";

const Table = ({
  data,
  columns,
  className,
  paginationNumbers = [12, 25, 50],
  updatedAt,
}) => {
  const [rowsToShow, setRowsToShow] = useState(paginationNumbers[0]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  let tableRows = table.getRowModel().rows.slice(0, rowsToShow);

  return (
    <>
      <div className="overflow-x-auto">
        <table className={`w-full ${className}`}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-stone-300">
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <img
                                src={SortAscIcon}
                                className="w-4 inline ml-2"
                              />
                            ),
                            desc: (
                              <img
                                src={SortDescIcon}
                                className="w-4 inline ml-2"
                              />
                            ),
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {tableRows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getAllCells().map((cell) => {
                    let cellValue = cell.getValue();
                    if (typeof cellValue === "string") {
                      cellValue = cellValue.replace("__", "👑");
                    }
                    return <td key={cell.id}>{cellValue || "-"}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        {updatedAt && (
          <div className="text-xs italic text-stone-500">
            Zuletzt aktualisiert am{" "}
            {new Date(updatedAt)?.toLocaleDateString("de-DE")}
          </div>
        )}
        {data.length > paginationNumbers[0] && (
          <Pagination
            numbers={paginationNumbers}
            handleSetRowsToShow={(number) => setRowsToShow(number)}
            currentRowsToShow={rowsToShow}
          />
        )}
      </div>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

export default Table;
