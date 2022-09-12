import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { userListAction } from "../../redux/actions/UserActions";
import Loading from "../../components/loading/Loading";

const UserList = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get logged in user details from redux store
  const userDetails = useSelector((state) => state.userLogin, shallowEqual);
  const { userInfos } = userDetails;

  // Get user list from redux store
  const userListsResponse = useSelector((state) => state.userListData);
  const {
    loading: userListLoading,
    error: userListError,
    userList,
  } = userListsResponse;

  // Show user list notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (userListError) addToast(userListError, { appearance: "error" });

    return () => {
      delete userListsResponse.error;
    };
  }, [userListsResponse, userListError, addToast]);

  // Get user list
  useEffect(() => {
    dispatch(userListAction());
  }, [dispatch]);

  const userHeaderColumns = [
    {
      dataField: "username",
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
    navigate(`/user/profile/${userId}`);
  };

  // Delete User Data
  const deleteUserData = (userId) => {
    if (userInfos && !userInfos.isAdmin) {
      addToast(
        "You are not authorized to delete the information. Go to my profile view.",
        { appearance: "info" }
      );
    } else {
      navigate(`/user/profile/${userId}`);
    }
  };

  return (
    <>
      {userListLoading && <Loading />}
      <MainLayout title="User List">
        <Row>
          <Col>
            <div className="budget-app-listview-section">
              <BootstrapTableComp
                tableBordered={false}
                headerColumns={userHeaderColumns}
                tableData={userList && userList.users}
                tableActionEnabled={true}
                tableEditAction={editUserData}
                tableDeleteAction={deleteUserData}
              />
            </div>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default UserList;
