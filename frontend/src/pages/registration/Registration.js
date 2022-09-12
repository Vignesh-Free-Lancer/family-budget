import React, { useState } from "react";
import "./registration.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import DefaultUserImage from "../../assets/images/default-user-icon.png";
import RegistationComp from "../../components/registration/Registration";

const Registation = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Get user id from url
  const { userId } = useParams();

  // State object for user profile image
  const [userProfileImage, setUserProfileImage] = useState(DefaultUserImage);

  // Callback function for upload profile image
  const uploadedUserProfile = (imageUrl) => {
    setUserProfileImage(imageUrl);
  };

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
                  {!userId ? (
                    <h2>{t("registration")}</h2>
                  ) : (
                    <h2>{t("myProfile")}</h2>
                  )}
                </Col>
                <Col
                  xl={3}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={6}
                  className="budget-app__registration__header__user-image"
                >
                  <img src={userProfileImage} alt="" />
                </Col>
              </Row>
            </Container>
          </div>
          <div className="budget-app__registration__body">
            <RegistationComp uploadedUserProfile={uploadedUserProfile} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registation;
