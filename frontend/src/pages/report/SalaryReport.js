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
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import DisplayInformation from "../../components/displayInformation/DisplayInformation";
import { salaryReportListAction } from "../../redux/actions/SalaryActions";
import Loading from "../../components/loading/Loading";

const SalaryReport = forwardRef((props, ref) => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // State Object For Hide and Clear State Values
  const [clearState, setClearState] = useState();

  useEffect(() => {
    setClearState("reset");
    dispatch(salaryReportListAction("select", 0, 0));
  }, [navigate, dispatch]);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  // Pass get expense report function from child to parent component
  useImperativeHandle(ref, () => ({
    salaryReportCallbak(reportType, month, year) {
      setClearState("new");
      dispatch(salaryReportListAction(reportType, month, year));
    },
  }));

  // Get salary report data from redux store
  const salaryReportInfos = useSelector((state) => state.salaryReportListData);
  const {
    loading: salaryReportLoading,
    error: salaryReportError,
    salaryReportLists,
  } = salaryReportInfos;

  // Show salary creation notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (salaryReportError && clearState && clearState !== "reset")
      addToast(salaryReportError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (
      clearState &&
      clearState !== "reset" &&
      salaryReportLists &&
      salaryReportLists.totalReportsLength > 0
    )
      addToast(salaryReportLists.message, { appearance: "success" });

    if (
      clearState &&
      clearState !== "reset" &&
      salaryReportLists &&
      salaryReportLists.totalReportsLength === 0
    )
      addToast(salaryReportLists.message, { appearance: "info" });

    return () => {
      delete salaryReportInfos.error;
      delete salaryReportInfos.expenseReportLists;

      if (salaryReportLists) delete salaryReportLists.message;
    };
  }, [
    salaryReportInfos,
    clearState,
    salaryReportLists,
    salaryReportError,
    addToast,
  ]);

  // Table Header
  const salaryReportHeaders = [
    {
      dataField: "month",
      text: t("month"),
    },
    {
      dataField: "monthlySalary",
      text: t("salary"),
      formatter: (cell, row) => numberFormat(row.monthlySalary),
    },
    {
      dataField: "bonusAmount",
      text: t("bonusAmount"),
      formatter: (cell, row) => numberFormat(row.bonusAmount),
    },
    {
      dataField: "otherAllowance",
      text: t("extraAllowance"),
      formatter: (cell, row) => numberFormat(row.otherAllowance),
    },
    {
      dataField: "totalCR",
      text: t("totalCR"),
      formatter: (cell, row) => numberFormat(row.totalCR),
    },
    {
      dataField: "pf",
      text: t("pf"),
      formatter: (cell, row) => numberFormat(row.pf),
    },
    {
      dataField: "incomeTax",
      text: t("incomeTax"),
      formatter: (cell, row) => numberFormat(row.incomeTax),
    },
    {
      dataField: "professionalTax",
      text: t("professionalTax"),
      formatter: (cell, row) => numberFormat(row.professionalTax),
    },
    {
      dataField: "otherDeductions",
      text: t("otherDeductions"),
      formatter: (cell, row) => numberFormat(row.otherDeductions),
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

  return (
    <>
      {clearState !== "reset" && salaryReportLoading && <Loading />}

      <div className="report-section__salary-tab budget-app-listview-section">
        <Row>
          <Col>
            <BootstrapTableComp
              tableBordered={false}
              headerColumns={salaryReportHeaders}
              tableData={
                salaryReportLists && salaryReportLists.salaryReportDatas
              }
            />
          </Col>
        </Row>
        <Row className="report-section__salary-tab display-info-section">
          <Col xl={7} lg={7}></Col>
          <Col xl={5} lg={5}>
            <DisplayInformation
              customClasses="text-right"
              displayLabel="totalCR"
              displayName={`${t("totalCreditAmount")}:`}
              displayInfoClasses="green-text"
              displayInfo={numberFormat(0)}
            />

            <DisplayInformation
              customClasses="text-right"
              displayLabel="totalDR"
              displayName={`${t("totalDebitAmount")}:`}
              displayInfoClasses="red-text"
              displayInfo={numberFormat(0)}
            />

            <DisplayInformation
              customClasses="text-right"
              displayLabel="netPay"
              displayName={`${t("netAmount")}:`}
              displayInfoClasses="green-text"
              displayInfo={numberFormat(0)}
            />
          </Col>
        </Row>
      </div>
    </>
  );
});

export default SalaryReport;
