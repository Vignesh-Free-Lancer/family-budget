import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  userFieldOnSubmitValidation,
  userFieldOnChangeValidation,
} from "../../utils/ValidateFields";
import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";
import { userLoginAction } from "../../redux/actions/UserActions";
import Loading from "../loading/Loading";

const Login = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Check user login credential from redux store
  const userDetails = useSelector((state) => state.userLogin, shallowEqual);
  const { loading: loginLoading, error: loginError, userInfos } = userDetails;

  // If user logged in successfully, redirect to dashboard page
  useEffect(() => {
    if (userInfos) {
      navigate("/dashboard");
    }
  }, [navigate, userInfos]);

  // Show notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (loginError)
      addToast(loginError, { appearance: "error", autoDismissTimeout: "6000" });

    return () => {
      delete userDetails.error;
    };
  }, [userDetails, loginError, addToast]);

  // State object for login form
  const [passwordShown, setPasswordShown] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // State object for login form Error
  const [userErrors, setUserErrors] = useState({});

  // Handle Event For Password Show & Hide
  const handlePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // Input change function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...userErrors };
    const errorMessages = userFieldOnChangeValidation(input, {}, true);

    if (errorMessages) errors[input.name] = errorMessages;
    else delete errors[input.name];

    setUserErrors(errors);

    const userDetails = { ...userData };
    userDetails[input.name] = input.value;
    setUserData(userDetails);
  };

  // Event For SigIn Function
  const handleSignIn = (e) => {
    e.preventDefault();

    const errors = userFieldOnSubmitValidation("login", userData);
    setUserErrors(errors || {});
    if (errors) return;

    dispatch(userLoginAction(userData.email, userData.password));
  };

  return (
    <>
      {loginLoading && <Loading />}

      <h3>{t("signIn")}</h3>
      <Form className="budget-app__login__form" onSubmit={handleSignIn}>
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
        <InputFormGroup inputLabel={t("password")} inputName="password">
          <InputText
            inputName="password"
            inputType={passwordShown ? "text" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterPassword")}
            inputErrorMessage={userErrors.password}
            inputChange={handleInputChange}
            inputValue={userData.password}
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
