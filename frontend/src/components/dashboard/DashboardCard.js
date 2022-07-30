import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardCard = ({
  linkAddr = "/",
  dashboardCategory,
  dashboardTitle,
  dashboardLabel,
  dashboardValues = 0,
  dashboardIcon = "card-icon",
}) => {
  return (
    <Col xl={3} lg={4} md={6} sm={12} xs={12} className="mb-4">
      <Link to={linkAddr}>
        <div
          className={`card ${dashboardCategory} dashboard-section__border-left-primary shadow py-2`}
        >
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="dashboard-section__title text-primary text-uppercase mb-2">
                  {dashboardTitle}
                </div>
                <div className="h5 mb-0 font-weight-bold dashboard-section__card-content">
                  <span className="dashboard-label">{dashboardLabel}</span>
                </div>
              </div>
              <div className="col-auto">
                <div className={`dashboard-section__icon ${dashboardIcon}`} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default DashboardCard;
