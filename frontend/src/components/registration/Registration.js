import React, { lazy, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { minAge, maxAge } from "../../utils/Utils";

const InputFormGroup = lazy(() => import("../inputFormGroup/InputFormGroup"));
const InputText = lazy(() => import("../inputText/InputText"));
const InputRadio = lazy(() => import("../inputRadio/InputRadio"));
const InputCheckbox = lazy(() => import("../inputCheckbox/InputCheckbox"));
const CustomDatepicker = lazy(() =>
  import("../customDatepicker/CustomDatepicker")
);

const Registration = () => {
  const { t } = useTranslation();

  // State Object For DOB Field
  const [userDob, setUserDob] = useState("");

  // Handle The Date Field On Change Function
  const handleDobChange = (date) => {
    console.log("User Dob", date);
    setUserDob(date);
    // date === null
    //   ? (userErrors.dob = "Please select dob")
    //   : delete userErrors.dob;
  };

  // State Object For Password Icon Show & Hide
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  // Handle Event For Password Show & Hide
  const handlePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // Handle Event For Confirm Password Show & Hide
  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // State Object Profile Image Upload Option
  const [profileImage, setProfileImage] = useState("default");

  return (
    <Form className="budget-app__registration__form">
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <InputFormGroup inputLabel={t("username")} inputName="userName">
            <InputText
              inputName="userName"
              inputType="text"
              placeholderName={t("enterUsername")}
              inputErrorMessage=""
              //   inputChange={handleInputChange}
              //   inputValue={userData.userName}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("emailAddress")} inputName="email">
            <InputText
              inputName="email"
              inputType="email"
              placeholderName={t("enterEmailAddress")}
              inputErrorMessage=""
              //   inputChange={handleInputChange}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("password")} inputName="password">
            <InputText
              inputName="password"
              inputType={passwordShown ? "type" : "password"}
              inputClassName="password-control"
              placeholderName={t("enterPassword")}
              inputErrorMessage=""
              //   inputChange={handleInputChange}
            />
            <span
              className={`password-icon ${
                passwordShown ? "show-password" : "hide-password"
              }`}
              onClick={handlePasswordVisibility}
            ></span>
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
              inputErrorMessage=""
              //   inputChange={handleInputChange}
            />
            <span
              className={`password-icon ${
                confirmPasswordShown ? "show-password" : "hide-password"
              }`}
              onClick={handleConfirmPasswordVisibility}
            ></span>
          </InputFormGroup>

          <InputFormGroup inputLabel={t("gender")} inputName="gender">
            <InputRadio
              inputRadioType="form-check-inline"
              inputLabel={t("male")}
              inputName="gender"
              inputId="rdMale"
              inputErrorMessage=""
              inputValue="Male"
              //   inputChange={handleInputChange}
              //   inputDataValue={userData.gender}
            />
            <InputRadio
              inputRadioType="form-check-inline"
              inputLabel={t("female")}
              inputName="gender"
              inputId="rdFemale"
              inputErrorMessage=""
              inputValue="Female"
              //   inputChange={handleInputChange}
              //   inputDataValue={userData.gender}
            />
            {/* <div
              className="invalid-feedback"
              style={{ display: userErrors.gender ? "block" : "none" }}
            >
              {userErrors.gender}
            </div> */}
          </InputFormGroup>

          <InputFormGroup inputLabel={t("dob")} inputName="dob">
            <CustomDatepicker
              customDateChange={handleDobChange}
              customdateName="dob"
              customDatePlaceholder={t("pleaseSelectDOB")}
              customMinDateRange={minAge}
              customMaxDateRange={maxAge}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={t("selectProfileImage")}
            inputName="email"
            inputCustomClasses="mb-3 budget-app__registration__form__profile-type"
          >
            <ul>
              <li className={`${profileImage === "default" ? "active" : ""}`}>
                <Button
                  onClick={() => {
                    setProfileImage("default");
                  }}
                >
                  {t("default")}
                </Button>
              </li>
              <li className={`${profileImage === "new" ? "active" : ""}`}>
                <Button
                  onClick={() => {
                    setProfileImage("new");
                  }}
                >
                  {t("custom")}
                </Button>
              </li>
            </ul>

            <div
              className="mt-3"
              style={{
                display: profileImage === "new" ? "block" : "none",
              }}
            >
              <div className="upload-img-sec mt-3">
                <input
                  className="form-control"
                  type="file"
                  id="userImage"
                  name="userImage"
                  // onChange={(e) => fileUploadChange(e.target.files[0])}
                />
              </div>
            </div>
          </InputFormGroup>

          <InputFormGroup
            inputLabel={t("userStatus")}
            inputName="isActive"
            inputCustomClasses="budget-app__registration__form__custom-user-status mb-3"
          >
            <InputCheckbox
              inputCheckboxType="form-switch user-status"
              inputName="isActive"
              inputId="chkUserStatus"
              inputErrorMessage=""
              //   inputValue={userData.isActive}
              //   inputChange={handleStatusChange}
              inputDisabled={true}
            />
            {/* <div
              className="invalid-feedback"
              style={{
                display: userErrors.isActive ? "inline-block" : "none",
              }}
            >
              {userErrors.isActive}
            </div> */}
          </InputFormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-group budget-app__registration__form__register-btn text-right">
            <button type="submit" className="btn ">
              {t("register")}
            </button>
          </div>
          <div className="form-group budget-app__registration__form__login-link text-right">
            {t("haveAnAccount")}?<Link to="/login"> {t("login")}</Link>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Registration;
