import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import SortAscIcon from "../assets/sort-asc.png";
import SortDescIcon from "../assets/sort-desc.png";

const Table = ({ data, columns, limit, className }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  let tableRows = table.getRowModel().rows;
  if (limit) {
    tableRows = tableRows.slice(0, limit);
  }

  return (
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
                          ? "cursor-pointer select-none whitespace-nowrap"
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
                          <img src={SortAscIcon} className="w-4 inline ml-2" />
                        ),
                        desc: (
                          <img src={SortDescIcon} className="w-4 inline ml-2" />
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
                return <td key={cell.id}>{cellValue}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

export default Table;
