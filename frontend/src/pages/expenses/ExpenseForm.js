import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useContext,
  useEffect,
} from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import axios from "axios";

import { RootDataContext } from "./Expenses";
import {
  expenseParticularType,
  expensePaymentType,
  getDefaultYears,
  getStartEndDate,
  resetDefaultValue,
  resetInput,
} from "../../utils/Utils";
import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import InputSelect from "../../components/inputSelect/InputSelect";
import CustomDatepicker from "../../components/customDatepicker/CustomDatepicker";
import {
  expenseFieldOnChangeValidation,
  expenseFieldSubmitValidation,
} from "../../utils/ValidateFields";
import {
  expenseCreateAction,
  expenseUpdateAction,
} from "../../redux/actions/ExpenseActions";

const ExpenseForm = forwardRef((props, ref) => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get Expense RootData From Context
  const { month, year, closeExpenseModal, selectedRecordData } =
    useContext(RootDataContext);

  // State Object For Particulars Type
  const [particularType, setParticularType] = useState("select");

  // State Object For Payment Type
  const [paymentType, setPaymentType] = useState("select");

  // State Object For Payment Date
  const [paymentDate, setPaymentDate] = useState("");

  // State Object For Payment Month Start & End Date
  const [paymentMonthStartDate, setPaymentMonthStartDate] = useState("");
  const [paymentMonthEndDate, setPaymentMonthEndDate] = useState("");

  // State Object For Expense Form Data
  const [expenseData, SetExpenseData] = useState({
    particular: "",
    estimatedCost: 0,
    actualCost: 0,
    paymentBank: "",
    description: "",
  });

  // State Obejct For Handling Expense Error
  const [expenseFormErrors, setExpenseFormErrors] = useState({});

  // Get month start and end data from selected month & year
  useEffect(() => {
    const days = getStartEndDate(month, year);
    setPaymentMonthStartDate(days.firstDay);
    setPaymentMonthEndDate(days.lastDay);
  }, [month, year]);

  // Fetch expense record based on id
  const fetchExpenseById = async () => {
    const { data } = await axios.get(`/api/expense/${selectedRecordData}`);
    const { expenseDetail } = data;
    delete expenseDetail._id;
    setParticularType(expenseDetail.particularType);
    setPaymentType(expenseDetail.paymentType);
    setPaymentDate(new Date(expenseDetail.paymentDate));
    SetExpenseData(expenseDetail);
  };

  // Get existing extra income by id
  useEffect(() => {
    if (selectedRecordData) {
      fetchExpenseById();
    } else {
      setParticularType("select");
      setPaymentType("select");
      setPaymentDate("");

      SetExpenseData({
        particular: "",
        estimatedCost: 0,
        actualCost: 0,
        paymentBank: "",
        description: "",
      });
    }
  }, [selectedRecordData]);

  // Handle The Payment Date Field On Change Function
  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
    date === null
      ? (expenseFormErrors.paymentDate = t("pleaseSelectPaymentDate"))
      : delete expenseFormErrors.paymentDate;
  };

  // Dropdown On Change Event
  const handleSelectChange = (e) => {
    if (e.target.name === "ddlParticularType") {
      setParticularType(e.target.value);
      e.target.value === "select"
        ? (expenseFormErrors.selectedParticularType = t(
            "PleaseSelectParticularType"
          ))
        : delete expenseFormErrors.selectedParticularType;
    }

    if (e.target.name === "ddlPaymentType") {
      setPaymentType(e.target.value);
      e.target.value === "select"
        ? (expenseFormErrors.selectedPaymentType = t(
            "pleaseSelectePaymentType"
          ))
        : delete expenseFormErrors.selectedPaymentType;

      if (e.target.value === "cash") {
        delete expenseFormErrors.paymentBank;
        expenseData.paymentBank = "";
      }
    }
  };

  // Handle Expense Input Field Validation On Change
  const handleExpenseInputChange = ({ currentTarget: input }) => {
    const errors = { ...expenseFormErrors }; //First clone the existing errors
    const errorMessage = expenseFieldOnChangeValidation(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setExpenseFormErrors(errors);

    // After Validation Success, Get Input Field Values
    const expenseInfo = { ...expenseData };
    expenseInfo[input.name] = input.value;
    SetExpenseData(expenseInfo);
  };

  // Save expense data
  const saveExpenseData = () => {
    const errors = expenseFieldSubmitValidation(
      expenseData,
      particularType,
      paymentType,
      paymentDate
    );
    setExpenseFormErrors(errors || {});
    if (errors) return;

    closeExpenseModal(false);

    if (!selectedRecordData) {
      dispatch(
        expenseCreateAction(
          month,
          year,
          expenseData.particular,
          particularType,
          expenseData.estimatedCost,
          expenseData.actualCost,
          paymentType,
          expenseData.paymentBank,
          paymentDate,
          expenseData.description
        )
      );
    } else {
      dispatch(
        expenseUpdateAction(
          selectedRecordData,
          month,
          year,
          expenseData.particular,
          particularType,
          expenseData.estimatedCost,
          expenseData.actualCost,
          paymentType,
          expenseData.paymentBank,
          paymentDate,
          expenseData.description
        )
      );
    }
  };

  // Pass save expense date from child to parent component
  useImperativeHandle(ref, () => ({
    triggerNewExpense() {
      saveExpenseData();
    },
  }));

  return (
    <div className="expense-section-expense-form">
      <Row>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <InputFormGroup inputLabel={t("particular")} inputName="particular">
            <InputText
              inputName="particular"
              inputType="text"
              placeholderName={t("enterParticular")}
              inputErrorMessage={expenseFormErrors.particular}
              inputChange={handleExpenseInputChange}
              inputValue={expenseData.particular}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={t("estimatedCost")}
            inputName="estimatedCost"
          >
            <InputText
              inputName="estimatedCost"
              inputType="text"
              placeholderName={t("enterEstimateCosts")}
              inputAlignment="right"
              inputErrorMessage={expenseFormErrors.estimatedCost}
              inputChange={handleExpenseInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={expenseData.estimatedCost}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("paymentDate")} inputName="paymentDate">
            <CustomDatepicker
              customDatepickerClassname={`form-control ${
                expenseFormErrors.paymentDate ? "is-invalid" : ""
              }`}
              customdateName="paymentDate"
              customDatePlaceholder={t("pleaseSelectPaymentDate")}
              customDataYears={getDefaultYears}
              customDateValue={paymentDate}
              customDateChange={handlePaymentDateChange}
              customMinDateRange={paymentMonthStartDate}
              customMaxDateRange={paymentMonthEndDate}
            />
            <div
              className="invalid-feedback"
              style={{
                display: expenseFormErrors.paymentDate ? "block" : "none",
              }}
            >
              {expenseFormErrors.paymentDate}
            </div>
          </InputFormGroup>

          <InputFormGroup inputLabel={t("paymentBank")} inputName="paymentBank">
            <InputText
              inputName="paymentBank"
              inputType="text"
              placeholderName={t("enterPaymentBankName")}
              inputErrorMessage={expenseFormErrors.paymentBank}
              inputChange={handleExpenseInputChange}
              inputValue={expenseData.paymentBank}
            />
          </InputFormGroup>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <InputFormGroup
            inputLabel={t("particularType")}
            inputName="ddlParticularType"
          >
            <InputSelect
              inputName="ddlParticularType"
              inputArray={expenseParticularType}
              inputDefaultValue={particularType}
              inputChange={handleSelectChange}
              inputErrorMessage={expenseFormErrors.selectedParticularType}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("actualCost")} inputName="actualCost">
            <InputText
              inputName="actualCost"
              inputType="text"
              placeholderName={t("enterActualCosts")}
              inputAlignment="right"
              inputErrorMessage={expenseFormErrors.actualCost}
              inputChange={handleExpenseInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={expenseData.actualCost}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={t("paymentType")}
            inputName="ddlPaymentType"
          >
            <InputSelect
              inputName="ddlPaymentType"
              inputArray={expensePaymentType}
              inputDefaultValue={paymentType}
              inputChange={handleSelectChange}
              inputErrorMessage={expenseFormErrors.selectedPaymentType}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("description")} inputName="description">
            <textarea
              className="form-control"
              placeholder={`${t("enterYourHints")}...`}
              name="description"
              onChange={handleExpenseInputChange}
              value={expenseData.description}
            ></textarea>
          </InputFormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default ExpenseForm;
