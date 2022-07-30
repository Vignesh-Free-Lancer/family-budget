import React from "react";
import { Button, Col, Row } from "react-bootstrap";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { extraIncomeData } from "../../utils/Utils";
import { numberFormat } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const ExtraIncomeList = () => {
  // Navigate To Page
  const navigate = useNavigate();

  // Edit Table Data
  const onEditChanged = (data) => {
    console.log("Table Edit", data);
    navigate(`/extra-income/${data._id}`);
  };

  // Delete Table Data
  const onDeleteChanged = (data) => {
    console.log("Table Delete", data);
  };

  const tableRowAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="budget-app-listview-section__action-group">
        <Button
          className="budget-app-listview-section__edit-btn"
          onClick={() => {
            onEditChanged(row);
          }}
        ></Button>
        <Button
          className="budget-app-listview-section__delete-btn"
          onClick={() => {
            onDeleteChanged(row);
          }}
        ></Button>
      </div>
    );
  };

  const extraIncomeColumns = [
    {
      dataField: "extraIncomeType",
      text: "Income Type",
    },
    {
      dataField: "incomeDate",
      text: "Income Date",
    },
    {
      dataField: "creditAmount",
      text: "Credit Amount",
      formatter: (cell, row) => numberFormat(row.creditAmount),
    },

    {
      dataField: "description",
      text: "Description",
    },

    {
      dataField: "",
      text: "",
      formatter: tableRowAction,
    },
  ];

  return (
    <MainLayout title="Extra Income List">
      <Row>
        <Col>
          <div className="budget-app-listview-section">
            <BootstrapTableComp
              tableBordered={false}
              headerColumns={extraIncomeColumns}
              tableData={extraIncomeData}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ExtraIncomeList;
