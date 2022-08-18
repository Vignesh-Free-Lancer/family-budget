import React from "react";
import { Col, Row } from "react-bootstrap";
import "./report.scss";
import { useTranslation } from "react-i18next";

import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { salaryListTableData, numberFormat } from "../../utils/Utils";

const SalaryReport = () => {
  const { t } = useTranslation();

  const salaryReportColumns = [
    {
      dataField: "month",
      text: t("month"),
    },
    {
      dataField: "monthlySalary",
      text: t("salary"),
      formatter: (cell, row) => numberFormat(row.monthlySalary),
    },
    {
      dataField: "bonusAmount",
      text: t("bonusAmount"),
      formatter: (cell, row) => numberFormat(row.bonus),
    },
    {
      dataField: "otherAllowance",
      text: t("extraAllowance"),
      formatter: (cell, row) => numberFormat(row.otherAllowance),
    },
    {
      dataField: "totalCredit",
      text: t("totalCredit"),
      formatter: (cell, row) => numberFormat(row.totalCredit),
    },
    {
      dataField: "pf",
      text: t("pf"),
      formatter: (cell, row) => numberFormat(row.pf),
    },
    {
      dataField: "incomeTax",
      text: t("incomeTax"),
      formatter: (cell, row) => numberFormat(row.incomeTax),
    },
    {
      dataField: "professionalTax",
      text: t("professionalTax"),
      formatter: (cell, row) => numberFormat(row.professionalTax),
    },
    {
      dataField: "otherDeductions",
      text: t("otherDeductions"),
      formatter: (cell, row) => numberFormat(row.otherDeductions),
    },
    {
      dataField: "totalDebit",
      text: t("totalDebit"),
      formatter: (cell, row) => numberFormat(row.totalDebit),
    },
    {
      dataField: "netPayAmount",
      text: t("netAmount"),
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
