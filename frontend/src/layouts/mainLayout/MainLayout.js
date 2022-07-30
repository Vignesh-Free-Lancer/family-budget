import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./main-layout.scss";

const MainLayout = ({ title, children }) => {
  return (
    <div className="budget-app__layout-main">
      <Container>
        <Row className="budget-app__layout-main__title">
          <Col>
            <h2>{title}</h2>
          </Col>
        </Row>
        <Row className="budget-app__layout-main__body">
          <Col>{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainLayout;
