import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./salary.scss";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import RootData from "../../components/rootData/RootData";
import Accordion from "../../components/accordion/Accordion";
import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import DisplayInformation from "../../components/displayInformation/DisplayInformation";
import ModalWindow from "../../components/modalWindow/ModalWindow";

const Salary = () => {
  const { t } = useTranslation();
  // State Object For Month & Year
  const [salaryMonth, setSalaryMonth] = useState();
  const [salaryYear, setSalaryYear] = useState();

  // State Obejct For Handling Salary Error
  const [salaryErrors, setSalaryErrors] = useState({});

  const getRootData = (month, year, rootErrors) => {
    setSalaryMonth(month);
    setSalaryYear(year);
    setSalaryErrors(rootErrors);
  };

  // State Object For Modal Window
  const [openModal, setOpenModal] = useState(false);

  // Show The Modal Window Screen
  const openModalWindow = () => {
    setOpenModal(true);
  };

  // Close The Modal Window Screen
  const closeModalWindow = () => {
    setOpenModal(false);
  };

  // Delete Salary Information Data
  const deleteSalaryData = (e) => {
    e.preventDefault();
    setOpenModal(false);
    alert("Data deleted successfully!");
  };

  return (
    <>
      <MainLayout title={t("salary")}>
        <div className="salary-section">
          <div className="salary-section__root-input">
            <RootData rootData={getRootData} />
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
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.monthlySalary}
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
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.bonusAmount}
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
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.otherAllowance}
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
              <Col></Col>
              <Col>
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalCR"
                  displayName={`${t("totalCreditAmount")}:`}
                  displayInfoClasses="green-text"
                  displayInfo="0"
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
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.pf}
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
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.professionalTax}
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
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.incomeTax}
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
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.otherDeductions}
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
              <Col></Col>
              <Col>
                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="totalDR"
                  displayName={`${t("totalDebitAmount")}:`}
                  displayInfoClasses="red-text"
                  displayInfo="0"
                />

                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="netPay"
                  displayName={`${t("netPay")}:`}
                  displayInfoClasses="green-text"
                  displayInfo="0"
                />
              </Col>
            </Row>
          </div>
          <div className="form-group salary-section__action-content">
            <button type="button" className="btn btn-success">
              {t("save")}
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={openModalWindow}
            >
              {t("delete")}
            </button>
          </div>
        </div>
      </MainLayout>
      <ModalWindow
        modalCustomClasses="salary-section__delete-modal"
        showModal={openModal}
        closeModal={closeModalWindow}
        modalTitle="Confirm Delete"
        modalBody="Are you sure you want to delete the salary information?"
        modalFooter={
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteSalaryData}
          >
            Confirm
          </button>
        }
      />
    </>
  );
};

export default Salary;
