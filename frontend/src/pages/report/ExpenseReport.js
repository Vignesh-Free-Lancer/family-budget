import React from "react";
import "./report.scss";
import { Col, Row } from "react-bootstrap";

const ExpenseReport = () => {
  const expenseReportColumns = [
    {
      dataField: "month",
      text: "Month",
    },
    {
      dataField: "particulars",
      text: "Particulars",
    },
    {
      dataField: "estimatedCost",
      text: "Estimated Cost",
      key: "currency",
    },
    {
      dataField: "actualCost",
      text: "Actual Cost",
      key: "currency",
    },
    {
      dataField: "paymentType",
      text: "Payment Type",
    },
    {
      dataField: "paymentDate",
      text: "Payment Date",
      key: "date",
    },
    {
      dataField: "paymentBank",
      text: "Payment Bank",
    },
    {
      dataField: "description",
      text: "Description",
    },
  ];

  return (
    <div className="report-section__expense-tab">
      <Row>
        <Col>Expense report table</Col>
      </Row>
    </div>
  );
};

export default ExpenseReport;
