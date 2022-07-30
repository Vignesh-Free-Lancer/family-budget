import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./registration.scss";

import DefaultUserImage from "../../assets/images/default-user-icon.png";
import RegistationComp from "../../components/registration/Registration";

const Registation = () => {
  return (
    <div className="budget-app__registration">
      <Container>
        <div className="budget-app__registration__content-section">
          <div className="budget-app__registration__header">
            <Container>
              <Row>
                <Col
                  xl={9}
                  lg={9}
                  md={8}
                  sm={6}
                  xs={6}
                  className="budget-app__registration__header__title"
                >
                  <h2>Registration</h2>
                </Col>
                <Col
                  xl={3}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={6}
                  className="budget-app__registration__header__user-image"
                >
                  <img src={DefaultUserImage} alt="" />
                </Col>
              </Row>
            </Container>
          </div>
          <div className="budget-app__registration__body">
            <RegistationComp />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registation;
