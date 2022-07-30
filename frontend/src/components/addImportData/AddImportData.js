import React from "react";
import { Col, Row } from "react-bootstrap";
import "./add-import.scss";

const AddImportData = ({
  addImportCustomClass,
  customFirstTitle = "",
  customSecondTitle = "",
  customHandleNewData = () => {},
  customHandleCopyData = () => {},
}) => {
  // Handle New Data
  const handleNew = (e) => {
    e.preventDefault();
    customHandleNewData();
  };

  // Handle Copy Data
  const handleCopyData = (e) => {
    e.preventDefault();
    alert("Copy event");
    customHandleCopyData();
  };
  return (
    <div className={`budget-app-add-import ${addImportCustomClass}`}>
      <Row>
        <Col>
          <button
            className="btn btn-primary first-button"
            title={customFirstTitle}
            disabled={false}
            onClick={handleCopyData}
          >
            Copy Last Month Data
          </button>
          <button
            className="btn btn-info second-button"
            title={customSecondTitle}
            onClick={handleNew}
          >
            New
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default AddImportData;
