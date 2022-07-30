import React, { useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import Logo from "../../assets/images/budget-app-logo.png";
import UserIcon from "../../assets/images/default-user-icon.png";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleCloseMenu = () => {
    setShow(false);
  };
  const handleOpenMenu = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" fixed="top" className="budget-app__header">
        <Container fluid>
          <Navbar.Brand>
            <img alt="" src={Logo} />
            <Link to="/">Family Budget</Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink
              to="/registration"
              className="budget-app__header__user-profile nav-link"
            >
              My Profile
            </NavLink>
            <Nav.Link
              href="#action2"
              className="budget-app__header__user-logout"
            >
              Logout
            </Nav.Link>
            <NavDropdown
              title="En"
              id="navbarScrollingDropdown"
              className="budget-app__header__language"
            >
              <NavDropdown.Item href="#action3">English</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Hindi</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button
            className="budget-app__header__humburger-menu"
            onClick={handleOpenMenu}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </Button>
        </Container>
      </Navbar>

      <Navbar.Offcanvas
        id="offcanvasNavbar-header"
        className="budget-app__header__offcanvas"
        placement="end"
        show={show}
        onHide={handleCloseMenu}
      >
        <Offcanvas.Header closeButton>
          <img alt="" src={UserIcon} />
          <Offcanvas.Title id="offcanvasNavbarTitle">
            Welcome, Vignesh R
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="pe-3 offcanvas-body__app-category">
            <NavLink to="/dashboard" onClick={handleCloseMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/salary/list" onClick={handleCloseMenu}>
              Salary
            </NavLink>
            <NavLink to="/extra-income/list" onClick={handleCloseMenu}>
              Extra Income
            </NavLink>
            <NavLink to="/expense" onClick={handleCloseMenu}>
              Expenses
            </NavLink>
            <NavLink to="/report" onClick={handleCloseMenu}>
              Reports
            </NavLink>
            <NavLink to="/user/list" onClick={handleCloseMenu}>
              User
            </NavLink>
          </Nav>
          <Nav className="pe-3 offcanvas-body__user-category">
            <Nav.Link
              className="offcanvas-body__user-category__profile"
              href="#action1"
            >
              My Profile
            </Nav.Link>
            <Nav.Link
              className="offcanvas-body__user-category__logout"
              href="#action2"
            >
              Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
};

export default Header;
