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
import { useTranslation } from "react-i18next";
import "./header.scss";
import Logo from "../../assets/images/budget-app-logo.png";
import UserIcon from "../../assets/images/default-user-icon.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const handleLangChange = (selectedLand) => {
    setLanguage(selectedLand);
    i18n.changeLanguage(selectedLand);
  };

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
            <Link to="/">{t("appTitle")}</Link>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink
              to="/registration"
              className="budget-app__header__user-profile nav-link"
            >
              {t("myProfile")}
            </NavLink>
            <Nav.Link
              href="#action2"
              className="budget-app__header__user-logout"
            >
              {t("logout")}
            </Nav.Link>
            <NavDropdown
              title={
                language === "en" ? "En" : language === "hi" ? "नमस्ते" : "En"
              }
              id="navbarScrollingDropdown"
              className="budget-app__header__language"
              onSelect={handleLangChange}
            >
              <NavDropdown.Item eventKey="en">En - English</NavDropdown.Item>
              <NavDropdown.Item eventKey="hi">Hi - Hindi</NavDropdown.Item>
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
            {t("welcome")}, Vignesh R
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="pe-3 offcanvas-body__app-category">
            <NavLink to="/dashboard" onClick={handleCloseMenu}>
              {t("dashboard")}
            </NavLink>
            <NavLink to="/salary/list" onClick={handleCloseMenu}>
              {t("salary")}
            </NavLink>
            <NavLink to="/extra-income/list" onClick={handleCloseMenu}>
              {t("extraIncome")}
            </NavLink>
            <NavLink to="/expense" onClick={handleCloseMenu}>
              {t("expenses")}
            </NavLink>
            <NavLink to="/report" onClick={handleCloseMenu}>
              {t("reports")}
            </NavLink>
            <NavLink to="/user/list" onClick={handleCloseMenu}>
              {t("user")}
            </NavLink>
          </Nav>
          <Nav className="pe-3 offcanvas-body__user-category">
            <Nav.Link
              className="offcanvas-body__user-category__profile"
              href="#action1"
            >
              {t("myProfile")}
            </Nav.Link>
            <Nav.Link
              className="offcanvas-body__user-category__logout"
              href="#action2"
            >
              {t("logout")}
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
};

export default Header;
