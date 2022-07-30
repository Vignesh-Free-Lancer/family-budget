import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./salary.scss";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import RootData from "../../components/rootData/RootData";
import Accordion from "../../components/accordion/Accordion";
import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import DisplayInformation from "../../components/displayInformation/DisplayInformation";
import ModalWindow from "../../components/modalWindow/ModalWindow";

const Salary = () => {
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
      <MainLayout title="Salary">
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
                  accordTitle="Salary Credit Details"
                >
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <InputFormGroup
                        inputLabel="Monthly Salary"
                        inputName="monthlySalary"
                      >
                        <InputText
                          inputName="monthlySalary"
                          inputType="text"
                          placeholderName="Enter monthly salary"
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.monthlySalary}
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.monthlySalary}
                        />
                        <div className="input-hints">
                          <p>
                            <span>Note:</span> Enter your total earning salary
                            amount without any deduction and except bonus &
                            extra other amounts.
                          </p>
                        </div>
                      </InputFormGroup>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <InputFormGroup
                        inputLabel="Bonus Amount"
                        inputName="bonusAmount"
                      >
                        <InputText
                          inputName="bonusAmount"
                          inputType="text"
                          placeholderName="Enter bonus amount"
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.bonusAmount}
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.bonusAmount}
                        />
                      </InputFormGroup>

                      <InputFormGroup
                        inputLabel="Other Allowance"
                        inputName="otherAllowance"
                      >
                        <InputText
                          inputName="otherAllowance"
                          inputType="text"
                          placeholderName="Enter other allowance"
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.otherAllowance}
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.otherAllowance}
                        />
                        <div className="input-hints">
                          <p>
                            <span>Note:</span> Enter your all other extra
                            allowance except your monthly salary & bonus.
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
                  displayName="Total Credit Amount:"
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
                  accordTitle="Salary Debit Details"
                >
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                      <InputFormGroup inputLabel="PF" inputName="pf">
                        <InputText
                          inputName="pf"
                          inputType="text"
                          placeholderName="Enter PF amount"
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.pf}
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.pf}
                        />
                      </InputFormGroup>

                      <InputFormGroup
                        inputLabel="Professional Tax"
                        inputName="professionalTax"
                      >
                        <InputText
                          inputName="professionalTax"
                          inputType="text"
                          placeholderName="Enter professional tax amount"
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
                        inputLabel="Income Tax"
                        inputName="incomeTax"
                      >
                        <InputText
                          inputName="incomeTax"
                          inputType="text"
                          placeholderName="Enter income tax amount"
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.incomeTax}
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.incomeTax}
                        />
                      </InputFormGroup>

                      <InputFormGroup
                        inputLabel="Other Deductoins"
                        inputName="otherDeductions"
                      >
                        <InputText
                          inputName="otherDeductions"
                          inputType="text"
                          placeholderName="Enter other deduction amount"
                          inputAlignment="right"
                          inputErrorMessage={salaryErrors.otherDeductions}
                          // inputChange={handleInputChange}
                          // inputBlur={resetDefaultValue}
                          // inputFocus={resetInput}
                          // inputValue={salaryDetails.otherDeductions}
                        />
                        <div className="input-hints">
                          <p>
                            <span>Note:</span> Enter your all deduction amount
                            except pf, income-tax & professional-tax.
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
                  displayName="Total Debit Amount:"
                  displayInfoClasses="red-text"
                  displayInfo="0"
                />

                <DisplayInformation
                  customClasses="text-right"
                  displayLabel="netPay"
                  displayName="Net Pay:"
                  displayInfoClasses="green-text"
                  displayInfo="0"
                />
              </Col>
            </Row>
          </div>
          <div className="form-group salary-section__action-content">
            <button type="button" className="btn btn-success">
              Save
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={openModalWindow}
            >
              Delete
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
