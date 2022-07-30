import React, { useState } from "react";
import "./report.scss";
import { Col, Row } from "react-bootstrap";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import Tab from "../../components/tab/Tab";
import ReportsRootData from "../../components/reportsRootData/ReportsRootData";
import SalaryReport from "./SalaryReport";
import ExpenseReport from "./ExpenseReport";

const Report = () => {
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
      title: "Salary Report",
      eventKey: "salary-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getReportsRootData} />
          <SalaryReport />
        </>
      ),
    },

    {
      title: "Expense Report",
      eventKey: "expense-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getReportsRootData} />
          <ExpenseReport />
        </>
      ),
    },

    {
      title: "Grocery Report",
      eventKey: "grocery-report-tab",
      content: (
        <>
          <ReportsRootData reportsRootData={getReportsRootData} />
        </>
      ),
    },
  ];

  return (
    <MainLayout title="Reports">
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
