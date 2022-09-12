import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.scss";

import { useTranslation } from "react-i18next";

const Home = () => {
  // Get translation locale
  const { t } = useTranslation();

  return (
    <div className="budget-app__home">
      <Container>
        <div className="budget-app__home__content-section">
          <div className="budget-app__home__info">
            <h2>{t("homePageTitle")}</h2>
            <div className="budget-app__home__divide-section">
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <div className="budget-app__home__login-section">
                    <h4>{t("homePageLoginContent")}</h4>
                    <Link to="/login">
                      <Button>{t("login")}</Button>
                    </Link>
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <div className="budget-app__home__register-section">
                    <h4>{t("homePageRegistrationContent")}</h4>
                    <Link to="/registration">
                      <Button>{t("registration")}</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
