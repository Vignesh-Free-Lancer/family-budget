import React from "react";
import "./app-layout.scss";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const AppLayout = ({ footerStyle = "custom", children }) => {
  return (
    <>
      <Header />
      <main className="budget-app__layout">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default AppLayout;
