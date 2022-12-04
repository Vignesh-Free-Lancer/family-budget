import React from "react";
import "./page-expired.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PageExpired = () => {
  // Get translation locale
  const { t } = useTranslation();

  return (
    <div>
      <Container className="page-expired-section">
        <Row>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className="page-expired-section__expire-img"></div>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className="page-expired-section__expire-content">
              <h2>{t("sessionExpired")}!</h2>
              <ul>
                <li>{t("sessionExpiredBrowerClose")}.</li>
                <li>{t("sessionExpiredBrowserAction")}.</li>
              </ul>
              <div className="page-expired-section__expire-content__home-link">
                {t("goTo")} <Link to="/"> {t("home")}</Link>.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageExpired;
