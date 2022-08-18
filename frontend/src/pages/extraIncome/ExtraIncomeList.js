import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { extraIncomeData } from "../../utils/Utils";
import { numberFormat } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const ExtraIncomeList = () => {
  const { t } = useTranslation();
  // Navigate To Page
  const navigate = useNavigate();

  const extraIncomeColumns = [
    {
      dataField: "extraIncomeType",
      text: t("incomeType"),
    },
    {
      dataField: "incomeDate",
      text: t("incomeDate"),
    },
    {
      dataField: "creditAmount",
      text: t("creditAmount"),
      formatter: (cell, row) => numberFormat(row.creditAmount),
    },

    {
      dataField: "description",
      text: t("description"),
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
    <MainLayout title={t("extraIncomeList")}>
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
