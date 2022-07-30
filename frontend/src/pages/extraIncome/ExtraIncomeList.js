import React from "react";
import { Col, Row } from "react-bootstrap";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { extraIncomeData } from "../../utils/Utils";
import { numberFormat } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const ExtraIncomeList = () => {
  // Navigate To Page
  const navigate = useNavigate();

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
  ];

  // Edit Income Records
  const editIncomeData = (incomeId) => {
    navigate(`/extra-income/${incomeId}`);
  };

  // Delete Income Records
  const deleteIncomeData = (incomeId) => {
    console.log("Extra Income Deleted", incomeId);
  };

  return (
    <MainLayout title="Extra Income List">
      <Row>
        <Col>
          <div className="budget-app-listview-section">
            <BootstrapTableComp
              tableBordered={false}
              headerColumns={extraIncomeColumns}
              tableData={extraIncomeData}
              tableActionEnabled={true}
              tableEditAction={editIncomeData}
              tableDeleteAction={deleteIncomeData}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ExtraIncomeList;
