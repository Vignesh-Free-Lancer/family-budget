import React, { useEffect, useState } from "react";
import "./reset-email.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { emailValidation } from "../../utils/Utils";
import InputFormGroup from "../../components/inputFormGroup/InputFormGroup";
import InputText from "../../components/inputText/InputText";
import { userTopLevelEmailAction } from "../../redux/actions/UserActions";
import Loading from "../../components/loading/Loading";

const ResetEmailAddress = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get user id from url
  const { userId } = useParams();

  // Get logged in user data from redux store
  const userDetails = useSelector((state) => state.userLogin);
  const { userInfos } = userDetails;

  // Get forgot password state from redux store
  const userEmailResponse = useSelector((state) => state.userResetEmail);
  const {
    loading: emailPageLoading,
    error: emailPageError,
    userResetEmail,
  } = userEmailResponse;

  // If user email modified successfully, redirect to user email validation page
  useEffect(() => {
    if (userResetEmail && !userResetEmail.isEmailVerified) {
      navigate(`/account/confirmation/${userResetEmail.email}`);
    }
  }, [userResetEmail, navigate]);

  // Show notification to user
  const { addToast } = useToasts();
  // Error toast notfication
  useEffect(() => {
    if (emailPageError) addToast(emailPageError, { appearance: "error" });

    return () => {
      delete userEmailResponse.error;
    };
  }, [userEmailResponse, emailPageError, addToast]);

  // State object for reset-email address
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Input change function
  const handleInputChange = ({ currentTarget: input }) => {
    let error = "";

    if (input.name === "email") {
      if (input.value.trim() === "") error = t("pleaseEnterEmail");
      if (input.value.trim() !== "") error = emailValidation(input.value);
    }

    setEmailError(error);
    setUserEmail(input.value);
  };

  // Handle email change event
  const handleEmailModification = (e) => {
    e.preventDefault();

    let error = "";
    if (userEmail.trim() === "") error = t("pleaseEnterEmail");
    setEmailError(error);
    if (error) return;

    if (
      userInfos &&
      userInfos.email.toLowerCase() === userEmail.toLowerCase().trim()
    ) {
      addToast(
        "New email address should not be equal to logged in email address.",
        {
          appearance: "error",
        }
      );
    } else {
      dispatch(userTopLevelEmailAction(userId, userEmail));
      setUserEmail("");
    }
  };

  return (
    <>
      {emailPageLoading && <Loading />}
      <div className="budget-app__reset-email">
        <Container>
          <div className="budget-app__reset-email__content-section">
            <Row>
              <Col xl={8} lg={7} md={6} sm={12} xs={12}>
                <div className="budget-app__reset-email__left-side">
                  <div className="budget-app__reset-email__left-side__info-text">
                    {t("resetEmailPageContent")}
                  </div>
                </div>
              </Col>
              <Col xl={4} lg={5} md={6} sm={12} xs={12}>
                <div className="budget-app__reset-email__right-side">
                  <>
                    <h3>{t("changeEmail")}</h3>
                    <Form
                      className="budget-app__reset-email__form"
                      onSubmit={handleEmailModification}
                    >
                      <InputFormGroup
                        inputLabel={t("emailAddress")}
                        inputName="email"
                      >
                        <InputText
                          inputName="email"
                          inputType="email"
                          placeholderName={t("enterEmailAddress")}
                          inputErrorMessage={emailError}
                          inputChange={handleInputChange}
                          inputValue={userEmail}
                        />
                      </InputFormGroup>

                      <div className="form-group">
                        <button type="submit" className="btn">
                          {t("submit")}
                        </button>
                      </div>
                    </Form>
                  </>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ResetEmailAddress;
