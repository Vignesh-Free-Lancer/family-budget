import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import ListNavigation from "../../components/navigation/ListNavigation";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { numberFormat } from "../../utils/Utils";
import RecordDeleteScreen from "../../components/recordDeleteScreen/RecordDeleteScreen";
import {
  extraIncomeDeleteAction,
  extraIncomeListAction,
} from "../../redux/actions/ExtraIncomeActions";
import Loading from "../../components/loading/Loading";

const ExtraIncomeList = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigate To Page
  const navigate = useNavigate();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get extra income list from redux store
  const extraIncomeListsResponse = useSelector(
    (state) => state.extraIncomeListData
  );
  let {
    loading: extraIncomeListLoading,
    error: extraIncomeListError,
    extraIncomeLists,
  } = extraIncomeListsResponse;

  // Get extra income deleted data from redux store
  const extraIncomeDeleteResponse = useSelector(
    (state) => state.extraIncomeDeletedData
  );
  const { extraIncomeDeleted, error: extraIncomeDeleteError } =
    extraIncomeDeleteResponse;

  // Show extra income list notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (extraIncomeListError)
      addToast(extraIncomeListError, { appearance: "error" });

    if (extraIncomeDeleteError)
      addToast(extraIncomeDeleteError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (extraIncomeDeleted && extraIncomeDeleted.message)
      addToast(extraIncomeDeleted.message, { appearance: "success" });

    return () => {
      delete extraIncomeListsResponse.error;
      delete extraIncomeDeleteResponse.error;
      if (extraIncomeDeleted) delete extraIncomeDeleted.message;
    };
  }, [
    extraIncomeListsResponse,
    extraIncomeListError,
    extraIncomeDeleteResponse,
    extraIncomeDeleteError,
    extraIncomeDeleted,
    addToast,
  ]);

  // Delete extra income information data
  const [selectedRecord, setSelectedRecord] = useState();

  // Get extraIncome list
  useEffect(() => {
    dispatch(extraIncomeListAction());
  }, [dispatch, navigate]);

  const extraIncomeColumns = [
    {
      dataField: "incomeDate",
      text: t("incomeDate"),
      formatter: (cell, row) => {
        let incomeDate = new Date(row.incomeDate).toLocaleDateString();
        return new Date(incomeDate).toLocaleString("en-us", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      dataField: "incomeCreditAmount",
      text: t("creditAmount"),
      formatter: (cell, row) => numberFormat(row.incomeCreditAmount),
    },
    {
      dataField: "amountCreditedType",
      text: t("incomeType"),
    },
    {
      dataField: "amountCreditedBank",
      text: t("amountCreditedTo"),
    },
    {
      dataField: "description",
      text: t("description"),
    },
  ];

  // Edit Extra Income Data
  const editExtraIncomeData = (extraIncomeId) => {
    navigate(`/extra-income/${extraIncomeId}`);
  };

  // Get event from child component
  const deleteScreenRef = useRef(null);
  const handleOpenDeleteScreen = (rowData) => {
    setSelectedRecord(rowData);
    deleteScreenRef.current.openModalWindow();
  };

  return (
    <>
      {extraIncomeListLoading && <Loading />}
      <MainLayout title={t("extraIncomeList")}>
        <Row>
          <Col>
            <ListNavigation navigateToNew="/extra-income" />
            <div className="budget-app-listview-section">
              <BootstrapTableComp
                tableBordered={false}
                headerColumns={extraIncomeColumns}
                tableData={
                  extraIncomeLists && extraIncomeLists.extraIncomeListsResponse
                }
                tableActionEnabled={true}
                tableEditAction={editExtraIncomeData}
                tableDeleteAction={handleOpenDeleteScreen}
              />
            </div>
          </Col>
        </Row>
      </MainLayout>
      <RecordDeleteScreen
        deleteScreenClasses="salary-section__delete-modal"
        recordId={selectedRecord && selectedRecord._id}
        recordNav="/extra-income/list"
        ref={deleteScreenRef}
        deleteScreenContent={
          <>
            Do you want to delete the salary data on{" "}
            <b style={{ color: "#FF0000" }}>
              {selectedRecord &&
                new Date(selectedRecord.incomeDate).toLocaleDateString()}
            </b>
          </>
        }
        dataDispatchAction={extraIncomeDeleteAction}
      />
    </>
  );
};

export default ExtraIncomeList;
