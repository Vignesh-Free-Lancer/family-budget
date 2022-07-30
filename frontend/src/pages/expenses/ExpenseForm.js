import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";

import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import InputSelect from "../../components/inputSelect/InputSelect";
import { expenseParticularType, paymentType } from "../../utils/Utils";
import CustomDatepicker from "../../components/customDatepicker/CustomDatepicker";
import ExpenseModalWindow from "./ExpenseModalWindow";

const ExpenseForm = forwardRef((props, ref) => {
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
          <InputFormGroup inputLabel="Particular" inputName="particular">
            <InputText
              inputName="particular"
              inputType="text"
              placeholderName="Enter particular"
              inputErrorMessage={expenseFormErrors.particular}
              //   inputChange={handleExpenseInputChange}
              //   inputValue={expenseData.particular}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel="Particular Type"
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
            inputLabel="Estimated Costs"
            inputName="estimatedCost"
          >
            <InputText
              inputName="estimatedCost"
              inputType="text"
              placeholderName="Enter estimated costs"
              inputAlignment="right"
              inputErrorMessage={expenseFormErrors.estimatedCost}
              //   inputChange={handleExpenseInputChange}
              //   inputBlur={resetDefaultValue}
              //   inputFocus={resetInput}
              //   inputValue={expenseData.estimatedCost}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel="Actual Costs" inputName="actualCost">
            <InputText
              inputName="actualCost"
              inputType="text"
              placeholderName="Enter actual costs"
              inputAlignment="right"
              inputErrorMessage={expenseFormErrors.actualCost}
              //   inputChange={handleExpenseInputChange}
              //   inputBlur={resetDefaultValue}
              //   inputFocus={resetInput}
              //   inputValue={expenseData.actualCost}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel="Payment Type" inputName="ddlPaymentType">
            <InputSelect
              inputName="ddlPaymentType"
              inputArray={paymentType}
              inputDefaultValue={selectedPaymentType}
              //   inputChange={handleSelectChange}
              inputErrorMessage={expenseFormErrors.selectedPaymentType}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel="Payment Date" inputName="paymentDate">
            <CustomDatepicker
              customDateChange={handlePaymentDateChange}
              customdateName="paymentDate"
              customDatePlaceholder="Please select payment date"
              customMinDateRange={paymentMonthStartDate}
              customMaxDateRange={paymentMonthEndDate}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel="Payment Bank" inputName="paymentBank">
            <InputText
              inputName="paymentBank"
              inputType="text"
              placeholderName="Enter payment bank name"
              inputErrorMessage={expenseFormErrors.paymentBank}
              //   inputChange={handleExpenseInputChange}
              //   inputValue={expenseData.paymentBank}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel="Description" inputName="description">
            <textarea
              className="form-control"
              placeholder="Enter your hints here..."
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
