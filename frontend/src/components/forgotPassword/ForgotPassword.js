import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";

const ForgotPassword = () => {
  const { t } = useTranslation();

  // State Object For Password Icon Show & Hide
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  // Handle Event For Password Show & Hide
  const handleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <>
      <h3>{t("forgotPassword")}</h3>
      <Form className="budget-app__forgot-password__form">
        <InputFormGroup inputLabel={t("emailAddress")} inputName="email">
          <InputText
            inputName="email"
            inputType="email"
            placeholderName={t("enterEmailAddress")}
            inputErrorMessage=""
            // inputChange={handleInputChange}
            // inputValue={userCredential.email}
          />
        </InputFormGroup>

        <InputFormGroup inputLabel={t("newPassword")} inputName="newPassword">
          <InputText
            inputName="newPassword"
            inputType={newPasswordShown ? "type" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterNewPassword")}
            // inputErrorMessage={userErrors.newPassword}
            // inputChange={handleInputChange}
            // inputValue={userCredential.newPassword}
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
            inputType={confirmPasswordShown ? "type" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterConfirmPassword")}
            // inputErrorMessage={userErrors.confirmPassword}
            // inputChange={handleInputChange}
            // inputValue={userCredential.confirmPassword}
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
