import React, { useEffect } from "react";
import "./thanks-page.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import WelcomeIcon from "../../assets/images/welcome-back-icon.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ThanksPage = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Get user deleted data from redux-store
  const deletedUserResponse = useSelector((state) => state.userDeletedData);
  const { userDeleted } = deletedUserResponse;

  const { addToast } = useToasts();
  useEffect(() => {
    if (userDeleted && userDeleted.message)
      addToast(userDeleted.message, { appearance: "success" });

    return () => {
      delete deletedUserResponse.userDeleted;
    };
  }, [deletedUserResponse, userDeleted, addToast]);

  return (
    <>
      <Container className="thanks-page-section">
        <Row>
          <Col>
            <div className="thanks-page-section__content text-center">
              <h1>{t("thanksPageTitle")}.</h1>
              <p>{t("thanksPageFeddbackContent")}.</p>
              <p>{t("thanksPageContent")}.</p>
              <p>{t("thanksForBeing")}.</p>
              <img alt="welcome-back" src={WelcomeIcon} />
              <h5>{t("thanksWelcome")}!</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ThanksPage;
