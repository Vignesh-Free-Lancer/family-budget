import React from "react";
import "./report.scss";
import { Col, Row } from "react-bootstrap";

import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { salaryListTableData, numberFormat } from "../../utils/Utils";

const SalaryReport = () => {
  const salaryReportColumns = [
    {
      dataField: "month",
      text: "Month",
    },
    {
      dataField: "monthlySalary",
      text: "Salary",
      formatter: (cell, row) => numberFormat(row.monthlySalary),
    },
    {
      dataField: "bonus",
      text: "Bonus",
      formatter: (cell, row) => numberFormat(row.bonus),
    },
    {
      dataField: "otherAllowance",
      text: "Extra Allowance",
      formatter: (cell, row) => numberFormat(row.otherAllowance),
    },
    {
      dataField: "totalCredit",
      text: "Total CR",
      formatter: (cell, row) => numberFormat(row.totalCredit),
    },
    {
      dataField: "pf",
      text: "PF",
      formatter: (cell, row) => numberFormat(row.pf),
    },
    {
      dataField: "incomeTax",
      text: "Income Tax",
      formatter: (cell, row) => numberFormat(row.incomeTax),
    },
    {
      dataField: "professionalTax",
      text: "Professional Tax",
      formatter: (cell, row) => numberFormat(row.professionalTax),
    },
    {
      dataField: "otherDeductions",
      text: "Other Deduction",
      formatter: (cell, row) => numberFormat(row.otherDeductions),
    },
    {
      dataField: "totalDebit",
      text: "Total Debit",
      formatter: (cell, row) => numberFormat(row.totalDebit),
    },
    {
      dataField: "netPayAmount",
      text: "Net Amount",
      formatter: (cell, row) => numberFormat(row.netPayAmount),
    },
  ];

  return (
    <div className="report-section__salary-tab budget-app-listview-section">
      <Row>
        <Col>
          <BootstrapTableComp
            tableBordered={false}
            headerColumns={salaryReportColumns}
            tableData={salaryListTableData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SalaryReport;
