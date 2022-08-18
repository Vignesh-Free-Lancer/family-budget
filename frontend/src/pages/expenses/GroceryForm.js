import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";
import { useTranslation } from "react-i18next";

import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import InputSelect from "../../components/inputSelect/InputSelect";
import { quantityType } from "../../utils/Utils";

const GroceryForm = forwardRef((props, ref) => {
  const { t } = useTranslation();

  // State Object For Quantity Type
  const [selectedQtyType, setSelectedQtyType] = useState("select");
  const [selectedQtyTypeText, setSelectedQtyTypeText] = useState("");

  // State Obejct For Handling Grocery Error
  const [groceryFormErrors, setGroceryFormErrors] = useState({});

  const saveGroceryData = () => {
    alert("Grocery added");
  };

  useImperativeHandle(ref, () => ({
    triggerNewGrocery() {
      saveGroceryData();
    },
  }));

  return (
    <div className="expense-section-grocery-form">
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <InputFormGroup inputLabel={t("particular")} inputName="particular">
            <InputText
              inputName="particular"
              inputType="text"
              placeholderName={t("enterParticular")}
              inputErrorMessage={groceryFormErrors.particulars}
              //   inputChange={handleGroceryInputChange}
              //   inputValue={groceryData.particulars}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("quantity")} inputName="qty">
            <Row className="expense-section-grocery-form__quantity-section">
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="expense-section-grocery-form__quantity-section__qty-type"
              >
                <InputSelect
                  inputName="ddlQtyType"
                  inputArray={quantityType}
                  inputDefaultValue={selectedQtyType}
                  //   inputChange={handleSelectChange}
                  inputErrorMessage={groceryFormErrors.selectedQtyType}
                />
              </Col>
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="expense-section-grocery-form__quantity-section__qty-value"
              >
                <InputText
                  inputName="qty"
                  inputType="text"
                  placeholderName={t("enterQuantity")}
                  inputAlignment="right"
                  inputErrorMessage={groceryFormErrors.qty}
                  //   inputChange={handleGroceryInputChange}
                  //   inputBlur={resetDefaultValue}
                  //   inputFocus={resetInput}
                  //   inputValue={groceryData.qty}
                />
              </Col>
            </Row>
          </InputFormGroup>

          <InputFormGroup inputLabel={t("unitPrice")} inputName="unitPrice">
            <Row className="expense-section-grocery-form__unit-section">
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="expense-section-grocery-form__unit-section__unit-text"
              >
                <InputText
                  inputName="unitPrice"
                  inputType="text"
                  placeholderName={t("enterUnitPrice")}
                  inputAlignment="right"
                  inputErrorMessage={groceryFormErrors.unitPrice}
                  //   inputChange={handleGroceryInputChange}
                  //   inputBlur={resetDefaultValue}
                  //   inputFocus={resetInput}
                  //   inputValue={groceryData.unitPrice}
                />
              </Col>
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="expense-section-grocery-form__unit-section__unit-type"
              >
                <span className="input-group-text">
                  {`${t("per")} ${
                    selectedQtyType === "select"
                      ? t("kgms")
                      : selectedQtyTypeText === "Grams"
                      ? t("kgms")
                      : selectedQtyTypeText === "M. Litere"
                      ? t("litere")
                      : ""
                  }`}
                </span>
              </Col>
            </Row>
          </InputFormGroup>

          <InputFormGroup inputLabel={t("totalPrice")} inputName="totalPrice">
            <InputText
              inputName="totalPrice"
              inputType="text"
              placeholderName={t("enterTotalPrice")}
              inputAlignment="right"
              inputErrorMessage={groceryFormErrors.totalPrice}
              //   inputChange={handleGroceryInputChange}
              //   inputValue={groceryData.totalPrice}
              inputDisableOption={true}
            />
          </InputFormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default GroceryForm;
