import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import ListNavigation from "../../components/navigation/ListNavigation";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import { monthsList, numberFormat } from "../../utils/Utils";
import RecordDeleteScreen from "../../components/recordDeleteScreen/RecordDeleteScreen";
import {
  salaryListAction,
  salaryDeleteAction,
} from "../../redux/actions/SalaryActions";
import Loading from "../../components/loading/Loading";

const SalaryList = () => {
  // Get translation locale
  const { t } = useTranslation();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get salary list from redux store
  const salaryListsResponse = useSelector((state) => state.salaryListData);
  let {
    loading: salaryListLoading,
    error: salaryListError,
    salaryLists,
  } = salaryListsResponse;

  // Get salary deleted data from redux store
  const salaryDeleteResponse = useSelector((state) => state.salaryDeletedData);
  const { salaryDeleted, error: salaryDeleteError } = salaryDeleteResponse;

  // Show salary list notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    if (salaryListError) addToast(salaryListError, { appearance: "error" });

    if (salaryDeleteError)
      addToast(salaryDeleteError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (salaryDeleted && salaryDeleted.message)
      addToast(salaryDeleted.message, { appearance: "success" });

    return () => {
      delete salaryListsResponse.error;
      delete salaryDeleteResponse.error;
      if (salaryDeleted) delete salaryDeleted.message;
    };
  }, [
    salaryListsResponse,
    salaryListError,
    salaryDeleteResponse,
    salaryDeleteError,
    salaryDeleted,
    addToast,
  ]);

  // Delete salary information data
  const [selectedRecord, setSelectedRecord] = useState();

  // Get salary list
  useEffect(() => {
    dispatch(salaryListAction());
  }, [dispatch, salaryDeleted]);

  // Table Header
  const salaryListColumns = [
    {
      dataField: "month",
      text: t("month"),
      formatter: (cell, row) => monthsList[row.month - 1].name,
    },
    {
      dataField: "year",
      text: t("year"),
    },
    {
      dataField: "monthlySalary",
      text: t("salary"),
      formatter: (cell, row) => numberFormat(row.monthlySalary),
    },

    {
      dataField: "totalCR",
      text: t("totalCR"),
      formatter: (cell, row) => numberFormat(row.totalCR),
    },
    {
      dataField: "pf",
      text: t("pf"),
      formatter: (cell, row) => numberFormat(row.pf),
    },

    {
      dataField: "totalDR",
      text: t("totalDR"),
      formatter: (cell, row) => numberFormat(row.totalDR),
    },
    {
      dataField: "netPayAmount",
      text: t("netAmount"),
      formatter: (cell, row) => numberFormat(row.netPayAmount),
    },
  ];

  // Edit Salary Data
  const editSalaryData = (salaryId) => {
    navigate(`/salary/${salaryId}`);
  };

  // Get event from child component
  const deleteScreenRef = useRef(null);
  const handleOpenDeleteScreen = (rowData) => {
    setSelectedRecord(rowData);
    deleteScreenRef.current.openModalWindow();
  };

  return (
    <>
      {salaryListLoading && <Loading />}
      <MainLayout title={t("salaryList")}>
        <Row>
          <Col>
            <ListNavigation navigateToNew="/salary" />
            <div className="budget-app-listview-section">
              <BootstrapTableComp
                tableBordered={false}
                headerColumns={salaryListColumns}
                tableData={salaryLists && salaryLists.salaryListsResponse}
                tableActionEnabled={true}
                tableEditAction={editSalaryData}
                tableDeleteAction={handleOpenDeleteScreen}
              />
            </div>
          </Col>
        </Row>
      </MainLayout>
      <RecordDeleteScreen
        deleteScreenClasses="salary-section__delete-modal"
        recordId={selectedRecord && selectedRecord._id}
        recordNav="/salary/list"
        ref={deleteScreenRef}
        deleteScreenContent={
          <>
            Do you want to delete the salary data on{" "}
            <b style={{ color: "#FF0000" }}>
              {selectedRecord && monthsList[selectedRecord.month - 1].name} -{" "}
              {selectedRecord && selectedRecord.year}
            </b>
          </>
        }
        dataDispatchAction={salaryDeleteAction}
      />
    </>
  );
};

export default SalaryList;
