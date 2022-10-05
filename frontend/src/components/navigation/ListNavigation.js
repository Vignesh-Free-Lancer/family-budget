import React from "react";
import "./app-navigation.scss";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListNavigation = ({ navigateToNew }) => {
  return (
    <div className="budget-app-navigation">
      <ButtonGroup size="sm" className="budget-app-navigation-group">
        <Link to={`${navigateToNew}`}>
          <Button className="budget-app-navigation__add-item"></Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default ListNavigation;
