import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./extra-income.scss";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  extraIncomeType,
  isAllowDecimalNumber,
  getStartEndDate,
  resetInput,
  resetDefaultValue,
} from "../../utils/Utils";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import FormNavigation from "../../components/navigation/FormNavigation";
import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import InputSelect from "../../components/inputSelect/InputSelect";
import CustomDatepicker from "../../components/customDatepicker/CustomDatepicker";
import RootData from "../../components/rootData/RootData";
import { rootFieldOnSubmitValidation } from "../../utils/ValidateFields";
import RecordDeleteScreen from "../../components/recordDeleteScreen/RecordDeleteScreen";
import {
  extraIncomeCreateAction,
  extraIncomeUpdateAction,
  extraIncomeDeleteAction,
} from "../../redux/actions/ExtraIncomeActions";
import Loading from "../../components/loading/Loading";

const ExtraIncome = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get extra income id from url
  const { extraIncomeId } = useParams();

  // Get extra income creation data from redux store
  const extraIncomeInfos = useSelector((state) => state.extraIncomeRecords);
  const {
    loading: extraIncomeLoading,
    error: extraIncomeError,
    extraIncomeDatas,
  } = extraIncomeInfos;

  // Get extra income updated data from redux store
  const extraIncomeUpdateResponse = useSelector(
    (state) => state.extraIncomeUpdatedData
  );
  const {
    loading: extraIncomeUpdateLoading,
    error: extraIncomeUpdateError,
    extraIncomeUpdated,
  } = extraIncomeUpdateResponse;

  // Show extra income creation notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (extraIncomeError)
      addToast(extraIncomeError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (extraIncomeDatas && extraIncomeDatas.message)
      addToast(extraIncomeDatas.message, { appearance: "success" });

    if (extraIncomeUpdateError)
      addToast(extraIncomeUpdateError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (extraIncomeUpdated && extraIncomeUpdated.message)
      addToast(extraIncomeUpdated.message, { appearance: "success" });

    return () => {
      delete extraIncomeInfos.error;
      delete extraIncomeUpdateResponse.error;

      if (extraIncomeDatas) delete extraIncomeDatas.message;
      if (extraIncomeUpdated) delete extraIncomeUpdated.message;
    };
  }, [
    extraIncomeInfos,
    extraIncomeUpdateResponse,
    extraIncomeDatas,
    extraIncomeUpdated,
    extraIncomeError,
    extraIncomeUpdateError,
    addToast,
  ]);

  // State object For root data
  const [extraIncomeMonth, setExtraIncomeMonth] = useState();
  const [extraIncomeYear, setExtraIncomeYear] = useState();

  // State object for root data handling error
  const [rootDataErrors, setRootDataErrors] = useState({});

  // State Object For Income Month Start & End Date
  const [incomeMonthStartDate, setIncomeMonthStartDate] = useState("");
  const [incomeMonthEndDate, setIncomeMonthEndDate] = useState("");

  // State Object For Income Field
  const [incomeDate, setIncomeDate] = useState("");

  // State Object For Payment Credited Type
  const [selectedCreditType, setSelectedCreditType] = useState("select");

  // State object for extra income data
  const [extraIncomeData, setExtraIncomeData] = useState({
    incomeCreditAmount: 0,
    amountCreditedBank: "",
    description: "",
    isExtraIncomeActive: true,
  });

  // State Obejct For Handling Extra Income Form Error
  const [extraIncomeErrors, setExtraIncomeErrors] = useState({});

  // Root data onChnage event
  const getRootData = (month, year, rootErrors) => {
    setExtraIncomeMonth(month);
    setExtraIncomeYear(year);
  };

  // Get/Fire event from child component
  const rootDataRef = useRef(null);

  // Get month start and end data from selected month & year
  useEffect(() => {
    const days = getStartEndDate(extraIncomeMonth, extraIncomeYear);
    setIncomeMonthStartDate(days.firstDay);
    setIncomeMonthEndDate(days.lastDay);
  }, [extraIncomeMonth, extraIncomeYear]);

  // Fetch extra income record based on id
  const fetchExtraIncomeById = async () => {
    // const response = await dispatch(salaryGetByIdAction(salaryId));
    const { data } = await axios.get(`/api/extra-income/${extraIncomeId}`);
    const { extraIncomeDataResponse } = data;
    delete extraIncomeDataResponse._id;
    setExtraIncomeMonth(extraIncomeDataResponse.month);
    setExtraIncomeYear(extraIncomeDataResponse.year);
    setIncomeDate(new Date(data.extraIncomeDataResponse.incomeDate));
    setSelectedCreditType(extraIncomeDataResponse.amountCreditedType);
    setExtraIncomeData(extraIncomeDataResponse);
  };

  // Get existing extra income by id
  useEffect(() => {
    if (extraIncomeId) {
      fetchExtraIncomeById();
    } else {
      setExtraIncomeMonth("select");
      setExtraIncomeYear("select");
      rootDataRef.current.resetRootData();
      setIncomeDate("");
      setSelectedCreditType("select");

      setExtraIncomeData({
        incomeCreditAmount: 0,
        amountCreditedBank: "",
        description: "",
        isExtraIncomeActive: true,
      });
    }
  }, [extraIncomeId]);

  // Handle The Date Field On Change Function
  const handleIncomeDateChange = (date) => {
    setIncomeDate(date);
    date === null
      ? (extraIncomeErrors.incomeDate = t("pleaseSelectIncomeData"))
      : delete extraIncomeErrors.incomeDate;
  };

  // Dropdown On Change Event
  const handleSelectChange = (e) => {
    if (e.target.name === "ddlAmountCreditType") {
      setSelectedCreditType(e.target.value);
      e.target.value === "select"
        ? (extraIncomeErrors.selectedCreditType = t(
            "pleaseSelectAmountCreditType"
          ))
        : delete extraIncomeErrors.selectedCreditType;
    }
  };

  const inputOnChangeValidation = (input) => {
    if (input.name === "incomeCreditAmount") {
      if (parseFloat(input.value) === 0 || input.value === "")
        return t("pleaseEnterCreditAmount");
      else return isAllowDecimalNumber(input.value);
    }

    if (input.name === "amountCreditedBank") {
      if (input.value.trim() === "")
        return t("PleaseEnterBankNameForAmountCredited");
    }
  };

  // Input Change Function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...extraIncomeErrors }; //First clone the existing errors
    const errorMessage = inputOnChangeValidation(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setExtraIncomeErrors(errors);

    // After Validation Success, Get Input Field Values
    const extraIncomeInfos = { ...extraIncomeData };
    extraIncomeInfos[input.name] = input.value;
    setExtraIncomeData(extraIncomeInfos);
  };

  const validation = () => {
    const errors = {};

    if (incomeDate === null || incomeDate === "" || incomeDate === undefined)
      errors.incomeDate = t("pleaseSelectIncomeDate");

    if (selectedCreditType === "select")
      errors.selectedCreditType = t("pleaseSelectAmountCreditType");

    if (
      parseInt(extraIncomeData.incomeCreditAmount) === 0 ||
      extraIncomeData.incomeCreditAmount === ""
    ) {
      errors.incomeCreditAmount = t("pleaseEnterCreditAmount");
    } else if (
      isAllowDecimalNumber(extraIncomeData.incomeCreditAmount) !== ""
    ) {
      errors.incomeCreditAmount = isAllowDecimalNumber(
        extraIncomeData.incomeCreditAmount
      );
    }

    if (extraIncomeData.amountCreditedBank.trim() === "")
      errors.amountCreditedBank = t("PleaseEnterBankNameForAmountCredited");

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Extra income form save & update event
  const handleExtraIncomeData = (e) => {
    e.preventDefault();

    const rootErrors = rootFieldOnSubmitValidation(
      extraIncomeMonth,
      extraIncomeYear
    );
    setRootDataErrors(rootErrors || {});

    if (rootErrors) {
      return;
    } else {
      const formErrors = validation();
      setExtraIncomeErrors(formErrors || {});
      if (formErrors) return;
    }

    if (!extraIncomeId) {
      dispatch(
        extraIncomeCreateAction(
          extraIncomeMonth,
          extraIncomeYear,
          incomeDate,
          extraIncomeData.incomeCreditAmount,
          selectedCreditType,
          extraIncomeData.amountCreditedBank,
          extraIncomeData.description,
          extraIncomeData.isExtraIncomeActive
        )
      );
    } else {
      dispatch(
        extraIncomeUpdateAction(
          extraIncomeId,
          extraIncomeMonth,
          extraIncomeYear,
          incomeDate,
          extraIncomeData.incomeCreditAmount,
          selectedCreditType,
          extraIncomeData.amountCreditedBank,
          extraIncomeData.description
        )
      );
    }
  };

  // Delete Extra income information data
  // Get/Fire event from child component
  const deleteScreenRef = useRef(null);
  const handleOpenDeleteScreen = (e) => {
    e.preventDefault();
    deleteScreenRef.current.openModalWindow();
  };

  return (
    <>
      {extraIncomeLoading && <Loading />}
      {extraIncomeUpdateLoading && <Loading />}
      <MainLayout title={t("extraIncome")}>
        <FormNavigation
          navigateToNew="/extra-income"
          navigateToList="/extra-income/list"
        />
        <div className="extra-income-section">
          <div className="extra-income-section__root-input">
            <RootData
              rootData={getRootData}
              rootDataErrors={rootDataErrors}
              updateRootData={{
                month: extraIncomeMonth,
                year: extraIncomeYear,
              }}
              ref={rootDataRef}
            />
          </div>
          <div className="extra-income-section__form-input">
            <Row>
              <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                <InputFormGroup
                  inputLabel={t("incomeDate")}
                  inputName="incomeDate"
                >
                  <CustomDatepicker
                    customDatepickerClassname={`form-control ${
                      extraIncomeErrors.incomeDate ? "is-invalid" : ""
                    }`}
                    customdateName="incomeDate"
                    customDatePlaceholder={t("pleaseSelectIncomeDate")}
                    customDateValue={incomeDate}
                    customDateChange={handleIncomeDateChange}
                    customMinDateRange={incomeMonthStartDate}
                    customMaxDateRange={incomeMonthEndDate}
                  />
                  <div
                    className="invalid-feedback"
                    style={{
                      display: extraIncomeErrors.incomeDate ? "block" : "none",
                    }}
                  >
                    {extraIncomeErrors.incomeDate}
                  </div>
                </InputFormGroup>

                <InputFormGroup
                  inputLabel={t("creditedType")}
                  inputName="ddlAmountCreditType"
                >
                  <InputSelect
                    inputName="ddlAmountCreditType"
                    inputArray={extraIncomeType}
                    inputDefaultValue={selectedCreditType}
                    inputChange={handleSelectChange}
                    inputErrorMessage={extraIncomeErrors.selectedCreditType}
                  />
                  <div className="input-hints">
                    <p>
                      <span>{t("note")}:</span>{" "}
                      {t("pleaseSelectTypeAmountDetails")}.
                    </p>
                  </div>
                </InputFormGroup>

                <InputFormGroup
                  inputLabel={t("description")}
                  inputName="description"
                >
                  <textarea
                    className="form-control"
                    placeholder={`${t("enterYourHints")}...`}
                    name="description"
                    onChange={handleInputChange}
                    value={extraIncomeData.description}
                  ></textarea>
                </InputFormGroup>
              </Col>
              <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                <InputFormGroup
                  inputLabel={t("creditAmount")}
                  inputName="incomeCreditAmount"
                >
                  <InputText
                    inputName="incomeCreditAmount"
                    inputType="text"
                    placeholderName={t("enterCreditAmount")}
                    inputAlignment="right"
                    inputErrorMessage={extraIncomeErrors.incomeCreditAmount}
                    inputChange={handleInputChange}
                    inputBlur={resetDefaultValue}
                    inputFocus={resetInput}
                    inputValue={extraIncomeData.incomeCreditAmount}
                  />
                </InputFormGroup>

                <InputFormGroup
                  inputLabel={t("amountCreditedTo")}
                  inputName="amountCreditedBank"
                >
                  <InputText
                    inputName="amountCreditedBank"
                    inputType="text"
                    placeholderName="Enter bank name for amount credited"
                    inputErrorMessage={extraIncomeErrors.amountCreditedBank}
                    inputChange={handleInputChange}
                    inputValue={extraIncomeData.amountCreditedBank}
                  />
                </InputFormGroup>
              </Col>
            </Row>
          </div>
          <div className="form-group extra-income-section__action-content">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleExtraIncomeData}
            >
              {!extraIncomeId ? t("save") : t("update")}
            </button>

            {extraIncomeId && (
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
        deleteScreenClasses="extra-income-section__delete-modal"
        recordId={extraIncomeId && extraIncomeId}
        recordNav="/extra-income/list"
        ref={deleteScreenRef}
        deleteScreenContent={
          <>
            Do you want to delete the extra income data on{" "}
            <b style={{ color: "#FF0000" }}>
              {new Date(incomeDate).toLocaleDateString()}
            </b>
          </>
        }
        dataDispatchAction={extraIncomeDeleteAction}
      />
    </>
  );
};

export default ExtraIncome;
