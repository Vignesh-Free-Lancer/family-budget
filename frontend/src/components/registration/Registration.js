import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { minAge, maxAge, emailValidation } from "../../utils/Utils";
import {
  userFieldOnSubmitValidation,
  userFieldOnChangeValidation,
} from "../../utils/ValidateFields";
import InputFormGroup from "../inputFormGroup/InputFormGroup";
import InputText from "../inputText/InputText";
import InputRadio from "../inputRadio/InputRadio";
import InputCheckbox from "../inputCheckbox/InputCheckbox";
import CustomDatepicker from "../customDatepicker/CustomDatepicker";
import ModalWindow from "../../components/modalWindow/ModalWindow";
import {
  userRegistrationAction,
  userAccountActivationAction,
  userUpdateAction,
  userTopLevelDeleteAction,
} from "../../redux/actions/UserActions";
import Loading from "../loading/Loading";

const Registration = ({ uploadedUserProfile }) => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get user id from url
  const { userId } = useParams();

  // Get user registration data from redux store
  const userInfos = useSelector((state) => state.userRecords);
  const {
    loading: registrationLoading,
    error: registrationError,
    userDatas,
  } = userInfos;

  // If user registered successfully, redirect to user email validation page
  useEffect(() => {
    if (userDatas && !userDatas.isEmailVerified) {
      navigate(`/account/confirmation/${userDatas.email}`);
    }
  }, [userDatas, navigate]);

  // Show user registration notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (registrationError)
      addToast(registrationError, {
        appearance: "error",
        autoDismissTimeout: "6000",
      });

    return () => {
      delete userInfos.error;
    };
  }, [userInfos, registrationError, addToast]);

  // Get user account activation data from redux store
  const userAccountActivationResponse = useSelector(
    (state) => state.userAccountActivation
  );
  const {
    loading: activationLoading,
    error: activationError,
    userAccountActivation,
  } = userAccountActivationResponse;

  // Show user account activation notification to user
  useEffect(() => {
    if (activationError)
      addToast(activationError, {
        appearance: "error",
        autoDismissTimeout: "6000",
      });

    if (userAccountActivation && userAccountActivation.message)
      addToast(userAccountActivation.message, { appearance: "success" });

    return () => {
      delete userAccountActivationResponse.error;
      delete userAccountActivationResponse.userAccountActivation;
    };
  }, [
    userAccountActivationResponse,
    activationError,
    userAccountActivation,
    addToast,
  ]);

  // Get user updated data from redux store
  const userUpdatedResponse = useSelector((state) => state.userUpdatedData);
  const {
    loading: updateLoading,
    error: updateError,
    updatedUser,
  } = userUpdatedResponse;

  // Show user updated notification to user
  useEffect(() => {
    if (updateError)
      addToast(updateError, {
        appearance: "error",
        autoDismissTimeout: "6000",
      });

    if (updatedUser && updatedUser.message)
      addToast(updatedUser.message, { appearance: "success" });

    return () => {
      delete userUpdatedResponse.error;
      delete userUpdatedResponse.updatedUser;
    };
  }, [userUpdatedResponse, updateError, updatedUser, addToast]);

  // State object for Registration Form
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [userDob, setUserDob] = useState("");
  const [profileImageType, setProfileImageType] = useState("");
  const [profileImageUploadStatus, setProfileImageUploadStatus] = useState("");
  const imageInputRef = useRef();
  const [inputValidation, setInputValidation] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    isActive: true,
  });
  // State object for Registration Form Error
  const [userErrors, setUserErrors] = useState({});

  //State Object for account activation
  const [activationEmail, setActivationEmail] = useState("");
  // State object for Account Activation Form Error
  const [userAccountErrors, setUserAccountErrors] = useState("");

  // State Object For Delete Modal Window
  const [openModal, setOpenModal] = useState(false);

  // Show The Delete Modal Window Screen
  const openModalWindow = () => {
    setOpenModal(true);
  };

  // Close The Delete Modal Window Screen
  const closeModalWindow = () => {
    setOpenModal(false);
  };

  // State object for account activation modal window
  const [accountModal, setAccountModal] = useState(false);

  // Show The Account  Modal Window Screen
  const openAccountModalWindow = () => {
    setActivationEmail("");
    setUserAccountErrors("");
    setAccountModal(true);
  };

  // Close The Account  Modal Window Screen
  const closeAccountModalWindow = () => {
    setAccountModal(false);
  };

  // Get existing user by id
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile/${userId}`);
      setUserData(data.user);
      uploadedUserProfile(data.user.pic);
      setUserDob(new Date(data.user.dob));
    };
    if (userId) fetchUser();
  }, [userId, updatedUser]);

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
    delete userErrors.isActive;
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
            uploadedUserProfile(data.url.toString());
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

      if (!userId) {
        errors.pic = t("uploadProfilePicture");
        setUserErrors(errors);
      } else {
        errors.pic = "";
        setUserErrors(errors);
      }
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

  // Validate user fields on submit
  const validateInputFields = () => {
    const commonFieldValidation = userFieldOnSubmitValidation(
      "registration",
      userData,
      userDob
    );
    const errors = { ...commonFieldValidation };

    if (!userId) {
      if (profileImageType === "") errors.pic = t("selectProfileOption");

      if (profileImageType === "new") {
        if (userErrors.pic === t("uploadImageOnly")) {
          errors.pic = t("uploadImageOnly");
        } else if (userData.pic === "") {
          errors.pic = t("uploadProfilePicture");
        }
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // User registration save & update event
  const handleRegistration = (e) => {
    e.preventDefault();

    const errors = validateInputFields();
    setUserErrors(errors || {});
    if (errors) return;

    setProfileImageUploadStatus("");
    if (imageInputRef.current !== undefined) {
      imageInputRef.current.value = "";
    }

    if (!userId) {
      dispatch(
        userRegistrationAction(
          userData.username,
          userData.email,
          userData.password,
          userData.gender,
          userDob,
          userData.pic
        )
      );
    } else {
      dispatch(
        userUpdateAction(
          userId,
          userData.username,
          userData.email,
          userData.gender,
          userDob,
          userData.pic,
          userData.isActive
        )
      );
    }
  };

  // Delete user information data
  const handleDeleteUser = (e) => {
    e.preventDefault();

    // Close delete modal pop-up window
    setOpenModal(false);

    // dispatch(userDeleteAction(userId));
    dispatch(userTopLevelDeleteAction(userId));

    if (userData.isAdmin) {
      navigate("/user/list");
    } else {
      navigate("/thanks/page");
    }
  };

  // Account Activation Input change function
  const handleAccountInputChange = ({ currentTarget: input }) => {
    let error = "";

    if (input.name === "email") {
      if (input.value.trim() === "") error = t("pleaseEnterEmail");
      if (input.value.trim() !== "") error = emailValidation(input.value);
    }

    setUserAccountErrors(error);
    setActivationEmail(input.value);
  };

  // Activate user account
  const handleActivateAccount = (e) => {
    e.preventDefault();

    let error = "";
    if (activationEmail.trim() === "") error = t("pleaseEnterEmail");
    setUserAccountErrors(error);
    if (error) return;

    // Close account modal pop-up window
    setAccountModal(false);

    dispatch(userAccountActivationAction(activationEmail));
  };

  return (
    <>
      {registrationLoading && <Loading />}
      {activationLoading && <Loading />}
      {updateLoading && <Loading />}
      <Form className="budget-app__registration__form">
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
                inputDisableOption={userId}
              />
              {!userId && (
                <div className="input-hints expense-section__input-hints">
                  <p>
                    <span>{t("note")}:</span> {t("enterOriginalEmailAddress")}.
                  </p>
                </div>
              )}
            </InputFormGroup>

            {!userId && (
              <>
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
              </>
            )}

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
                customdateName="dob"
                customDatePlaceholder={t("pleaseSelectDOB")}
                customDateValue={userDob}
                customDateChange={handleDobChange}
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
                inputValue={userData.isActive}
                inputChange={handleStatusChange}
                inputDisabled={true}
              />
              <div
                className="invalid-feedback"
                style={{
                  display: userErrors.isActive ? "inline-block" : "none",
                }}
              >
                {userErrors.isActive}
              </div>
            </InputFormGroup>

            {!userId ? (
              <InputFormGroup
                inputLabel={t("selectProfileImage")}
                inputName="uploadImage"
                inputCustomClasses="mb-3 budget-app__registration__form__profile-type"
              >
                <ul>
                  <li
                    className={`${
                      profileImageType === "default" ? "active" : ""
                    }`}
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
                  <li
                    className={`${profileImageType === "new" ? "active" : ""}`}
                  >
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
            ) : (
              <InputFormGroup
                inputLabel={t("uploadProfile")}
                inputName="uploadImage"
                inputCustomClasses="mb-3 budget-app__registration__form__profile-type"
              >
                <div className="budget-app__registration__form__profile-type-upload-ctrl">
                  <input
                    className="form-control"
                    type="file"
                    id="userImage"
                    name="userImage"
                    onChange={(e) => uploadProfileImage(e.target.files[0])}
                    ref={imageInputRef}
                  />
                </div>
                <div className="budget-app__registration__form__profile-type-upload-status">
                  {profileImageUploadStatus}
                </div>
                <span className="budget-app__registration__form__profile-option">
                  {userErrors.pic}
                </span>
              </InputFormGroup>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group budget-app__registration__form__btn-section text-right">
              <button
                type="submit"
                className={`btn ${!userId ? "btn-register" : "btn-success"}`}
                disabled={inputValidation}
                onClick={handleRegistration}
              >
                {userId ? t("update") : t("register")}
              </button>
              {userId && (
                <button
                  type="button"
                  className="btn btn-danger ms-3"
                  disabled={inputValidation}
                  onClick={openModalWindow}
                >
                  {t("removeAccount")}
                </button>
              )}
            </div>
            {!userId && (
              <>
                <div className="form-group budget-app__registration__form__login-link text-right">
                  {t("haveAnAccount")}?<Link to="/login"> {t("login")}</Link>
                </div>
                <div className="form-group budget-app__registration__form__activate-link text-right">
                  {t("doYouWantToActivate")}?
                  <span onClick={openAccountModalWindow}> {t("here")}</span>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Form>
      <ModalWindow
        modalCustomClasses="salary-section__delete-modal"
        showModal={!userId ? accountModal : openModal}
        closeModal={!userId ? closeAccountModalWindow : closeModalWindow}
        modalTitle={!userId ? t("activateAccount") : t("confirmDelete")}
        modalBody={
          !userId ? (
            <>
              <InputFormGroup inputLabel={t("emailAddress")} inputName="email">
                <InputText
                  inputName="email"
                  inputType="email"
                  placeholderName={t("enterEmailAddress")}
                  inputErrorMessage={userAccountErrors}
                  inputChange={handleAccountInputChange}
                  inputValue={activationEmail}
                />
                {!userId && (
                  <div className="input-hints expense-section__input-hints">
                    <p>
                      <span>{t("note")}:</span> {t("enterOriginalEmailAddress")}
                      .
                    </p>
                  </div>
                )}
              </InputFormGroup>
            </>
          ) : (
            `${t("areYouSureDelete")} ${t("userDelete")} ${userData.username}?`
          )
        }
        modalFooter={
          !userId ? (
            <button
              type="button"
              className="btn btn-info"
              onClick={handleActivateAccount}
            >
              {t("activate")}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteUser}
            >
              {t("confirm")}
            </button>
          )
        }
      />
    </>
  );
};

export default Registration;
