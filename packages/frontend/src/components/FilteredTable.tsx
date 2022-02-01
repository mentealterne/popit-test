import { FunctionComponent } from "react";
import Dropdown from "./Dropdown";

interface IProps {
  name: string;
  data?: any;
  filterOptions?: { label: string; value: string }[];
  onFilterChange: (value: number) => void;
  columns: { label: string; key: string }[];
  pageLength?: number;
}

const FilteredTable: FunctionComponent<IProps> = ({
  name,
  data,
  columns,
  filterOptions,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-white rounded shadow-md p-4 font-light text-gray-700">
      <h1 className="font-bold">{name}</h1>
      {filterOptions && (
        <Dropdown
          options={filterOptions}
          onChange={(key) => onFilterChange(key.value)}
        />
      )}
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th className="text-left p-2 text-orange-500" key={column.key}>
                {" "}
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row: any) => {
            return (
              <tr className="py-2">
                {columns.map((column, index) => (
                  <td key={index} className="p-2 border-b border-gray-100">
                    {" "}
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredTable;
