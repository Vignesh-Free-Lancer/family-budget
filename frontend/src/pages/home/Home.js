import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.scss";

const Home = () => {
  return (
    <div className="budget-app__home">
      <Container>
        <div className="budget-app__home__content-section">
          <div className="budget-app__home__info">
            <h2>One safe place to maintain your all budgets</h2>
            <div className="budget-app__home__divide-section">
              <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <div className="budget-app__home__login-section">
                    <h4>Manage your all income & expenses easily</h4>
                    <Link to="/login">
                      <Button>Login</Button>
                    </Link>
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                  <div className="budget-app__home__register-section">
                    <h4>Create an account & easily manage your all budgets</h4>
                    <Link to="/registration">
                      <Button>Register</Button>
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
