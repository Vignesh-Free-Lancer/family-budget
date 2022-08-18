import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";
import { useTranslation } from "react-i18next";

import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import InputSelect from "../../components/inputSelect/InputSelect";
import { expenseParticularType, paymentType } from "../../utils/Utils";
import CustomDatepicker from "../../components/customDatepicker/CustomDatepicker";
import ExpenseModalWindow from "./ExpenseModalWindow";

const ExpenseForm = forwardRef((props, ref) => {
  const { t } = useTranslation();

  // State Object For Particulars Type
  const [selectedParticularType, setSelectedParticularType] =
    useState("select");

  // State Object For Payment Type
  const [selectedPaymentType, setSelectedPaymentType] = useState("select");

  // State Object For DOB Field
  const [paymentDate, setPaymentDate] = useState("");

  // State Object For Payment Month Start & End Date
  const [paymentMonthStartDate, setPaymentMonthStartDate] = useState("");
  const [paymentMonthEndDate, setPaymentMonthEndDate] = useState("");

  // State Obejct For Handling Expense Error
  const [expenseFormErrors, setExpenseFormErrors] = useState({});

  // Handle The Payment Date Field On Change Function
  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
    // date === null
    //   ? (userErrors.dob = "Please select dob")
    //   : delete userErrors.dob;
  };

  const saveExpenseData = () => {
    alert("Expense added");
  };

  useImperativeHandle(ref, () => ({
    triggerNewExpense() {
      saveExpenseData();
    },
  }));

  return (
    <div className="expense-section-expense-form">
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <InputFormGroup inputLabel={t("particular")} inputName="particular">
            <InputText
              inputName="particular"
              inputType="text"
              placeholderName={t("enterParticular")}
              inputErrorMessage={expenseFormErrors.particular}
              //   inputChange={handleExpenseInputChange}
              //   inputValue={expenseData.particular}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={t("particularType")}
            inputName="ddlParticularType"
          >
            <InputSelect
              inputName="ddlParticularType"
              inputArray={expenseParticularType}
              inputDefaultValue={selectedParticularType}
              //   inputChange={handleSelectChange}
              inputErrorMessage={expenseFormErrors.selectedParticularType}
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
              //   inputChange={handleExpenseInputChange}
              //   inputBlur={resetDefaultValue}
              //   inputFocus={resetInput}
              //   inputValue={expenseData.estimatedCost}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("actualCost")} inputName="actualCost">
            <InputText
              inputName="actualCost"
              inputType="text"
              placeholderName={t("enterActualCosts")}
              inputAlignment="right"
              inputErrorMessage={expenseFormErrors.actualCost}
              //   inputChange={handleExpenseInputChange}
              //   inputBlur={resetDefaultValue}
              //   inputFocus={resetInput}
              //   inputValue={expenseData.actualCost}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={t("paymentType")}
            inputName="ddlPaymentType"
          >
            <InputSelect
              inputName="ddlPaymentType"
              inputArray={paymentType}
              inputDefaultValue={selectedPaymentType}
              //   inputChange={handleSelectChange}
              inputErrorMessage={expenseFormErrors.selectedPaymentType}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("paymentDate")} inputName="paymentDate">
            <CustomDatepicker
              customDateChange={handlePaymentDateChange}
              customdateName="paymentDate"
              customDatePlaceholder={t("pleaseSelectPaymentDate")}
              customMinDateRange={paymentMonthStartDate}
              customMaxDateRange={paymentMonthEndDate}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("paymentBank")} inputName="paymentBank">
            <InputText
              inputName="paymentBank"
              inputType="text"
              placeholderName={t("enterPaymentBankName")}
              inputErrorMessage={expenseFormErrors.paymentBank}
              //   inputChange={handleExpenseInputChange}
              //   inputValue={expenseData.paymentBank}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("description")} inputName="description">
            <textarea
              className="form-control"
              placeholder={`${t("enterYourHints")}...`}
              name="description"
              //   onChange={handleExpenseInputChange}
              //   value={expenseData.description}
            ></textarea>
          </InputFormGroup>
        </Col>
      </Row>
      <ExpenseModalWindow />
    </div>
  );
});

export default ExpenseForm;
