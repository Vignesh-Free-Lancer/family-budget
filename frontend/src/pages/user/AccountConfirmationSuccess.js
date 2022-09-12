import React, { useEffect } from "react";
import "./email-validation.scss";
import { Button, Container } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { UserAccountConfirmationAction } from "../../redux/actions/UserActions";
import Loading from "../../components/loading/Loading";

const AccountConfirmationSuccess = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get user token from url
  const { token } = useParams();

  // Dispatch the action to activate user account
  useEffect(() => {
    const activateUserAccount = () => {
      dispatch(UserAccountConfirmationAction(token));
    };
    if (token) activateUserAccount();
  }, [token, dispatch]);

  // Get account confirmation status from redux store
  const userAccountVerification = useSelector(
    (state) => state.userAccountConfirmation
  );
  const { loading: activationLoading, error: activationError } =
    userAccountVerification;

  // Show notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (activationError) addToast(activationError, { appearance: "error" });

    return () => {
      delete userAccountVerification.error;
    };
  }, [userAccountVerification, activationError, addToast]);

  return (
    <>
      {activationLoading && <Loading />}

      {!activationError && (
        <div className="budget-app__email-verification budget-app__email-verification__success">
          <Container>
            <div className="budget-app__email-verification__content-section budget-app__email-verification__success__content-section">
              <div className="budget-app__email-verification__info budget-app__email-verification__success__info">
                <h2>{t("accountConfirmationSuccess")}!</h2>
                <div className="budget-app__email-verification__bg-icon budget-app__email-verification__success__bg-icon"></div>
                <p>{t("nowLogin")}</p>
                <Button type="button" className="btn">
                  <span>
                    <Link to="/login">{t("login")}</Link>
                  </span>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}

      {activationError && (
        <div className="budget-app__email-verification  budget-app__email-verification__error">
          <Container>
            <div className="budget-app__email-verification__content-section  budget-app__email-verification__error__content-section">
              <div className="budget-app__email-verification__info budget-app__email-verification__error__info">
                <h2>{t("accountActivationStatus")}!</h2>
                <div className="budget-app__email-verification__bg-icon budget-app__email-verification__error__bg-icon"></div>
                <p>{t("accountActivationIssue")}.</p>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default AccountConfirmationSuccess;
