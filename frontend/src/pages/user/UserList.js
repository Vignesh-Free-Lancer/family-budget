import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { userDataList } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { t } = useTranslation();

  // Navigate To Page
  const navigate = useNavigate();

  const userHeaderColumns = [
    {
      dataField: "userName",
      text: t("username"),
    },
    {
      dataField: "email",
      text: t("email"),
    },
    {
      dataField: "dob",
      text: t("dateOfBirth"),
      formatter: (cell, row) => {
        let dob = new Date(row.dob).toLocaleDateString();
        return new Date(dob).toLocaleString("en-us", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      dataField: "gender",
      text: t("gender"),
    },
  ];

  // Edit User Data
  const editUserData = (userId) => {
    navigate(`/user/${userId}`);
  };

  // Delete User Data
  const deleteUserData = (userId) => {
    console.log("User Deleted", userId);
  };

  return (
    <MainLayout title="User List">
      <Row>
        <Col>
          <div className="budget-app-listview-section">
            <BootstrapTableComp
              tableBordered={false}
              headerColumns={userHeaderColumns}
              tableData={userDataList}
              tableActionEnabled={true}
              tableEditAction={editUserData}
              tableDeleteAction={deleteUserData}
            />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default UserList;
