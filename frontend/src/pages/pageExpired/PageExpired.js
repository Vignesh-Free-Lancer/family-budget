import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./page-expired.scss";

const PageExpired = () => {
  return (
    <div>
      <Container className="page-expired-section">
        <Row>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className="page-expired-section__expire-img"></div>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className="page-expired-section__expire-content">
              <h2>Session has expired!</h2>
              <ul>
                <li>
                  If the browser window is close, the session will expire
                  automatically.
                </li>
                <li>
                  Also for security reasons, we have disabled Back, Forward and
                  Refresh actions of the browser.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageExpired;
