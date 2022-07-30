import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";

const Login = () => {
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
      <h3>Sign In</h3>
      <Form className="budget-app__login__form" onSubmit={handleSignIn}>
        <InputFormGroup inputLabel="Email Address" inputName="email">
          <InputText
            inputName="email"
            inputType="email"
            placeholderName="Enter email address"
            inputErrorMessage=""
            // inputChange={handleInputChange}
          />
        </InputFormGroup>
        <InputFormGroup inputLabel="Password" inputName="password">
          <InputText
            inputName="password"
            inputType={passwordShown ? "type" : "password"}
            inputClassName="password-control"
            placeholderName="Enter password"
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
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary budget-app__login__form__sign-in-btn"
          >
            Sign In
          </button>
        </div>
        <div className="form-group budget-app__login__form__new-account text-center">
          Don't have an account? <Link to="/registration">Register</Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
