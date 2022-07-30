import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./report-root-data.scss";

import { reportsType } from "../../utils/Utils";
import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputSelect from "../inputSelect/InputSelect";

const ReportsRootData = ({ reportsRootData }) => {
  // State Object For Report Type
  const [selectedReportType, setSelectedReportType] = useState("select");

  // State Object For Handling Error
  const [reportRootDataErrors, setReportRootDataErrors] = useState({});

  const handleSelectChange = (e) => {
    if (e.target.name === "ddlReportType") {
      setSelectedReportType(e.target.value);
      e.target.value === "select"
        ? (reportRootDataErrors.selectedReportType =
            "Please select report type")
        : delete reportRootDataErrors.selectedReportType;
    }
  };

  useEffect(() => {
    reportsRootData(selectedReportType, reportRootDataErrors);
  }, [reportsRootData, selectedReportType, reportRootDataErrors]);

  return (
    <div className="report-data-section">
      <Row>
        <Col xl={3} lg={3} md={4} sm={6} xs={12}>
          <InputFormGroup
            inputLabel="Customize Reports"
            inputName="ddlFiscalYearType"
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
      </Row>
    </div>
  );
};

export default ReportsRootData;
