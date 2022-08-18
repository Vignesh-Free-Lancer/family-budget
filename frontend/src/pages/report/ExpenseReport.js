import React from "react";
import { Col, Row } from "react-bootstrap";
import "./report.scss";
import { useTranslation } from "react-i18next";

const ExpenseReport = () => {
  const { t } = useTranslation();

  const expenseReportColumns = [
    {
      dataField: "month",
      text: t("month"),
    },
    {
      dataField: "particulars",
      text: t("particulars"),
    },
    {
      dataField: "estimatedCost",
      text: t("estimatedCost"),
      key: "currency",
    },
    {
      dataField: "actualCost",
      text: t("actualCost"),
      key: "currency",
    },
    {
      dataField: "paymentType",
      text: t("paymentType"),
    },
    {
      dataField: "paymentDate",
      text: t("paymentDate"),
      key: "date",
    },
    {
      dataField: "paymentBank",
      text: t("paymentBank"),
    },
    {
      dataField: "description",
      text: t("description"),
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
