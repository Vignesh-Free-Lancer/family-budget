import React, { useEffect, useRef, useState } from "react";
import "./salary.scss";
import { Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import FormNavigation from "../../components/navigation/FormNavigation";
import RootData from "../../components/rootData/RootData";
import Accordion from "../../components/accordion/Accordion";
import {
  isAllowDecimalNumber,
  resetInput,
  resetDefaultValue,
  monthsList,
} from "../../utils/Utils";
import {
  rootFieldOnSubmitValidation,
  salaryFieldOnChangeValidation,
} from "../../utils/ValidateFields";
import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import DisplayInformation from "../../components/displayInformation/DisplayInformation";
import RecordDeleteScreen from "../../components/recordDeleteScreen/RecordDeleteScreen";
import {
  salaryCreateAction,
  salaryUpdateAction,
  salaryDeleteAction,
} from "../../redux/actions/SalaryActions";
import Loading from "../../components/loading/Loading";

const Salary = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get salary id from url
  const { salaryId } = useParams();

  // Get salary creation data from redux store
  const salaryInfos = useSelector((state) => state.salaryRecords);
  const {
    loading: salaryLoading,
    error: salaryError,
    salaryDatas,
  } = salaryInfos;

  // Get salary updated data from redux store
  const salaryUpdateResponse = useSelector((state) => state.salaryUpdatedData);
  const {
    loading: salaryUpdateLoading,
    error: salaryUpdateError,
    salaryUpdated,
  } = salaryUpdateResponse;

  // Show salary creation notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (salaryError)
      addToast(salaryError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (salaryDatas && salaryDatas.message)
      addToast(salaryDatas.message, { appearance: "success" });

    if (salaryUpdateError)
      addToast(salaryUpdateError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (salaryUpdated && salaryUpdated.message)
      addToast(salaryUpdated.message, { appearance: "success" });

    return () => {
      delete salaryInfos.error;
      delete salaryUpdateResponse.error;

      if (salaryDatas) delete salaryDatas.message;
      if (salaryUpdated) delete salaryUpdated.message;
    };
  }, [
    salaryInfos,
    salaryUpdateResponse,
    salaryDatas,
    salaryUpdated,
    salaryError,
    salaryUpdateError,
    addToast,
  ]);

  // State object For root data
  const [salaryMonth, setSalaryMonth] = useState();
  const [salaryYear, setSalaryYear] = useState();

  // State object for root data handling error
  const [rootDataErrors, setRootDataErrors] = useState({});

  // State object for salary data
  const [salaryData, setSalaryData] = useState({
    monthlySalary: 0,
    bonusAmount: 0,
    otherAllowance: 0,
    totalCR: 0,
    pf: 0,
    incomeTax: 0,
    professionalTax: 0,
    otherDeductions: 0,
    totalDR: 0,
    netPayAmount: 0,
    isSalaryActive: true,
  });

  // State obejct for handling salary error
  const [salaryErrors, setSalaryErrors] = useState({});

  // Root data onChnage event
  const getRootData = (month, year, rootErrors) => {
    setSalaryMonth(month);
    setSalaryYear(year);
    // setSalaryErrors(rootErrors);
  };

  // Get/Fire event from child component
  const rootDataRef = useRef(null);

  // Fetch salary record based on id
  const fetchSalaryById = async () => {
    // const response = await dispatch(salaryGetByIdAction(salaryId));
    const { data } = await axios.get(`/api/salary/${salaryId}`);
    const { salaryDataResponse } = data;
    delete salaryDataResponse._id;
    setSalaryMonth(salaryDataResponse.month);
    setSalaryYear(salaryDataResponse.year);
    setSalaryData(salaryDataResponse);
  };

  // Get existing salary by id
  useEffect(() => {
    if (salaryId) {
      fetchSalaryById();
    } else {
      setSalaryMonth("select");
      setSalaryYear("select");
      rootDataRef.current.resetRootData();

      setSalaryData({
        monthlySalary: 0,
        bonusAmount: 0,
        otherAllowance: 0,
        totalCR: 0,
        pf: 0,
        incomeTax: 0,
        professionalTax: 0,
        otherDeductions: 0,
        totalDR: 0,
        netPayAmount: 0,
        isSalaryActive: true,
      });
    }
  }, [salaryId, salaryDatas]);

  // Input Change Function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...salaryErrors }; //First clone the existing errors
    const errorMessage = salaryFieldOnChangeValidation(input, salaryData);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setSalaryErrors(errors);

    let stateTotalCR =
      parseFloat(salaryData.totalCR) > 0 ? parseFloat(salaryData.totalCR) : 0;

    let stateTotalDR =
      parseFloat(salaryData.totalDR) > 0 ? parseFloat(salaryData.totalDR) : 0;

    salaryData.netPayAmount =
      parseFloat(stateTotalCR) - parseFloat(stateTotalDR);

    // After Validation Success, Get Input Field Values
    const salaryInfos = { ...salaryData };
    salaryInfos[input.name] = input.value;
    setSalaryData(salaryInfos);
  };

  // Validate salary data on submit
  const validation = () => {
    const errors = {};

    if (
      parseInt(salaryData.monthlySalary) === 0 ||
      salaryData.monthlySalary === ""
    )
      errors.monthlySalary = t("enterMonthlySalary");
    else if (isAllowDecimalNumber(salaryData.monthlySalary) !== "") {
      errors.monthlySalary = isAllowDecimalNumber(salaryData.monthlySalary);
    }

    if (isAllowDecimalNumber(salaryData.bonusAmount, false) !== "") {
      errors.bonusAmount = isAllowDecimalNumber(salaryData.bonusAmount, false);
    }

    if (isAllowDecimalNumber(salaryData.otherAllowance, false) !== "") {
      errors.otherAllowance = isAllowDecimalNumber(
        salaryData.otherAllowance,
        false
      );
    }

    if (isAllowDecimalNumber(salaryData.pf, false) !== "") {
      errors.pf = isAllowDecimalNumber(salaryData.pf, false);
    }

    if (isAllowDecimalNumber(salaryData.incomeTax, false) !== "") {
      errors.incomeTax = isAllowDecimalNumber(salaryData.incomeTax, false);
    }

    if (isAllowDecimalNumber(salaryData.professionalTax, false) !== "") {
      errors.professionalTax = isAllowDecimalNumber(
        salaryData.professionalTax,
        false
      );
    }

    if (isAllowDecimalNumber(salaryData.otherDeductions, false) !== "") {
      errors.otherDeductions = isAllowDecimalNumber(
        salaryData.otherDeductions,
        false
      );
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Salary save & update event
  const handleSalaryData = (e) => {
    e.preventDefault();

    const rootErrors = rootFieldOnSubmitValidation(salaryMonth, salaryYear);
    setRootDataErrors(rootErrors || {});

    if (rootErrors) {
      return;
    } else {
      const formErrors = validation();
      setSalaryErrors(formErrors || {});
      if (formErrors) return;
    }

    if (!salaryId) {
      dispatch(
        salaryCreateAction(
          salaryMonth,
          salaryYear,
          salaryData.monthlySalary,
          salaryData.bonusAmount,
          salaryData.otherAllowance,
          salaryData.totalCR,
          salaryData.pf,
          salaryData.incomeTax,
          salaryData.professionalTax,
          salaryData.otherDeductions,
          salaryData.totalDR,
          salaryData.netPayAmount,
          salaryData.isActive
        )
      );
    } else {
      dispatch(
        salaryUpdateAction(
          salaryId,
          salaryMonth,
          salaryYear,
          salaryData.monthlySalary,
          salaryData.bonusAmount,
          salaryData.otherAllowance,
          salaryData.totalCR,
          salaryData.pf,
          salaryData.incomeTax,
          salaryData.professionalTax,
          salaryData.otherDeductions,
          salaryData.totalDR,
          salaryData.netPayAmount
        )
      );
    }
  };

  // Delete salary information data
  // Get/Fire event from child component
  const deleteScreenRef = useRef(null);
  const handleOpenDeleteScreen = (e) => {
    e.preventDefault();
    deleteScreenRef.current.openModalWindow();
  };

  return (
    <>
      {salaryLoading && <Loading />}
      {salaryUpdateLoading && <Loading />}
      <MainLayout title={t("salary")}>
        <FormNavigation navigateToNew="/salary" navigateToList="/salary/list" />
        <div className="salary-section">
          <div className="salary-section__root-input">
            <RootData
              rootData={getRootData}
              rootDataErrors={rootDataErrors}
              updateRootData={{ month: salaryMonth, year: salaryYear }}
              ref={rootDataRef}
            />
          </div>
          <div className="salary-section__credit-input">
            <Row>
              <Col>
                <Accordion
                  accordAlwaysOpen={true}
                  defaultActive={0}
                  eventAccord={0}
                  accordTitle={t("salaryCreditDetails")}
                >
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <InputFormGroup
                        inputLabel={t("monthlySalary")}
                        inputName="monthlySalary"
                      >
                        <InputText
                          inputName="monthlySalary"
                          inputType="text"
                          placeholderName={t("enterMonthlySalary")}
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.monthlySalary}
                          inputChange={handleInputChange}
                          inputBlur={resetDefaultValue}
                          inputFocus={resetInput}
                          inputValue={salaryData.monthlySalary}
                        />
                        <div className="input-hints">
                          <p>
                            <span>{t("note")}:</span>{" "}
                            {t("enterYourTotalEaringInfo")}.
                          </p>
                        </div>
                      </InputFormGroup>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <InputFormGroup
                        inputLabel={t("bonusAmount")}
                        inputName="bonusAmount"
                      >
                        <InputText
                          inputName="bonusAmount"
                          inputType="text"
                          placeholderName={t("enterBonusAmount")}
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.bonusAmount}
                          inputChange={handleInputChange}
                          inputBlur={resetDefaultValue}
                          inputFocus={resetInput}
                          inputValue={salaryData.bonusAmount}
                        />
                      </InputFormGroup>

                      <InputFormGroup
                        inputLabel={t("otherAllowance")}
                        inputName="otherAllowance"
                      >
                        <InputText
                          inputName="otherAllowance"
                          inputType="text"
                          placeholderName={t("enterOtherAllowance")}
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.otherAllowance}
                          inputChange={handleInputChange}
                          inputBlur={resetDefaultValue}
                          inputFocus={resetInput}
                          inputValue={salaryData.otherAllowance}
                        />
                        <div className="input-hints">
                          <p>
                            <span>{t("note")}:</span>{" "}
                            {t("enterExtraAllowanceInfo")}.
                          </p>
                        </div>
                      </InputFormGroup>
                    </Col>
                  </Row>
                </Accordion>
              </Col>
            </Row>
            <Row className="salary-section__display-info">
              <Col sm={4} xs={4}></Col>
              <Col sm={8} xs={8}>
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalCR"
                  displayName={`${t("totalCreditAmount")}:`}
                  displayInfoClasses="green-text"
                  displayInfo={salaryData.totalCR}
                />
              </Col>
            </Row>
          </div>
          <div className="salary-section__debit-input">
            <Row>
              <Col>
                <Accordion
                  accordAlwaysOpen={false}
                  eventAccord={1}
                  accordTitle={t("salaryDebitDetails")}
                >
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <InputFormGroup inputLabel={t("pf")} inputName="pf">
                        <InputText
                          inputName="pf"
                          inputType="text"
                          placeholderName={t("enterPfAmount")}
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.pf}
                          inputChange={handleInputChange}
                          inputBlur={resetDefaultValue}
                          inputFocus={resetInput}
                          inputValue={salaryData.pf}
                        />
                      </InputFormGroup>

                      <InputFormGroup
                        inputLabel={t("professionalTax")}
                        inputName="professionalTax"
                      >
                        <InputText
                          inputName="professionalTax"
                          inputType="text"
                          placeholderName={t("enterProfessionalTax")}
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.professionalTax}
                          inputChange={handleInputChange}
                          inputBlur={resetDefaultValue}
                          inputFocus={resetInput}
                          inputValue={salaryData.professionalTax}
                        />
                      </InputFormGroup>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <InputFormGroup
                        inputLabel={t("incomeTax")}
                        inputName="incomeTax"
                      >
                        <InputText
                          inputName="incomeTax"
                          inputType="text"
                          placeholderName={t("enterTaxAmount")}
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.incomeTax}
                          inputChange={handleInputChange}
                          inputBlur={resetDefaultValue}
                          inputFocus={resetInput}
                          inputValue={salaryData.incomeTax}
                        />
                      </InputFormGroup>

                      <InputFormGroup
                        inputLabel={t("otherDeductions")}
                        inputName="otherDeductions"
                      >
                        <InputText
                          inputName="otherDeductions"
                          inputType="text"
                          placeholderName={t("enterOtherDeductions")}
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.otherDeductions}
                          inputChange={handleInputChange}
                          inputBlur={resetDefaultValue}
                          inputFocus={resetInput}
                          inputValue={salaryData.otherDeductions}
                        />
                        <div className="input-hints">
                          <p>
                            <span>{t("note")}:</span>{" "}
                            {t("enterYourAllDeductionsExceptRemaining")}.
                          </p>
                        </div>
                      </InputFormGroup>
                    </Col>
                  </Row>
                </Accordion>
              </Col>
            </Row>
            <Row className="salary-section__display-info">
              <Col sm={4} xs={4}></Col>
              <Col sm={8} xs={8}>
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalDR"
                  displayName={`${t("totalDebitAmount")}:`}
                  displayInfoClasses="red-text"
                  displayInfo={salaryData.totalDR}
                />

                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="netPay"
                  displayName={`${t("netPay")}:`}
                  displayInfoClasses="green-text"
                  displayInfo={salaryData.netPayAmount}
                />
              </Col>
            </Row>
          </div>
          <div className="form-group salary-section__action-content">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSalaryData}
            >
              {!salaryId ? t("save") : t("update")}
            </button>

            {salaryId && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleOpenDeleteScreen}
              >
                {t("delete")}
              </button>
            )}
          </div>
        </div>
      </MainLayout>
      <RecordDeleteScreen
        deleteScreenClasses="salary-section__delete-modal"
        recordId={salaryId && salaryId}
        recordNav="/salary/list"
        ref={deleteScreenRef}
        deleteScreenContent={
          <>
            Do you want to delete the salary data on{" "}
            <b style={{ color: "#FF0000" }}>
              {salaryMonth &&
                salaryMonth !== "select" &&
                monthsList[salaryMonth - 1].name}{" "}
              - {salaryYear && salaryYear !== "select" && salaryYear}
            </b>
          </>
        }
        dataDispatchAction={salaryDeleteAction}
      />
    </>
  );
};

export default Salary;
