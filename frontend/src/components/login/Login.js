import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";

const Login = () => {
  const { t } = useTranslation();

  // Get Router Navigation From Router-DOM
  const navigate = useNavigate();

  // State Object For Password Icon Show & Hide
  const [passwordShown, setPasswordShown] = useState(false);

  // Handle Event For Password Show & Hide
  const handlePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    navigate(`/dashboard`);
  };

  return (
    <>
      <h3>{t("signIn")}</h3>
      <Form className="budget-app__login__form" onSubmit={handleSignIn}>
        <InputFormGroup inputLabel={t("emailAddress")} inputName="email">
          <InputText
            inputName="email"
            inputType="email"
            placeholderName={t("enterEmailAddress")}
            inputErrorMessage=""
            // inputChange={handleInputChange}
          />
        </InputFormGroup>
        <InputFormGroup inputLabel={t("password")} inputName="password">
          <InputText
            inputName="password"
            inputType={passwordShown ? "type" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterPassword")}
            inputErrorMessage=""
            // inputChange={handleInputChange}
          />
          <span
            className={`password-icon ${
              passwordShown ? "show-password" : "hide-password"
            }`}
            onClick={handlePasswordVisibility}
          ></span>
        </InputFormGroup>
        <div className="form-group text-right budget-app__login__form__forgot-password">
          <Link to="/forgot-password">{t("forgotPassword")}?</Link>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary budget-app__login__form__sign-in-btn"
          >
            {t("signIn")}
          </button>
        </div>
        <div className="form-group budget-app__login__form__new-account text-center">
          {t("haveNoAccount")}? <Link to="/registration">{t("register")}</Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
