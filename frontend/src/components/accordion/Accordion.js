import React from "react";
import "./accordion.scss";
import { Accordion } from "react-bootstrap";

const AccordionComp = ({
  accordAlwaysOpen = false,
  defaultActive = 0,
  eventAccord = 0,
  accordTitle = "",
  children,
}) => {
  return (
    <Accordion
      className="budget-app__accordion"
      defaultActiveKey={defaultActive}
    >
      <Accordion.Item eventKey={eventAccord}>
        <Accordion.Header>{accordTitle}</Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionComp;
