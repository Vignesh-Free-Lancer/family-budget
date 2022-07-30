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

  // Edit Table Data
  const onEditChanged = (data) => {
    console.log("Table Edit", data);
    navigate(`/salary/${data._id}`);
  };

  // Delete Table Data
  const onDeleteChanged = (data) => {
    console.log("Table Delete", data);
  };

  const tableRowAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="budget-app-listview-section__action-group">
        <Button
          className="budget-app-listview-section__edit-btn"
          onClick={() => {
            onEditChanged(row);
          }}
        ></Button>
        <Button
          className="budget-app-listview-section__delete-btn"
          onClick={() => {
            onDeleteChanged(row);
          }}
        ></Button>
      </div>
    );
  };

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
    {
      dataField: "",
      text: "",
      formatter: tableRowAction,
    },
  ];

  const redirectToSalary = (salaryData) => {
    console.log("Data", salaryData);
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
              tableEditAction={redirectToSalary}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default SalaryList;
