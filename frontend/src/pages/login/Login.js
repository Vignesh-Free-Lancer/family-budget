import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./login.scss";

import LoginComp from "../../components/login/Login";

const Login = () => {
  return (
    <div className="budget-app__login">
      <Container>
        <div className="budget-app__login__content-section">
          <Row>
            <Col xl={8} lg={7} md={6} sm={12} xs={12}>
              <div className="budget-app__login__left-side">
                <div className="budget-app__login__left-side__info-text">
                  Login into your account and easily maintain your all budgets.
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
