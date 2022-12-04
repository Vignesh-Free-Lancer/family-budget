import React from "react";
import "./table-collapse-component.scss";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import TableCollapseHeader from "./TableCollapseHeader";
import TableCollapseBody from "./TableCollapseBody";

const TableCollapseComponent = ({
  tableClassName = "",
  columnHeaders,
  dataLists = [],
  footerContent = "",
  tableCollapseBodyErrorMessage,
}) => {
  // Get translation locale
  const { t } = useTranslation();

  return (
    <Table
      bordered
      responsive
      className={`custom-table custom-table__collapsable ${tableClassName}`}
    >
      <TableCollapseHeader columnHeaders={columnHeaders} />
      {dataLists && dataLists.length > 0 ? (
        <tbody>
          {dataLists &&
            dataLists.map((data, index) => (
              <TableCollapseBody
                key={index}
                index={index + 1}
                columnWrap={columnHeaders.length}
                month={data.month}
                reportsData={data.reportItems}
                columnHeaders={columnHeaders}
                footerData={data.monthlyAmount}
                footerContent={footerContent}
              />
            ))}
        </tbody>
      ) : (
        <tbody style={{ height: "300px" }}>
          <tr key="empty-row">
            <td
              colSpan={columnHeaders.length}
              className="custom-table__no-records"
            >
              {`${t("thereIsNoDataInTable")}...`}
            </td>
          </tr>
        </tbody>
      )}
    </Table>
  );
};

export default TableCollapseComponent;
