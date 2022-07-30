import React from "react";
import { Table } from "react-bootstrap";
import "./table-component.scss";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const TableComponent = ({
  customTableClass = "",
  columnHeaders,
  sortColumn,
  onSort,
  dataLists = [],
  tableBodyErrorMessage = "There is no data to display",
}) => {
  return (
    <Table bordered responsive className={`custom-table ${customTableClass}`}>
      <TableHeader
        columnHeaders={columnHeaders}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      {dataLists && dataLists.length > 0 ? (
        <TableBody columnHeaders={columnHeaders} datas={dataLists} />
      ) : (
        <tbody style={{ height: "300px" }}>
          <tr key="empty-row">
            <td
              colSpan={columnHeaders.length}
              className="custom-table__no-records"
            >
              {tableBodyErrorMessage}
            </td>
          </tr>
        </tbody>
      )}
    </Table>
  );
};

export default TableComponent;
