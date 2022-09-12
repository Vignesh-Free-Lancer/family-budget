import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./forgot-password.scss";
import { useTranslation } from "react-i18next";
import ForgotPasswordComp from "../../components/forgotPassword/ForgotPassword";

const ForgotPassword = () => {
  // Get translation locale
  const { t } = useTranslation();

  return (
    <div className="budget-app__forgot-password">
      <Container>
        <div className="budget-app__forgot-password__content-section">
          <Row>
            <Col xl={8} lg={7} md={6} sm={12} xs={12}>
              <div className="budget-app__forgot-password__left-side">
                <div className="budget-app__forgot-password__left-side__info-text">
                  {t("forgotPageContent")}
                </div>
              </div>
            </Col>
            <Col xl={4} lg={5} md={6} sm={12} xs={12}>
              <div className="budget-app__forgot-password__right-side">
                <ForgotPasswordComp />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
