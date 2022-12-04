import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./report.scss";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import Tab from "../../components/tab/Tab";
import ReportsRootData from "../../components/reportsRootData/ReportsRootData";
import SalaryReport from "./SalaryReport";
import ExpenseReport from "./ExpenseReport";
import GroceryReport from "./GroceryReport";

const Report = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Get/Fire event from child component
  const salaryReportRef = useRef(null);
  const expenseReportRef = useRef(null);
  const groceryReportRef = useRef(null);

  // Salary Root data onChnage event
  const getSalaryReportsRootData = (reportType, month, year) => {
    salaryReportRef.current.salaryReportCallbak(
      reportType,
      month === "select" ? 0 : month,
      year === "select" ? 0 : year
    );
  };

  // Expense Root data onChnage event
  const getExpenseReportsRootData = (reportType, month, year) => {
    expenseReportRef.current.expenseReportCallbak(
      reportType,
      month === "select" ? 0 : month,
      year === "select" ? 0 : year
    );
  };

  // Grocery Root data onChnage event
  const getGroceryReportsRootData = (reportType, month, year) => {
    groceryReportRef.current.groceryReportCallbak(
      reportType,
      month === "select" ? 0 : month,
      year === "select" ? 0 : year
    );
  };

  const tabLists = [
    {
      title: t("salaryReport"),
      eventKey: "salary-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getSalaryReportsRootData} />
          <SalaryReport ref={salaryReportRef} />
        </>
      ),
    },

    {
      title: t("expenseReport"),
      eventKey: "expense-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getExpenseReportsRootData} />
          <ExpenseReport ref={expenseReportRef} />
        </>
      ),
    },

    {
      title: t("groceryReport"),
      eventKey: "grocery-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getGroceryReportsRootData} />
          <GroceryReport ref={groceryReportRef} />
        </>
      ),
    },
  ];

  return (
    <MainLayout title={t("reports")}>
      <div className="report-section">
        <Row>
          <Col>
            <Tab
              tabCustomClass="report-section-tab-component"
              tabActive="salary-report-tab"
              tabLists={tabLists}
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Report;
