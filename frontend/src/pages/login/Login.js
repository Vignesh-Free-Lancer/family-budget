import React from "react";
import "./login.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import LoginComp from "../../components/login/Login";

const Login = () => {
  // Get translation locale
  const { t } = useTranslation();

  return (
    <div className="budget-app__login">
      <Container>
        <div className="budget-app__login__content-section">
          <Row>
            <Col xl={8} lg={7} md={6} sm={12} xs={12}>
              <div className="budget-app__login__left-side">
                <div className="budget-app__login__left-side__info-text">
                  {t("loginPageContent")}
                </div>
              </div>
            </Col>
            <Col xl={4} lg={5} md={6} sm={12} xs={12}>
              <div className="budget-app__login__right-side">
                <LoginComp />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Login;
