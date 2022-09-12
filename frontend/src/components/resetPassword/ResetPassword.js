import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  userFieldOnChangeValidation,
  userFieldOnSubmitValidation,
} from "../../utils/ValidateFields";
import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";
import { userResetPasswordAction } from "../../redux/actions/UserActions";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get user id from url
  const { userId } = useParams();

  // Get forgot password state from redux store
  const userCredential = useSelector((state) => state.userResetPassword);
  const {
    loading: resetPageLoading,
    error: resetPageError,
    userResetPassword,
  } = userCredential;

  // Show notification to user
  const { addToast } = useToasts();
  // Toast notfication
  useEffect(() => {
    if (resetPageError) addToast(resetPageError, { appearance: "error" });
    if (userResetPassword && userResetPassword.message)
      addToast(userResetPassword.message, { appearance: "success" });

    return () => {
      delete userCredential.error;
      delete userCredential.userResetPassword;
    };
  }, [userCredential, userResetPassword, resetPageError, addToast]);

  // State Object For Reset Password
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [userData, setUserData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [userErrors, setUserErrors] = useState({});

  // Handle Event For Old Password Show & Hide
  const handleOldPasswordVisibility = () => {
    setOldPasswordShown(!oldPasswordShown);
  };

  // Handle Event For New Password Show & Hide
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

  // Event For Reset Password Function
  const handleResetpassword = (e) => {
    e.preventDefault();

    const errors = userFieldOnSubmitValidation("reset-password", userData);
    setUserErrors(errors || {});
    if (errors) return;

    dispatch(
      userResetPasswordAction(
        userId,
        userData.oldPassword,
        userData.newPassword
      )
    );

    resetInputFields();
  };

  // Cleare all the state values after success
  const resetInputFields = () => {
    const userInfos = { ...userData };
    userInfos.oldPassword = "";
    userInfos.newPassword = "";
    userInfos.confirmNewPassword = "";
    setUserData(userInfos);
  };

  return (
    <>
      {resetPageLoading && <Loading />}

      <h3>{t("resetPassword")}</h3>
      <Form
        className="budget-app__forgot-password__form"
        onSubmit={handleResetpassword}
      >
        <InputFormGroup inputLabel={t("oldPassword")} inputName="oldPassword">
          <InputText
            inputName="oldPassword"
            inputType={oldPasswordShown ? "text" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterOldPassword")}
            inputErrorMessage={userErrors.oldPassword}
            inputChange={handleInputChange}
            inputValue={userData.oldPassword}
          />
          <div
            className={`password-icon ${
              oldPasswordShown ? "show-password" : "hide-password"
            }`}
            onClick={handleOldPasswordVisibility}
          ></div>
        </InputFormGroup>

        <InputFormGroup inputLabel={t("newPassword")} inputName="newPassword">
          <InputText
            inputName="newPassword"
            inputType={newPasswordShown ? "text" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterNewPassword")}
            inputErrorMessage={userErrors.newPassword}
            inputChange={handleInputChange}
            inputValue={userData.newPassword}
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
          inputName="confirmNewPassword"
        >
          <InputText
            inputName="confirmNewPassword"
            inputType={confirmPasswordShown ? "text" : "password"}
            inputClassName="password-control"
            placeholderName={t("enterConfirmPassword")}
            inputErrorMessage={userErrors.confirmNewPassword}
            inputChange={handleInputChange}
            inputValue={userData.confirmNewPassword}
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
            {t("resetPassword")}
          </button>
        </div>
      </Form>
    </>
  );
};

export default ResetPassword;
