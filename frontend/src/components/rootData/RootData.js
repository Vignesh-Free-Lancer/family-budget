import React, { lazy, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { monthsList, yearsList } from "../../utils/Utils";
import InputSelect from "../inputSelect/InputSelect";

const RootData = ({ rootData }) => {
  // State Object For Month & Year
  const [selectedMonth, setSelectedMonth] = useState("select");
  const [selectedYear, setSelectedYear] = useState("select");

  // State Object For Handling Error
  const [rootMonthYearErrors, setRootMonthYearErrors] = useState({});

  const handleSelectChange = (e) => {
    if (e.target.name === "ddlMonth") {
      setSelectedMonth(e.target.value);
      e.target.value === "select"
        ? (rootMonthYearErrors.selectedMonth = "Please select month")
        : delete rootMonthYearErrors.selectedMonth;
    } else if (e.target.name === "ddlYear") {
      setSelectedYear(e.target.value);
      e.target.value === "select"
        ? (rootMonthYearErrors.selectedYear = "Please select year")
        : delete rootMonthYearErrors.selectedYear;
    }
  };

  useEffect(() => {
    rootData(selectedMonth, selectedYear, rootMonthYearErrors);
  }, [rootData, selectedMonth, selectedYear, rootMonthYearErrors]);

  return (
    <Row>
      <Col xl={3} lg={3} md={4} sm={6} xs={6}>
        <InputSelect
          inputName="ddlMonth"
          inputDefaultValue={selectedMonth}
          inputArray={monthsList}
          inputChange={handleSelectChange}
          inputErrorMessage={rootMonthYearErrors.selectedMonth}
        />
      </Col>
      <Col xl={3} lg={3} md={4} sm={6} xs={6}>
        <InputSelect
          inputName="ddlYear"
          inputDefaultValue={selectedYear}
          inputArray={yearsList}
          inputChange={handleSelectChange}
          inputErrorMessage={rootMonthYearErrors.selectedYear}
        />
      </Col>
    </Row>
  );
};

export default RootData;
