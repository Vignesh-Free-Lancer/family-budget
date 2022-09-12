import React, { useEffect, useState } from "react";
import "./header.scss";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import Logo from "../../assets/images/budget-app-logo.png";
import UserIcon from "../../assets/images/default-user-icon.png";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import AccordionComp from "../accordion/Accordion";
import { userLogoutAction } from "../../redux/actions/UserActions";

const Header = () => {
  // Get translation locale
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get logged in user details from redux store
  const userDetails = useSelector((state) => state.userLogin, shallowEqual);
  const { userInfos } = userDetails;

  // Get user updated details from redux store
  const userUpdatedResponse = useSelector((state) => state.userUpdatedData);
  const { updatedUser } = userUpdatedResponse;

  if (updatedUser && updatedUser !== undefined) {
    userInfos.username = updatedUser.username;
    userInfos.pic = updatedUser.pic;
  }

  // If user not logged in, redirect to home page
  // useEffect(() => {
  //   const localData = localStorage.getItem("userInfos");
  //   return localData ? <></> : dispatch(userLogoutAction());
  // }, [userInfos, dispatch, navigate]);

  // State object for header
  const [show, setShow] = useState(false);

  // Handle event for languange change
  const handleLangChange = (selectedLand) => {
    setLanguage(selectedLand);
    i18n.changeLanguage(selectedLand);
  };

  // Handle event for open the humburger menu
  const handleOpenMenu = () => setShow(true);

  // Handle event for close the humburger menu
  const handleCloseMenu = () => {
    setShow(false);
  };

  // Handle event for logut
  const userLogout = () => {
    dispatch(userLogoutAction());
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" fixed="top" className="budget-app__header">
        <Container fluid>
          <Navbar.Brand>
            <img alt="" src={Logo} />
            {userInfos ? (
              <Link to="/dashboard">{t("appTitle")}</Link>
            ) : (
              <Link to="/">{t("appTitle")}</Link>
            )}
          </Navbar.Brand>
          <Nav className="ms-auto">
            {userInfos && (
              <>
                <Nav.Link
                  className="budget-app__header__user-logout"
                  onClick={userLogout}
                >
                  {t("logout")}
                </Nav.Link>
              </>
            )}
            <NavDropdown
              title={
                language === "en" ? "En" : language === "hi" ? "नमस्ते" : "En"
              }
              id="navbarLangDropdown"
              className="budget-app__header__dropdown-list budget-app__header__dropdown-list-language"
              onSelect={handleLangChange}
            >
              <NavDropdown.Item eventKey="en">En - English</NavDropdown.Item>
              <NavDropdown.Item eventKey="hi">Hi - Hindi</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {userInfos && (
            <Button
              className="budget-app__header__humburger-menu"
              onClick={handleOpenMenu}
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </Button>
          )}
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
          <img alt="" src={userInfos ? userInfos.pic : UserIcon} />
          <Offcanvas.Title id="offcanvasNavbarTitle">
            {t("welcome")}, {userInfos && userInfos.username}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="pe-3 offcanvas-body__app-category">
            <AccordionComp
              accordAlwaysOpen={false}
              eventAccord={1}
              accordTitle={t("manageProfile")}
            >
              <NavLink
                className="offcanvas-body__app-category__profile"
                to={`/user/profile/${userInfos && userInfos.userId}`}
                onClick={handleCloseMenu}
              >
                {t("myProfile")}
              </NavLink>
              <NavLink
                className="offcanvas-body__app-category__reset-password"
                to={`/reset-password/${userInfos && userInfos.userId}`}
                onClick={handleCloseMenu}
              >
                {t("resetPassword")}
              </NavLink>
              <NavLink
                className="offcanvas-body__app-category__reset-email"
                to={`/email/modify/${userInfos && userInfos.userId}`}
                onClick={handleCloseMenu}
              >
                {t("changeEmail")}
              </NavLink>
            </AccordionComp>
            <NavLink
              className="offcanvas-body__app-category__dashboard"
              to="/dashboard"
              onClick={handleCloseMenu}
            >
              {t("dashboard")}
            </NavLink>
            <NavLink
              className="offcanvas-body__app-category__salary"
              to="/salary/list"
              onClick={handleCloseMenu}
            >
              {t("salary")}
            </NavLink>
            <NavLink
              className="offcanvas-body__app-category__extra-income"
              to="/extra-income/list"
              onClick={handleCloseMenu}
            >
              {t("extraIncome")}
            </NavLink>
            <NavLink
              className="offcanvas-body__app-category__expense"
              to="/expense"
              onClick={handleCloseMenu}
            >
              {t("expenses")}
            </NavLink>
            <NavLink
              className="offcanvas-body__app-category__report"
              to="/report"
              onClick={handleCloseMenu}
            >
              {t("reports")}
            </NavLink>
            <NavLink
              className="offcanvas-body__app-category__user"
              to="/user/list"
              onClick={handleCloseMenu}
            >
              {t("user")}
            </NavLink>
          </Nav>
          <Nav className="pe-3 offcanvas-body__user-category">
            <Nav.Link
              className="offcanvas-body__user-category__logout"
              onClick={userLogout}
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
