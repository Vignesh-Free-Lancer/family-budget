import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import "./report.scss";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { numberFormat } from "../../utils/Utils";
import DisplayInformation from "../../components/displayInformation/DisplayInformation";
import TableCollapseComponent from "../../components/tableCollapse/TableCollapseComponent";
import { expenseReportListAction } from "../../redux/actions/ExpenseActions";
import Loading from "../../components/loading/Loading";

const ExpenseReport = forwardRef((props, ref) => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // State Object For Hide and Clear State Values
  const [clearState, setClearState] = useState();

  // Cleare State Values When Navigate
  useEffect(() => {
    setClearState("reset");
    dispatch(expenseReportListAction("select", 0, 0));
  }, [navigate, dispatch]);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  // Pass get expense report function from child to parent component
  useImperativeHandle(ref, () => ({
    expenseReportCallbak(reportType, month, year) {
      setClearState("new");
      dispatch(expenseReportListAction(reportType, month, year));
    },
  }));

  // Get expense report data from redux store
  const expenseReportInfos = useSelector(
    (state) => state.expenseReportListData
  );
  const {
    loading: expenseReportLoading,
    error: expenseReportError,
    expenseReportLists,
  } = expenseReportInfos;

  // Show expense creation notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (expenseReportError && clearState && clearState !== "reset")
      addToast(expenseReportError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (
      clearState &&
      clearState !== "reset" &&
      expenseReportLists &&
      expenseReportLists.totalReportLength > 0
    )
      addToast(expenseReportLists.message, { appearance: "success" });

    if (
      clearState &&
      clearState !== "reset" &&
      expenseReportLists &&
      expenseReportLists.totalReportLength === 0
    )
      addToast(expenseReportLists.message, { appearance: "info" });

    return () => {
      delete expenseReportInfos.error;
      delete expenseReportInfos.expenseReportLists;

      if (expenseReportLists) delete expenseReportLists.message;
    };
  }, [
    expenseReportInfos,
    clearState,
    expenseReportLists,
    expenseReportError,
    addToast,
  ]);

  // Table Header
  const expenseReportHeaders = [
    {
      path: "month",
      label: t("month"),
    },
    {
      path: "particular",
      label: t("particulars"),
    },
    {
      path: "estimatedCost",
      label: t("estimatedCost"),
      key: "currency",
    },
    {
      path: "actualCost",
      label: t("actualCost"),
      key: "currency",
    },
    {
      path: "paymentType",
      label: t("paymentType"),
    },
    {
      path: "paymentDate",
      label: t("paymentDate"),
      key: "date",
    },
    {
      path: "paymentBank",
      label: t("paymentBank"),
    },
    {
      path: "description",
      label: t("description"),
    },
  ];

  return (
    <>
      {clearState !== "reset" && expenseReportLoading && <Loading />}
      <div className="report-section__expense-tab">
        <Row>
          <Col>
            <TableCollapseComponent
              tableClassName="expense-report-table"
              columnHeaders={expenseReportHeaders}
              dataLists={
                expenseReportLists && expenseReportLists.groupedExpenseData
              }
              footerContent={`${t("expenseAmount")}: `}
              tableCollapseBodyErrorMessage={
                expenseReportLists && expenseReportLists.message
              }
            />
          </Col>
        </Row>

        <Row className="report-section__expense-tab display-info-section">
          <Col xl={6} lg={6} md={6} sm={6} xs={12}></Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            {expenseReportLists &&
              expenseReportLists.sumOfTotalMonthlyExpenseReport > 0 && (
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalCR"
                  displayName={`${t("totalMonthlyExpense")}:`}
                  displayInfoClasses="red-text"
                  displayInfo={numberFormat(
                    expenseReportLists &&
                      expenseReportLists.sumOfTotalMonthlyExpenseReport > 0 &&
                      expenseReportLists.sumOfTotalMonthlyExpenseReport
                  )}
                />
              )}

            {expenseReportLists &&
              expenseReportLists.yearlyExpensesReport &&
              expenseReportLists.yearlyExpensesReport
                .totalYearlyExpenseAmount && (
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalCR"
                  displayName={`${t("totalYearlyExpense")}:`}
                  displayInfoClasses="red-text"
                  displayInfo={numberFormat(
                    expenseReportLists &&
                      expenseReportLists.yearlyExpensesReport &&
                      expenseReportLists.yearlyExpensesReport
                        .totalYearlyExpenseAmount
                  )}
                />
              )}
          </Col>
        </Row>
      </div>
    </>
  );
});

export default ExpenseReport;
