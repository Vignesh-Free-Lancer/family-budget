import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./report.scss";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import Tab from "../../components/tab/Tab";
import ReportsRootData from "../../components/reportsRootData/ReportsRootData";
import SalaryReport from "./SalaryReport";
import ExpenseReport from "./ExpenseReport";

const Report = () => {
  const { t } = useTranslation();

  // State Object For Month & Year
  const [selectedReportType, setSelectedReportType] = useState();

  // State Obejct For Handling Expense Error
  const [reportErrors, setReportErrors] = useState({});

  const getReportsRootData = (reportType, rootDataErrors) => {
    setSelectedReportType(reportType);
    setReportErrors(rootDataErrors);
  };

  const tabLists = [
    {
      title: t("salaryReport"),
      eventKey: "salary-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getReportsRootData} />
          <SalaryReport />
        </>
      ),
    },

    {
      title: t("expenseReport"),
      eventKey: "expense-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getReportsRootData} />
          <ExpenseReport />
        </>
      ),
    },

    {
      title: t("groceryReport"),
      eventKey: "grocery-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getReportsRootData} />
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
