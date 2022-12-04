import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import "./report.scss";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TableCollapseComponent from "../../components/tableCollapse/TableCollapseComponent";
import DisplayInformation from "../../components/displayInformation/DisplayInformation";
import { groceryReportListAction } from "../../redux/actions/GroceryActions";
import Loading from "../../components/loading/Loading";
import { numberFormat } from "../../utils/Utils";

const GroceryReport = forwardRef((props, ref) => {
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
    dispatch(groceryReportListAction("select", 0, 0));
  }, [navigate, dispatch]);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  // Pass get grocery report function from child to parent component
  useImperativeHandle(ref, () => ({
    groceryReportCallbak(reportType, month, year) {
      setClearState("new");
      dispatch(groceryReportListAction(reportType, month, year));
    },
  }));

  // Get grocery report data from redux store
  const groceryReportInfos = useSelector(
    (state) => state.groceryReportListData
  );
  const {
    loading: groceryReportLoading,
    error: groceryReportError,
    groceryReportLists,
  } = groceryReportInfos;

  // Show grocery creation notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (groceryReportError && clearState && clearState !== "reset")
      addToast(groceryReportError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (
      clearState &&
      clearState !== "reset" &&
      groceryReportLists &&
      groceryReportLists.totalReportLength > 0
    )
      addToast(groceryReportLists.message, { appearance: "success" });

    if (
      clearState &&
      clearState !== "reset" &&
      groceryReportLists &&
      groceryReportLists.totalReportLength === 0
    )
      addToast(groceryReportLists.message, { appearance: "info" });

    return () => {
      delete groceryReportInfos.error;
      delete groceryReportInfos.groceryReportLists;

      if (groceryReportLists) delete groceryReportLists.message;
    };
  }, [
    groceryReportInfos,
    clearState,
    groceryReportLists,
    groceryReportError,
    addToast,
  ]);

  // Table Header
  const groceryReportHeaders = [
    {
      path: "month",
      label: t("month"),
    },
    {
      path: "particulars",
      label: t("particulars"),
    },
    {
      path: "qty",
      label: t("quantity"),
    },
    {
      path: "unitPrice",
      label: t("unitPrice"),
    },
    {
      path: "totalPrice",
      label: t("totalPrice"),
    },
  ];

  return (
    <>
      {clearState !== "reset" && groceryReportLoading && <Loading />}
      <div className="report-section__grocery-tab">
        <Row>
          <Col>
            <TableCollapseComponent
              tableClassName="grocery-report-table"
              columnHeaders={groceryReportHeaders}
              dataLists={
                groceryReportLists && groceryReportLists.groupedGroceryData
              }
              footerContent={`${t("groceryAmount")}: `}
              tableCollapseBodyErrorMessage={
                groceryReportLists && groceryReportLists.message
              }
            />
          </Col>
        </Row>

        <Row className="report-section__grocery-tab display-info-section">
          <Col xl={6} lg={6} md={6} sm={6} xs={12}></Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            {groceryReportLists &&
              groceryReportLists.sumOfTotalMonthlyGroceryReport > 0 && (
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalCR"
                  displayName={`${t("totalMonthlyExpense")}:`}
                  displayInfoClasses="red-text"
                  displayInfo={numberFormat(
                    groceryReportLists &&
                      groceryReportLists.sumOfTotalMonthlyGroceryReport > 0 &&
                      groceryReportLists.sumOfTotalMonthlyGroceryReport
                  )}
                />
              )}

            {groceryReportLists &&
              groceryReportLists.yearlyGroceryReport &&
              groceryReportLists.yearlyGroceryReport
                .totalYearlyGroceryAmount && (
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalCR"
                  displayName={`${t("totalYearlyGrocery")}:`}
                  displayInfoClasses="red-text"
                  displayInfo={numberFormat(
                    groceryReportLists &&
                      groceryReportLists.yearlyGroceryReport &&
                      groceryReportLists.yearlyGroceryReport
                        .totalYearlyGroceryAmount
                  )}
                />
              )}
          </Col>
        </Row>
      </div>
    </>
  );
});

export default GroceryReport;
