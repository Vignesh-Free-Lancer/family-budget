import React from "react";
import { Card, Col } from "react-bootstrap";
import "./card-layout.scss";

const CardLayout = ({
  cardType,
  title,
  subTitle,
  content,
  contentType = "number",
}) => {
  return (
    <Col xl={3} lg={3} md={4} sm={12} xs={12}>
      <div className={`budget-app__card-layout ${cardType}`}>
        <Card>
          <Card.Header className="budget-app__card-layout-header">
            {title}
          </Card.Header>
          <Card.Body className="budget-app__card-layout-body">
            <Card.Title>{subTitle}</Card.Title>
            <Card.Text
              className={`${
                contentType === "number" ? "card-text__number" : ""
              }`}
            >
              {content}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default CardLayout;
