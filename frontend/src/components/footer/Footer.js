import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="budget-app__footer">
      <div className="budget-app__footer__content">
        <ul>
          <li>Copyright &copy; Vignesh Corps.,</li>
          <li>Email: developer.vicki@gmail.com</li>
        </ul>
        {/* <div className="budget-app__footer__content__info">
          Contact @ 000-00-000
        </div>
        <div className="budget-app__footer__content__copyright">
          Copyright &copy; Vignesh Corps.,
        </div>
        <div className="budget-app__footer__content__support">
          Email: developer.vicki@gmail.com
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
