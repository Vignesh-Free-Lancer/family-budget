import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { salaryListTableData } from "../../utils/Utils";
import { numberFormat } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const SalaryList = () => {
  const { t } = useTranslation();
  // Navigate To Page
  const navigate = useNavigate();

  const salaryListColumns = [
    {
      dataField: "month",
      text: t("month"),
    },
    {
      dataField: "year",
      text: t("year"),
    },
    {
      dataField: "monthlySalary",
      text: t("salary"),
      formatter: (cell, row) => numberFormat(row.monthlySalary),
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

  // Edit Salary Data
  const editSalaryData = (salaryId) => {
    navigate(`/salary/${salaryId}`);
  };

  // Delete Salary Data
  const deleteSalaryData = (salaryId) => {
    console.log("Salary Deleted", salaryId);
  };

  return (
    <MainLayout title={t("salaryList")}>
      <Row>
        <Col>
          <div className="budget-app-listview-section">
            <BootstrapTableComp
              tableBordered={false}
              headerColumns={salaryListColumns}
              tableData={salaryListTableData}
              tableActionEnabled={true}
              tableEditAction={editSalaryData}
              tableDeleteAction={deleteSalaryData}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default SalaryList;
