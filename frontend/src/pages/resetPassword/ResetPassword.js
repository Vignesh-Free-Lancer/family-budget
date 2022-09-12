import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./reset-password.scss";
import { useTranslation } from "react-i18next";
import ResetPasswordComp from "../../components/resetPassword/ResetPassword";

const ResetPassword = () => {
  // Get translation locale
  const { t } = useTranslation();

  return (
    <div className="budget-app__reset-password">
      <Container>
        <div className="budget-app__reset-password__content-section">
          <Row>
            <Col xl={8} lg={7} md={6} sm={12} xs={12}>
              <div className="budget-app__reset-password__left-side">
                <div className="budget-app__reset-password__left-side__info-text">
                  {t("resetPageContent")}
                </div>
              </div>
            </Col>
            <Col xl={4} lg={5} md={6} sm={12} xs={12}>
              <div className="budget-app__reset-password__right-side">
                <ResetPasswordComp />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
