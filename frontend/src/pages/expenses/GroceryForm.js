import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import axios from "axios";

import { RootDataContext } from "./Expenses";
import { quantityType, resetDefaultValue, resetInput } from "../../utils/Utils";
import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import InputSelect from "../../components/inputSelect/InputSelect";
import {
  groceryFieldOnChangeValidation,
  groceryFieldSubmitValidation,
} from "../../utils/ValidateFields";
import {
  groceryCreateAction,
  groceryUpdateAction,
} from "../../redux/actions/GroceryActions";

const GroceryForm = forwardRef((props, ref) => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get Expense RootData From Context
  const { month, year, closeGroceryModal, selectedRecordData } =
    useContext(RootDataContext);

  // State Object For Quantity Type
  const [selectedQtyType, setSelectedQtyType] = useState("select");
  const [selectedQtyTypeText, setSelectedQtyTypeText] = useState("");

  // State Object For Grocery Form Data
  const [groceryData, SetGroceryData] = useState({
    particulars: "",
    qty: 0,
    unitPrice: 0,
    totalPrice: 0,
  });

  // State Obejct For Handling Grocery Error
  const [groceryFormErrors, setGroceryFormErrors] = useState({});

  // Fetch grocery record based on id
  const fetchGroceryById = async () => {
    const { data } = await axios.get(`/api/grocery/${selectedRecordData}`);
    const { groceryDetail } = data;
    delete groceryDetail._id;

    const getGroceryResponseData = { ...groceryDetail };
    const getQtyValue = groceryDetail.qty.match(/\d+/g)[0];
    const getQtyTpe = groceryDetail.qty.match(/[a-zA-Z]+/g)[0];

    getGroceryResponseData.qty = getQtyValue;

    setSelectedQtyType(getQtyTpe);
    SetGroceryData(getGroceryResponseData);
  };

  // Get existing extra income by id
  useEffect(() => {
    if (selectedRecordData) {
      fetchGroceryById();
    } else {
      setSelectedQtyType("select");

      SetGroceryData({
        particular: "",
        estimatedCost: 0,
        actualCost: 0,
        paymentBank: "",
        description: "",
      });
    }
  }, [selectedRecordData]);

  // Dropdown On Change Event
  const handleSelectChange = (e) => {
    if (e.target.name === "ddlQtyType") {
      setSelectedQtyType(e.target.value);
      setSelectedQtyTypeText(e.target.selectedOptions[0].text);
      groceryData.qty = parseInt(0);
      groceryData.totalPrice = parseInt(0);

      e.target.value === "select"
        ? (groceryFormErrors.selectedQtyType = t("pleaseSelectQuantityType"))
        : delete groceryFormErrors.selectedQtyType;
    }
  };

  // Handle Grocery Input Field Validation On Change
  const handleGroceryInputChange = ({ currentTarget: input }) => {
    const errors = { ...groceryFormErrors }; //First clone the existing errors
    const errorMessage = groceryFieldOnChangeValidation(
      input,
      groceryData,
      selectedQtyType
    );

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setGroceryFormErrors(errors);

    // After Validation Success, Get Input Field Values
    const groceryInfo = { ...groceryData };
    groceryInfo[input.name] = input.value;
    SetGroceryData(groceryInfo);
  };

  // Save grocery data
  const saveGroceryData = () => {
    const errors = groceryFieldSubmitValidation(groceryData, selectedQtyType);
    setGroceryFormErrors(errors || {});
    if (errors) return;

    closeGroceryModal(false);

    if (!selectedRecordData) {
      dispatch(
        groceryCreateAction(
          month,
          year,
          groceryData.particulars,
          groceryData.qty + selectedQtyType,
          groceryData.unitPrice,
          groceryData.totalPrice
        )
      );
    } else {
      dispatch(
        groceryUpdateAction(
          selectedRecordData,
          month,
          year,
          groceryData.particulars,
          groceryData.qty + selectedQtyType,
          groceryData.unitPrice,
          groceryData.totalPrice
        )
      );
    }
  };

  // Pass save grocery date from child to parent component
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
              inputName="particulars"
              inputType="text"
              placeholderName={t("enterParticular")}
              inputErrorMessage={groceryFormErrors.particulars}
              inputChange={handleGroceryInputChange}
              inputValue={groceryData.particulars}
            />
          </InputFormGroup>

          <Row className="expense-section-grocery-form__quantity-section">
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
              className="expense-section-grocery-form__quantity-section__qty-type"
            >
              <InputFormGroup inputLabel={t("quantityType")} inputName="qty">
                <InputSelect
                  inputName="ddlQtyType"
                  inputArray={quantityType}
                  inputDefaultValue={selectedQtyType}
                  inputChange={handleSelectChange}
                  inputErrorMessage={groceryFormErrors.selectedQtyType}
                />
              </InputFormGroup>
            </Col>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
              className="expense-section-grocery-form__quantity-section__qty-value"
            >
              <InputFormGroup inputLabel={t("quantityValue")} inputName="qty">
                <InputText
                  inputName="qty"
                  inputType="text"
                  placeholderName={t("enterQuantity")}
                  inputAlignment="right"
                  inputErrorMessage={groceryFormErrors.qty}
                  inputChange={handleGroceryInputChange}
                  inputBlur={resetDefaultValue}
                  inputFocus={resetInput}
                  inputValue={groceryData.qty}
                />
              </InputFormGroup>
            </Col>
          </Row>

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
                  inputChange={handleGroceryInputChange}
                  inputBlur={resetDefaultValue}
                  inputFocus={resetInput}
                  inputValue={groceryData.unitPrice}
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
              inputChange={handleGroceryInputChange}
              inputValue={groceryData.totalPrice}
              inputDisableOption={true}
            />
          </InputFormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default GroceryForm;
