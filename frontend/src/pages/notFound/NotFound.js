import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./not-found.scss";

const NotFound = () => {
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
                  <p>The page you are looking for not avaible!</p>
                  <button type="button" onClick={() => navigate("/")}>
                    Go to Home
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
