import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { monthsList, yearsList } from "../../utils/Utils";
import InputSelect from "../inputSelect/InputSelect";

const RootData = forwardRef((props, ref) => {
  // Get props data & event from parent component
  const { rootData, rootDataErrors, updateRootData } = props;

  // Get translation locale
  const { t } = useTranslation();

  // State Object For Month & Year
  const [selectedMonth, setSelectedMonth] = useState("select");
  const [selectedYear, setSelectedYear] = useState("select");

  // State Object For Handling Error
  const [rootMonthYearErrors, setRootMonthYearErrors] = useState({});

  // Dropdown On-Change Event
  const handleSelectChange = (e) => {
    if (e.target.name === "ddlMonth") {
      setSelectedMonth(e.target.value);
      e.target.value === "select"
        ? (rootMonthYearErrors.selectedMonth = t("selectMonth"))
        : delete rootMonthYearErrors.selectedMonth;
    } else if (e.target.name === "ddlYear") {
      setSelectedYear(e.target.value);
      e.target.value === "select"
        ? (rootMonthYearErrors.selectedYear = t("selectYear"))
        : delete rootMonthYearErrors.selectedYear;
    }
  };

  // Reset dropdown value when click on new record button
  const resetValue = () => {
    setSelectedMonth("select");
    setSelectedYear("select");
  };

  // Use forwardRef to pass event from child to parent
  useImperativeHandle(ref, () => {
    return {
      resetRootData: resetValue, //  Reset dropdown values
    };
  });

  // Update state value when getting error from parent component
  useEffect(() => {
    setRootMonthYearErrors(rootDataErrors);
  }, [rootDataErrors]);

  // Sent selected dropdown value to parent component
  useEffect(() => {
    rootData(selectedMonth, selectedYear, rootMonthYearErrors);
  }, [rootData, selectedMonth, selectedYear, rootMonthYearErrors]);

  // Bind values to dropdown when real values passed from parent component
  useEffect(() => {
    updateRootData.month !== "select" &&
      updateRootData.month !== undefined &&
      setSelectedMonth(updateRootData.month);
    updateRootData.year !== "select" &&
      updateRootData.year !== undefined &&
      setSelectedYear(updateRootData.year);
  }, [updateRootData]);

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
});

export default RootData;
