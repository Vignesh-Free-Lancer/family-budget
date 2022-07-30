import React from "react";
import { Button, Col, Row } from "react-bootstrap";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { salaryListTableData } from "../../utils/Utils";
import { numberFormat } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const SalaryList = () => {
  // Navigate To Page
  const navigate = useNavigate();

  const salaryListColumns = [
    {
      dataField: "month",
      text: "Month",
    },
    {
      dataField: "year",
      text: "Year",
    },
    {
      dataField: "monthlySalary",
      text: "Salary",
      formatter: (cell, row) => numberFormat(row.monthlySalary),
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

  // Edit Salary Data
  const editSalaryData = (salaryId) => {
    navigate(`/salary/${salaryId}`);
  };

  // Delete Salary Data
  const deleteSalaryData = (salaryId) => {
    console.log("Salary Deleted", salaryId);
  };

  return (
    <MainLayout title="Salary List">
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
