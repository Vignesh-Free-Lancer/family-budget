import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./dashboard.scss";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BoxLayout from "../../layouts/boxLayout/BoxLayout";
import CardLayout from "../../layouts/cardLayout/CardLayout";
import LineChart from "../../components/chart/LineChart";

import { dashboardTableData } from "../../utils/Utils";
import DashboardCard from "../../components/dashboard/DashboardCard";
import TableComponent from "../../components/table/TableComponent";

const Dashboard = () => {
  // Custom Define The Table Header
  const headerColumns = [
    {
      path: "month",
      label: "Month",
    },
    {
      path: "totalCredit",
      label: "Total Credit",
      key: "currency",
    },
    {
      path: "totalDebit",
      label: "Total Debit",
      key: "currency",
    },
    {
      path: "netAmount",
      label: "Net Amount",
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
    <MainLayout title="Dashboard">
      <div className="dashboard-section">
        <Row>
          {/* Salary Card */}
          <DashboardCard
            linkAddr="/salary/list"
            dashboardCategory="salary-card"
            dashboardTitle="Salary"
            dashboardLabel="Add your monthly salary information"
          />

          {/* Other Income Card */}
          <DashboardCard
            linkAddr="/extra-income/list"
            dashboardCategory="income-card"
            dashboardTitle="Extra Income"
            dashboardLabel="Add your extra income details, other than salary"
          />

          {/*Expense Card */}
          <DashboardCard
            linkAddr="/expense"
            dashboardCategory="expense-card"
            dashboardTitle="Expenses"
            dashboardLabel="Add your daily/monthly expense details"
          />

          {/*Reports Card */}
          <DashboardCard
            linkAddr="/report"
            dashboardCategory="reports-card"
            dashboardTitle="Reports"
            dashboardLabel="View your customized reports"
          />

          {/*Users Card */}
          <DashboardCard
            linkAddr="/registration"
            dashboardCategory="users-card"
            dashboardTitle="User"
            dashboardLabel="Modify/Remove your data"
          />
        </Row>
      </div>
      {/* <div className="horizontal-line-style"></div> */}
      <div className="dashboard-section__summary-reports">
        <div className="dashboard-section__summary-reports__prevs">
          <Row>
            <Col xl={5} lg={5} md={6} sm={12} xs={12}>
              <BoxLayout title="Last 3 Months Salary Details">
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
              <BoxLayout title="Last 3 Months Incomes & Expenses Details">
                <LineChart
                  chartCustomClass="line-chart"
                  chartDatasetLabel1="Income"
                  chartDatasetLabel2="Expense"
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
              <BoxLayout title="Current Month Details">
                <Row>
                  <CardLayout
                    cardType="salary-card"
                    title="Salary"
                    subTitle="Net amount"
                    content="$ 0.00"
                  />
                  <CardLayout
                    cardType="extra-income-card"
                    title="Extra Income"
                    subTitle="Amount"
                    content="$ 0.00"
                  />
                  <CardLayout
                    cardType="total-income-card"
                    title="Total Income"
                    subTitle="Amount"
                    content="$ 0.00"
                  />
                  <CardLayout
                    cardType="total-expense-card"
                    title="Total Expense"
                    subTitle="Amount"
                    content="$ 0.00"
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
