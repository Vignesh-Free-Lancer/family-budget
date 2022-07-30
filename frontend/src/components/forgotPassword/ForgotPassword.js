import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";

const ForgotPassword = () => {
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
      <h3>Reset Password</h3>
      <Form className="budget-app__forgot-password__form">
        <InputFormGroup inputLabel="Email Address" inputName="email">
          <InputText
            inputName="email"
            inputType="email"
            placeholderName="Enter email address"
            inputErrorMessage=""
            // inputChange={handleInputChange}
            // inputValue={userCredential.email}
          />
        </InputFormGroup>

        <InputFormGroup inputLabel="New Password" inputName="newPassword">
          <InputText
            inputName="newPassword"
            inputType={newPasswordShown ? "type" : "password"}
            inputClassName="password-control"
            placeholderName="Enter new password"
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
          inputLabel="Confirm Password"
          inputName="confirmPassword"
        >
          <InputText
            inputName="confirmPassword"
            inputType={confirmPasswordShown ? "type" : "password"}
            inputClassName="password-control"
            placeholderName="Enter confirm password"
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
            Reset Password
          </button>
        </div>
        <div className="form-group budget-app__forgot-password__form__back-to-login text-center">
          Back to login? <Link to="/login">Login</Link>
        </div>
      </Form>
    </>
  );
};

export default ForgotPassword;
