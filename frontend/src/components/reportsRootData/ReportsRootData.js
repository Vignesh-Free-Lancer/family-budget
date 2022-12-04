import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./report-root-data.scss";
import { useTranslation } from "react-i18next";

import { monthsList, reportsType, yearsList } from "../../utils/Utils";
import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputSelect from "../inputSelect/InputSelect";

const ReportsRootData = ({ reportsRootData }) => {
  // Get translation locale
  const { t } = useTranslation();

  // State Object For Report Input Field
  const [selectedReportType, setSelectedReportType] = useState("select");
  const [selectedMonth, setSelectedMonth] = useState("select");
  const [selectedYear, setSelectedYear] = useState("select");

  // State Object For Handling Error
  const [reportRootDataErrors, setReportRootDataErrors] = useState({});

  // Handle Select Custom Report Change
  const handleSelectChange = (e) => {
    const selectedInputName = e.target.name;
    const selectedInputValue = e.target.value;

    if (selectedInputName === "ddlReportType") {
      setSelectedMonth("select");
      setSelectedYear("select");
      setSelectedReportType(selectedInputValue);
      selectedInputValue === "select"
        ? (reportRootDataErrors.selectedReportType = t(
            "pleaseSelectReportType"
          ))
        : delete reportRootDataErrors.selectedReportType;
    } else if (selectedInputName === "ddlYear") {
      setSelectedYear(selectedInputValue);
      setSelectedMonth("select");
      selectedInputValue === "select"
        ? (reportRootDataErrors.selectedYear = t("selectYear"))
        : delete reportRootDataErrors.selectedYear;
    } else if (selectedInputName === "ddlMonth") {
      setSelectedMonth(selectedInputValue);
      selectedInputValue === "select"
        ? (reportRootDataErrors.selectedMonth = t("selectMonth"))
        : delete reportRootDataErrors.selectedMonth;
    }
  };

  const validateFilterType = () => {
    const errors = {};

    if (selectedReportType === "select")
      errors.selectedReportType = t("pleaseSelectReportType");

    if (selectedReportType === "custom-year") {
      if (selectedYear === "select") errors.selectedYear = t("selectYear");
    }

    if (selectedReportType === "custom-range") {
      if (selectedYear === "select") errors.selectedYear = t("selectYear");
      if (selectedMonth === "select") errors.selectedMonth = t("selectMonth");
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Handle generate reports
  const handleGenerateReports = (e) => {
    e.preventDefault();

    const errors = validateFilterType();
    setReportRootDataErrors(errors || {});
    if (errors) return;

    reportsRootData(selectedReportType, selectedMonth, selectedYear);
  };

  return (
    <div className="report-data-section">
      <Row>
        <Col xl={3} lg={3} md={4} sm={6} xs={12}>
          <InputFormGroup
            inputLabel={t("customizeReports")}
            inputName="ddlReportType"
          >
            <InputSelect
              inputName="ddlReportType"
              inputDefaultValue={selectedReportType}
              inputArray={reportsType}
              inputChange={handleSelectChange}
              inputErrorMessage={reportRootDataErrors.selectedReportType}
            />
          </InputFormGroup>
        </Col>
        {(selectedReportType === "custom-year" ||
          selectedReportType === "custom-range") && (
          <Col xl={3} lg={3} md={4} sm={6} xs={12}>
            <InputFormGroup inputLabel={t("year")} inputName="ddlYear">
              <InputSelect
                inputName="ddlYear"
                inputDefaultValue={selectedYear}
                inputArray={yearsList}
                inputChange={handleSelectChange}
                inputErrorMessage={reportRootDataErrors.selectedYear}
              />
            </InputFormGroup>
          </Col>
        )}
        {selectedReportType === "custom-range" && (
          <Col xl={3} lg={3} md={4} sm={6} xs={12}>
            <InputFormGroup inputLabel={t("month")} inputName="ddlMonth">
              <InputSelect
                inputName="ddlMonth"
                inputDefaultValue={selectedMonth}
                inputArray={monthsList}
                inputChange={handleSelectChange}
                inputErrorMessage={reportRootDataErrors.selectedMonth}
              />
            </InputFormGroup>
          </Col>
        )}
        <Col xl={3} lg={3} md={4} sm={6} xs={12}>
          <button
            type="button"
            className="btn btn-info report-data-section_button"
            onClick={handleGenerateReports}
          >
            {t("generateReports")}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default ReportsRootData;
