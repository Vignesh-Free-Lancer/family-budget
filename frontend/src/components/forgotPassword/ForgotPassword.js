import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  userFieldOnSubmitValidation,
  userFieldOnChangeValidation,
} from "../../utils/ValidateFields";
import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";

const ForgotPassword = () => {
  const { t } = useTranslation();

  // State Object For Login
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userErrors, setUserErrors] = useState({});

  // Handle Event For Password Show & Hide
  const handleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  // Handle Event For Confirm Password Show & Hide
  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // Input change function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...userErrors };
    const errorMessages = userFieldOnChangeValidation(input, userData);

    if (errorMessages) errors[input.name] = errorMessages;
    else delete errors[input.name];

    setUserErrors(errors);

    const userDetails = { ...userData };
    userDetails[input.name] = input.value;
    setUserData(userDetails);
  };

  // Event For Forgot Password Function
  const handleForgotpassword = (e) => {
    e.preventDefault();

    const errors = userFieldOnSubmitValidation("forgot-password", userData);
    setUserErrors(errors || {});
    if (errors) return;

    console.log("User Data", userData);
  };

  return (
    <>
      <h3>{t("forgotPassword")}</h3>
      <Form
        className="budget-app__forgot-password__form"
        onSubmit={handleForgotpassword}
      >
        <InputFormGroup inputLabel={t("emailAddress")} inputName="email">
          <InputText
            inputName="email"
            inputType="email"
            placeholderName={t("enterEmailAddress")}
            inputErrorMessage={userErrors.email}
            inputChange={handleInputChange}
            inputValue={userData.email}
          />
        </InputFormGroup>

        <InputFormGroup inputLabel={t("newPassword")} inputName="password">
          <InputText
            inputName="password"
            inputType={newPasswordShown ? "text" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterNewPassword")}
            inputErrorMessage={userErrors.password}
            inputChange={handleInputChange}
            inputValue={userData.password}
          />
          <div
            className={`password-icon ${
              newPasswordShown ? "show-password" : "hide-password"
            }`}
            onClick={handleNewPasswordVisibility}
          ></div>
        </InputFormGroup>

        <InputFormGroup
          inputLabel={t("confirmPassword")}
          inputName="confirmPassword"
        >
          <InputText
            inputName="confirmPassword"
            inputType={confirmPasswordShown ? "text" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterConfirmPassword")}
            inputErrorMessage={userErrors.confirmPassword}
            inputChange={handleInputChange}
            inputValue={userData.confirmPassword}
          />
          <div
            className={`password-icon ${
              confirmPasswordShown ? "show-password" : "hide-password"
            }`}
            onClick={handleConfirmPasswordVisibility}
          ></div>
        </InputFormGroup>

        <div className="form-group">
          <button type="submit" className="btn">
            {t("forgotPassword")}
          </button>
        </div>
        <div className="form-group budget-app__forgot-password__form__back-to-login text-center">
          {t("backToLogin")}? <Link to="/login">{t("login")}</Link>
        </div>
      </Form>
    </>
  );
};

export default ForgotPassword;
