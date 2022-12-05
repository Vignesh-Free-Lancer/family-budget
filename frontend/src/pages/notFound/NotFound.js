import React from "react";
import { Col, Row } from "react-bootstrap";
import "./not-found.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigation
  const navigate = useNavigate();

  return (
    <>
      <div className="not-found-section">
        <div className="container">
          <Row>
            <Col>
              <section className="not-found-section__page_404 text-center">
                <div className="not-found-section__page_404__bg">
                  <h1>404</h1>
                </div>
                <div className="not-found-section__page_404__content">
                  <p>{t("pageNotAvailable")}!</p>
                  <button type="button" onClick={() => navigate("/")}>
                    {t("goTo")} {t("home")}
                  </button>
                </div>
              </section>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default NotFound;
