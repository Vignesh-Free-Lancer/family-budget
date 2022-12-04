import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./dashboard.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BoxLayout from "../../layouts/boxLayout/BoxLayout";
import CardLayout from "../../layouts/cardLayout/CardLayout";
import LineChart from "../../components/chart/LineChart";

import { getLast3Months, monthsList, numberFormat } from "../../utils/Utils";
import DashboardCard from "../../components/dashboard/DashboardCard";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";

import {
  expenseCurrentMonthAction,
  extraIncomeCurrentMonthAction,
  lastThreeMonthIncomeAction,
  salaryCurrentMonthAction,
} from "../../redux/actions/DashboardActions";

const Dashboard = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get Last 3 Month Name From Current Date For Chart Label
  const lastThreeMonthNames = getLast3Months();

  // Get Last 3 Month Salary, Income & Expense Data From Redux Store
  const lastThreeMonthDashboardInfos = useSelector(
    (state) => state.lastThreeMonthDashboardData
  );
  const { lastThreeMonthDashboardDetail } = lastThreeMonthDashboardInfos;

  // Get Current Month Salary Details
  const currentMonthSalaryInfo = useSelector(
    (state) => state.salaryCurrentMonthData
  );
  const { salaryCurrentMonth } = currentMonthSalaryInfo;

  // Get Current Month Extra Income Details
  const currentMonthExtraIncomeInfos = useSelector(
    (state) => state.extraIncomeCurrentMonthData
  );
  const { extraIncomeCurrentMonth } = currentMonthExtraIncomeInfos;

  // Get Current Month Expense Details
  const currentMonthExpenseInfos = useSelector(
    (state) => state.expenseCurrentMonthData
  );
  const { expenseCurrentMonth } = currentMonthExpenseInfos;

  // Sum of salary + extra income
  const getCurrentMonthTotalIncome = () => {
    const currentMonthSalary =
      salaryCurrentMonth &&
      salaryCurrentMonth.currentMonthSalary &&
      salaryCurrentMonth.currentMonthSalary.netPayAmount;

    const currentMonthExtraIncome =
      extraIncomeCurrentMonth &&
      extraIncomeCurrentMonth.currentMonthExtraIncome &&
      extraIncomeCurrentMonth.currentMonthExtraIncome.incomeCreditAmount;

    const totalIncome = currentMonthSalary + currentMonthExtraIncome;

    return totalIncome;
  };

  // Get Current Month Total Income
  const totalIncomeAmount = getCurrentMonthTotalIncome();

  // Custom Define The Table Header For Last 6 Month Salary Details
  const salaryReportColumns = [
    {
      dataField: "month",
      text: t("month"),
      formatter: (cell, row) => monthsList[row.month - 1].name,
    },

    {
      dataField: "totalCR",
      text: t("totalCR"),
      formatter: (cell, row) => numberFormat(row.totalCR),
    },
    {
      dataField: "totalDR",
      text: t("totalDR"),
      formatter: (cell, row) => numberFormat(row.totalDR),
    },
    {
      dataField: "netPayAmount",
      text: t("netAmount"),
      formatter: (cell, row) => numberFormat(row.netPayAmount),
    },
  ];

  useEffect(() => {
    dispatch(lastThreeMonthIncomeAction()); // Dispatch The Action For Get Last 3 Month Salary, Income & Expense Details
    dispatch(expenseCurrentMonthAction()); // Dispatch The Action For Current Month Expense Details
    dispatch(salaryCurrentMonthAction()); // Dispatch The Action For Current Month Salary Details
    dispatch(extraIncomeCurrentMonthAction()); // Dispatch The Action For Current Month Extra Income Details
  }, [dispatch]);

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
              <BoxLayout
                title={t("lastThreeMonthSalaryInfo")}
                cusomtBoxLayoutClassname="budget-app-listview-section"
              >
                <BootstrapTableComp
                  tableBordered={false}
                  headerColumns={salaryReportColumns}
                  tableData={
                    lastThreeMonthDashboardDetail &&
                    lastThreeMonthDashboardDetail.lastThreeMonthSalary
                  }
                  tablePaginationEnabled={false}
                />
              </BoxLayout>
            </Col>
            <Col xl={7} lg={7} md={6} sm={12} xs={12}>
              <BoxLayout title={t("lastThreeMonthIncomeExpenseInfo")}>
                <LineChart
                  chartCustomClass="line-chart"
                  chartLabels={lastThreeMonthNames}
                  chartDatasetLabel1={t("income")}
                  chartDatasetLabel2={t("expense")}
                  chartDatasetData1={
                    lastThreeMonthDashboardDetail &&
                    lastThreeMonthDashboardDetail.lastThreeMonthIncome
                  }
                  chartDatasetData2={
                    lastThreeMonthDashboardDetail &&
                    lastThreeMonthDashboardDetail.lastThreeMonthExpense
                  }
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
                    content={
                      salaryCurrentMonth &&
                      salaryCurrentMonth.currentMonthSalary &&
                      numberFormat(
                        salaryCurrentMonth.currentMonthSalary.netPayAmount
                      )
                    }
                  />
                  <CardLayout
                    cardType="extra-income-card"
                    title={t("extraIncome")}
                    subTitle={t("amount")}
                    content={
                      extraIncomeCurrentMonth &&
                      extraIncomeCurrentMonth.currentMonthExtraIncome &&
                      numberFormat(
                        extraIncomeCurrentMonth.currentMonthExtraIncome
                          .incomeCreditAmount
                      )
                    }
                  />
                  <CardLayout
                    cardType="total-income-card"
                    title={t("totalIncome")}
                    subTitle={t("amount")}
                    content={numberFormat(
                      isNaN(totalIncomeAmount) ? 0 : totalIncomeAmount
                    )}
                  />
                  <CardLayout
                    cardType="total-expense-card"
                    title={t("totalExpense")}
                    subTitle={t("amount")}
                    content={
                      expenseCurrentMonth &&
                      expenseCurrentMonth.currentMonthExpense &&
                      numberFormat(
                        expenseCurrentMonth.currentMonthExpense
                          .totalMonthlyExpenseAmount
                      )
                    }
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
