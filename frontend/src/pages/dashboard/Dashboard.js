import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./dashboard.scss";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BoxLayout from "../../layouts/boxLayout/BoxLayout";
import CardLayout from "../../layouts/cardLayout/CardLayout";
import LineChart from "../../components/chart/LineChart";

import { dashboardTableData, numberFormat } from "../../utils/Utils";
import DashboardCard from "../../components/dashboard/DashboardCard";
import TableComponent from "../../components/table/TableComponent";

const Dashboard = () => {
  const { t } = useTranslation();

  // Custom Define The Table Header
  const headerColumns = [
    {
      path: "month",
      label: t("month"),
    },
    {
      path: "totalCredit",
      label: t("totalDebit"),
      key: "currency",
    },
    {
      path: "totalDebit",
      label: t("totalCredit"),
      key: "currency",
    },
    {
      path: "netAmount",
      label: t("netAmount"),
      key: "currency",
    },
  ];

  // Default Table Header Sort Order
  const [tableSortColumn, setTableSortColumn] = useState({
    path: "netAmount",
    order: "asc",
  });

  // Table Header Sort Method
  const handleTableSort = (sortHeader) => {
    setTableSortColumn(sortHeader);
  };

  return (
    <MainLayout title={t("dashboard")}>
      <div className="dashboard-section">
        <Row>
          {/* Salary Card */}
          <DashboardCard
            linkAddr="/salary/list"
            dashboardCategory="salary-card"
            dashboardTitle={t("salary")}
            dashboardLabel={t("addViewMonthlySalaryInfo")}
          />

          {/* Other Income Card */}
          <DashboardCard
            linkAddr="/extra-income/list"
            dashboardCategory="income-card"
            dashboardTitle={t("extraIncome")}
            dashboardLabel={t("addViewExtraIncomeInfo")}
          />

          {/*Expense Card */}
          <DashboardCard
            linkAddr="/expense"
            dashboardCategory="expense-card"
            dashboardTitle={t("expenses")}
            dashboardLabel={t("addDailyMonthlyExpenses")}
          />

          {/*Reports Card */}
          <DashboardCard
            linkAddr="/report"
            dashboardCategory="reports-card"
            dashboardTitle={t("reports")}
            dashboardLabel={t("viewCustomizedReports")}
          />

          {/*Users Card */}
          <DashboardCard
            linkAddr="/user/list"
            dashboardCategory="users-card"
            dashboardTitle={t("user")}
            dashboardLabel={t("modifyRemoveYourProfile")}
          />
        </Row>
      </div>
      {/* <div className="horizontal-line-style"></div> */}
      <div className="dashboard-section__summary-reports">
        <div className="dashboard-section__summary-reports__prevs">
          <Row>
            <Col xl={5} lg={5} md={6} sm={12} xs={12}>
              <BoxLayout title={t("lastThreeMonthSalaryInfo")}>
                <TableComponent
                  customTableClass="dashboard-section__summary-reports__prevs__summary-table"
                  columnHeaders={headerColumns}
                  sortColumn={tableSortColumn}
                  onSort={handleTableSort}
                  dataLists={dashboardTableData}
                />
              </BoxLayout>
            </Col>
            <Col xl={7} lg={7} md={6} sm={12} xs={12}>
              <BoxLayout title={t("lastThreeMonthIncomeExpenseInfo")}>
                <LineChart
                  chartCustomClass="line-chart"
                  chartDatasetLabel1={t("income")}
                  chartDatasetLabel2={t("expense")}
                  chartLabels=""
                  chartDatas=""
                />
              </BoxLayout>
            </Col>
          </Row>
        </div>
        {/* <div className="horizontal-line-style"></div> */}
        <div className="dashboard-section__summary-reports__current">
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <BoxLayout title={t("currentMonthInfo")}>
                <Row>
                  <CardLayout
                    cardType="salary-card"
                    title={t("salary")}
                    subTitle={t("netAmount")}
                    content={numberFormat(0.0)}
                  />
                  <CardLayout
                    cardType="extra-income-card"
                    title={t("extraIncome")}
                    subTitle={t("amount")}
                    content={numberFormat(0.0)}
                  />
                  <CardLayout
                    cardType="total-income-card"
                    title={t("totalIncome")}
                    subTitle={t("amount")}
                    content={numberFormat(0.0)}
                  />
                  <CardLayout
                    cardType="total-expense-card"
                    title={t("totalExpense")}
                    subTitle={t("amount")}
                    content={numberFormat(0.0)}
                  />
                </Row>
              </BoxLayout>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
