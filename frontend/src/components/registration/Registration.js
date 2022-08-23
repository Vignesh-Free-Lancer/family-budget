import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { minAge, maxAge } from "../../utils/Utils";
import {
  userFieldOnSubmitValidation,
  userFieldOnChangeValidation,
} from "../../utils/ValidateFields";
import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";
import InputRadio from "../inputRadio/InputRadio";
import InputCheckbox from "../inputCheckbox/InputCheckbox";
import CustomDatepicker from "../customDatepicker/CustomDatepicker";

const Registration = ({ uploadedUserProdile }) => {
  const { t } = useTranslation();

  // State Object For Registration
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [userDob, setUserDob] = useState("");
  const [profileImageType, setProfileImageType] = useState("");
  const [profileImageUploadStatus, setProfileImageUploadStatus] = useState("");
  const [inputValidation, setInputValidation] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    pic: "",
    userStatus: true,
  });
  const [userErrors, setUserErrors] = useState({});

  // Handle Event For Password Show & Hide
  const handlePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // Handle Event For Confirm Password Show & Hide
  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // Handle The Date Field On Change Function
  const handleDobChange = (date) => {
    setUserDob(date);
    date === null
      ? (userErrors.dob = t("pleaseSelectDob"))
      : delete userErrors.dob;
  };

  // Handle User Status On Change Funciton
  const handleStatusChange = (e) => {
    const userDetail = { ...userData };
    userDetail[e.target.name] = e.target.checked;
    setUserData(userDetail);
    delete userErrors.userStatus;
  };

  // Function For Clear Profile Pic option
  const clearProfileOption = () => {
    const errors = { ...userErrors };
    delete errors.pic;
    setUserErrors(errors);
  };

  // Function For Uploaded Profile Image to Cloudinary Portal
  // After Uploaded to Cloudinary and then fetch the uploaded image url
  const uploadProfileImage = async (selectedImage) => {
    const errors = { ...userErrors };

    if (selectedImage && selectedImage !== undefined) {
      if (
        selectedImage.type === "image/jpeg" ||
        selectedImage.type === "image/png"
      ) {
        delete errors["pic"];
        setUserErrors(errors);
        setProfileImageUploadStatus(t("waitImageIsUploading"));
        setInputValidation(true);

        const data = new FormData();
        data.append("file", selectedImage);
        data.append("upload_preset", "house-budget");
        data.append("cloud_name", "silentkiller");

        fetch("https://api.cloudinary.com/v1_1/silentkiller/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            uploadedUserProdile(data.url.toString());
            const userDetail = { ...userData };
            userDetail.pic = data.url.toString();
            setUserData(userDetail);
            setProfileImageUploadStatus(t("imageUploadSuccess"));
            setInputValidation(false);
          })
          .catch((error) => {
            setProfileImageUploadStatus("");
            setInputValidation(false);
            const errors = { ...userErrors };
            errors["pic"] = t("imageUploadError");
            setUserErrors(errors);
            if (errors) return;
          });
      } else {
        setProfileImageUploadStatus("");

        errors["pic"] = t("uploadImageOnly");
        setUserErrors(errors);
      }
    } else {
      setProfileImageUploadStatus("");

      errors.pic = t("uploadProfilePicture");
      setUserErrors(errors);
    }
  };

  // Input onChange validate fields one by one
  const validateProperty = (input) => {
    if (input.name === "gender") {
      if (input.value.trim() === "") return t("pleaseSelectGender");
    }

    return userFieldOnChangeValidation(input, userData);
  };

  // Input change function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...userErrors };
    const errorMessages = validateProperty(input);

    if (errorMessages) errors[input.name] = errorMessages;
    else delete errors[input.name];

    setUserErrors(errors);

    const userDetails = { ...userData };
    userDetails[input.name] = input.value;
    setUserData(userDetails);
  };

  const validateInputFields = () => {
    const commonFieldValidation = userFieldOnSubmitValidation(
      "registration",
      userData,
      userDob
    );
    const errors = { ...commonFieldValidation };

    if (profileImageType === "") errors.pic = t("selectProfileOption");

    if (profileImageType === "new") {
      if (userErrors.pic === t("uploadImageOnly")) {
        errors.pic = t("uploadImageOnly");
      } else if (userData.pic === "") {
        errors.pic = t("uploadProfilePicture");
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Registration Submit Event
  const handleRegistration = (e) => {
    e.preventDefault();

    const errors = validateInputFields();
    setUserErrors(errors || {});
    if (errors) return;

    console.log("User Data", userData, userDob);
  };

  return (
    <Form
      className="budget-app__registration__form"
      onSubmit={handleRegistration}
    >
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <InputFormGroup inputLabel={t("username")} inputName="username">
            <InputText
              inputName="username"
              inputType="text"
              placeholderName={t("enterUsername")}
              inputErrorMessage={userErrors.username}
              inputChange={handleInputChange}
              inputValue={userData.username}
            />
          </InputFormGroup>

          <InputFormGroup inputLabel={t("emailAddress")} inputName="email">
            <InputText
              inputName="email"
              inputType="email"
              placeholderName={t("enterEmailAddress")}
              inputErrorMessage={userErrors.email}
              inputChange={handleInputChange}
              inputValue={userData.email}
            />
            <div className="input-hints expense-section__input-hints">
              <p>
                <span>{t("note")}:</span> {t("enterOriginalEmailAddress")}.
              </p>
            </div>
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
              inputErrorMessage={userErrors.gender}
              inputValue="Male"
              inputChange={handleInputChange}
              inputDataValue={userData.gender}
            />
            <InputRadio
              inputRadioType="form-check-inline"
              inputLabel={t("female")}
              inputName="gender"
              inputId="rdFemale"
              inputErrorMessage={userErrors.gender}
              inputValue="Female"
              inputChange={handleInputChange}
              inputDataValue={userData.gender}
            />
            <div
              className="invalid-feedback"
              style={{ display: userErrors.gender ? "block" : "none" }}
            >
              {userErrors.gender}
            </div>
          </InputFormGroup>

          <InputFormGroup inputLabel={t("dob")} inputName="dob">
            <CustomDatepicker
              customDatepickerClassname={`form-control ${
                userErrors.dob ? "is-invalid" : ""
              }`}
              customDateChange={handleDobChange}
              customdateName="dob"
              customDatePlaceholder={t("pleaseSelectDOB")}
              customMinDateRange={minAge}
              customMaxDateRange={maxAge}
            />
            <div
              className="invalid-feedback"
              style={{ display: userErrors.dob ? "block" : "none" }}
            >
              {userErrors.dob}
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
              inputValue={userData.userStatus}
              inputChange={handleStatusChange}
              inputDisabled={true}
            />
            <div
              className="invalid-feedback"
              style={{
                display: userErrors.userStatus ? "inline-block" : "none",
              }}
            >
              {userErrors.isActive}
            </div>
          </InputFormGroup>

          <InputFormGroup
            inputLabel={t("selectProfileImage")}
            inputName="email"
            inputCustomClasses="mb-3 budget-app__registration__form__profile-type"
          >
            <ul>
              <li
                className={`${profileImageType === "default" ? "active" : ""}`}
              >
                <Button
                  onClick={() => {
                    clearProfileOption();
                    setProfileImageType("default");
                  }}
                >
                  {t("default")}
                </Button>
              </li>
              <li className={`${profileImageType === "new" ? "active" : ""}`}>
                <Button
                  onClick={() => {
                    clearProfileOption();
                    setProfileImageType("new");
                  }}
                >
                  {t("custom")}
                </Button>
              </li>
            </ul>

            {profileImageType === "new" && (
              <>
                <div className="budget-app__registration__form__profile-type-upload-ctrl mt-3">
                  <input
                    className="form-control"
                    type="file"
                    id="userImage"
                    name="userImage"
                    onChange={(e) => uploadProfileImage(e.target.files[0])}
                  />
                </div>
                <div className="budget-app__registration__form__profile-type-upload-status">
                  {profileImageUploadStatus}
                </div>
              </>
            )}
            <span className="budget-app__registration__form__profile-option">
              {userErrors.pic}
            </span>
          </InputFormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-group budget-app__registration__form__register-btn text-right">
            <button type="submit" className="btn" disabled={inputValidation}>
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
