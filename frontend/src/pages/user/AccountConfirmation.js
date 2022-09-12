import React, { useEffect } from "react";
import "./email-validation.scss";
import { Button, Container } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountConfirmation = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Get user mail id from url
  const { emailverification } = useParams();

  // Get user registered data from redux store
  const userInfos = useSelector((state) => state.userRecords);
  const { userDatas } = userInfos;

  // Get forgot password state from redux store
  const userEmailResponse = useSelector((state) => state.userResetEmail);
  const { userResetEmail } = userEmailResponse;

  // Show notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (userDatas && userDatas.message)
      addToast(userDatas.message, { appearance: "success" });

    if (userResetEmail && userResetEmail.message)
      addToast(userResetEmail.message, { appearance: "success" });

    return () => {
      if (userDatas) delete userDatas.message;
      if (userResetEmail) {
        delete userResetEmail.message;
      }
    };
  }, [userDatas, userResetEmail, addToast]);

  // Proceed functionality
  const handleProceed = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="budget-app__email-verification">
      <Container>
        <div className="budget-app__email-verification__content-section">
          <div className="budget-app__email-verification__info">
            <h2>{t("accountConfirmation")}</h2>
            <div className="budget-app__email-verification__bg-icon"></div>
            <p>{t("getStartYourAccount")}.</p>
            <p>
              {t("confirmationLink")}:
              <span> {emailverification ? emailverification : ""}</span>
            </p>
            <p>{t("checkConfirmationMail")}!</p>
            <Button type="button" className="btn" onClick={handleProceed}>
              <span>{t("proceed")}</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountConfirmation;
