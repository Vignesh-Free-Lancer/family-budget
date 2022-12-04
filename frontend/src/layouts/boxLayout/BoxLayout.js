import React from "react";
import { Card } from "react-bootstrap";
import "./box-layout.scss";

const BoxLayout = ({
  title = "Demo",
  children,
  boxLayoutCustomStyle = "",
  cusomtBoxLayoutClassname = "",
}) => {
  return (
    <div className={`budget-app__box-layout ${cusomtBoxLayoutClassname}`}>
      <Card>
        <Card.Header className="budget-app__box-layout-header">
          {title}
        </Card.Header>
        <Card.Body
          className="budget-app__box-layout-body"
          style={{ boxLayoutCustomStyle }}
        >
          {children}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BoxLayout;
