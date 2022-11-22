import React, { useRef, useState, createContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import RootData from "../../components/rootData/RootData";
import Tab from "../../components/tab/Tab";
import AddImportData from "../../components/addImportData/AddImportData";
import ExpenseModalWindow from "./ExpenseModalWindow";
import GroceryModalWindow from "./GroceryModalWindow";
import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";
import {
  expenseDeleteAction,
  expenseImportAction,
  expenseListAction,
} from "../../redux/actions/ExpenseActions";
import Loading from "../../components/loading/Loading";
import RecordDeleteScreen from "../../components/recordDeleteScreen/RecordDeleteScreen";
import {
  groceryDeleteAction,
  groceryImportAction,
  groceryListAction,
} from "../../redux/actions/GroceryActions";

export const RootDataContext = createContext(null);

const Expenses = (props) => {
  // Get translation locale
  const { t } = useTranslation();

  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Get expense creation data from redux store
  const expenseInfos = useSelector((state) => state.expenseRecords);
  const {
    loading: expenseLoading,
    error: expenseError,
    expenseDatas,
  } = expenseInfos;

  // Get expense import data from redux store
  const expenseImportInfos = useSelector((state) => state.expenseImportRecords);
  let {
    loading: expenseImportLoading,
    error: expenseImportError,
    expenseImportDatas,
  } = expenseImportInfos;

  // Get expense updated data from redux store
  const expenseUpdateResponse = useSelector(
    (state) => state.expenseUpdatedData
  );
  const {
    loading: expenseUpdateLoading,
    error: expenseUpdateError,
    expenseUpdated,
  } = expenseUpdateResponse;

  // Get expense deleted data from redux store
  const expenseDeleteResponse = useSelector(
    (state) => state.expenseDeletedData
  );
  const {
    loading: expenseDeleteLoading,
    error: expenseDeletedError,
    expenseDeleted,
  } = expenseDeleteResponse;

  // Get expense list from redux store
  const expenseListsResponse = useSelector((state) => state.expenseListData);
  let {
    loading: expenseListLoading,
    error: expenseListError,
    expenseLists,
  } = expenseListsResponse;

  // Get grocery creation data from redux store
  const groceryInfos = useSelector((state) => state.groceryRecords);
  const {
    loading: groceryLoading,
    error: groceryError,
    groceryDatas,
  } = groceryInfos;

  // Get grocery import data from redux store
  const groceryImportInfos = useSelector((state) => state.groceryImportRecords);
  let {
    loading: groceryImportLoading,
    error: groceryImportError,
    groceryImportDatas,
  } = groceryImportInfos;

  // Get grocery updated data from redux store
  const groceryUpdateResponse = useSelector(
    (state) => state.groceryUpdatedData
  );
  const {
    loading: groceryUpdateLoading,
    error: groceryUpdateError,
    groceryUpdated,
  } = groceryUpdateResponse;

  // Get grocery deleted data from redux store
  const groceryDeleteResponse = useSelector(
    (state) => state.groceryDeletedData
  );
  const {
    loading: groceryDeleteLoading,
    error: groceryDeletedError,
    groceryDeleted,
  } = groceryDeleteResponse;

  // Get grocery list from redux store
  const groceryListsResponse = useSelector((state) => state.groceryListData);
  let {
    loading: groceryListLoading,
    error: groceryListError,
    groceryLists,
  } = groceryListsResponse;

  // Show expense creation notification to user
  const { addToast } = useToasts();
  useEffect(() => {
    // Expense related notification
    if (expenseError)
      addToast(expenseError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (expenseDatas && expenseDatas.message)
      addToast(expenseDatas.message, { appearance: "success" });

    if (expenseImportError)
      addToast(expenseImportError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (expenseImportDatas && expenseImportDatas.message)
      addToast(expenseImportDatas.message, { appearance: "success" });

    if (expenseUpdateError)
      addToast(expenseUpdateError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (expenseUpdated && expenseUpdated.message)
      addToast(expenseUpdated.message, { appearance: "success" });

    if (expenseDeletedError)
      addToast(expenseDeletedError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (expenseDeleted && expenseDeleted.message)
      addToast(expenseDeleted.message, { appearance: "success" });

    if (expenseListError) addToast(expenseListError, { appearance: "error" });

    // Grocery related notification
    if (groceryError)
      addToast(groceryError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (groceryDatas && groceryDatas.message)
      addToast(groceryDatas.message, { appearance: "success" });

    if (groceryImportError)
      addToast(groceryImportError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (groceryImportDatas && groceryImportDatas.message)
      addToast(groceryImportDatas.message, { appearance: "success" });

    if (groceryUpdateError)
      addToast(groceryUpdateError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (groceryUpdated && groceryUpdated.message)
      addToast(groceryUpdated.message, { appearance: "success" });

    if (groceryDeletedError)
      addToast(groceryDeletedError, {
        appearance: "error",
        autoDismissTimeout: "4000",
      });

    if (groceryDeleted && groceryDeleted.message)
      addToast(groceryDeleted.message, { appearance: "success" });

    if (groceryListError) addToast(groceryListError, { appearance: "error" });

    return () => {
      // Expense related notification
      delete expenseInfos.error;
      delete expenseImportInfos.error;
      delete expenseUpdateResponse.error;
      delete expenseDeleteResponse.error;
      delete expenseListsResponse.error;

      if (expenseDatas) delete expenseDatas.message;
      if (expenseImportDatas) delete expenseImportDatas.message;
      if (expenseUpdated) delete expenseUpdated.message;
      if (expenseDeleted) delete expenseDeleted.message;

      // Grocery related notification
      delete groceryInfos.error;
      delete groceryImportInfos.error;
      delete groceryUpdateResponse.error;
      delete groceryDeleteResponse.error;
      delete groceryListsResponse.error;

      if (groceryDatas) delete groceryDatas.message;
      if (groceryImportDatas) delete groceryImportDatas.message;
      if (groceryUpdated) delete groceryUpdated.message;
      if (groceryDeleted) delete groceryDeleted.message;
    };
  }, [
    expenseInfos,
    expenseDatas,
    expenseError,
    expenseImportInfos,
    expenseImportDatas,
    expenseImportError,
    expenseUpdateResponse,
    expenseUpdated,
    expenseUpdateError,
    expenseDeleteResponse,
    expenseDeleted,
    expenseDeletedError,
    expenseListError,
    expenseListsResponse,
    groceryInfos,
    groceryDatas,
    groceryError,
    groceryImportInfos,
    groceryImportDatas,
    groceryImportError,
    groceryUpdateResponse,
    groceryUpdated,
    groceryUpdateError,
    groceryDeleteResponse,
    groceryDeleted,
    groceryDeletedError,
    groceryListError,
    groceryListsResponse,
    addToast,
  ]);

  // State object For root data
  const [expenseMonth, setExpenseMonth] = useState();
  const [expenseYear, setExpenseYear] = useState();

  // State object for root data handling error
  const [rootDataErrors, setRootDataErrors] = useState({});

  // Delete expense/grocery information data
  const [selectedRecord, setSelectedRecord] = useState();

  // State Obejct For Handling Expense Error
  const [expenseErrors, setExpenseErrors] = useState({});

  // Root data onChnage event
  const getRootData = (month, year, rootErrors) => {
    setExpenseMonth(month);
    setExpenseYear(year);
    // setSalaryErrors(rootErrors);
  };

  // Get/Fire event from child component
  const rootDataRef = useRef(null);

  // Validate The Month & Year Before Add Expense & Grocery
  const validateRange = () => {
    const errors = {};

    if (expenseMonth === "select") errors.expenseMonth = "Please select month";

    if (expenseYear === "select") errors.expenseYear = "Please select year";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const beforeOpenModalWindow = () => {
    const errors = validateRange();
    setExpenseErrors(errors || {});
    setSelectedRecord();
    if (errors) {
      addToast(
        expenseMonth === "select" && expenseYear === "select"
          ? t("pleaseSelectMonthYear")
          : expenseMonth === "select"
          ? t("pleaseSelectMonth")
          : expenseYear === "select"
          ? t("pleaseSelectyear")
          : "",
        {
          appearance: "error",
        }
      );
      return;
    }
    return true;
  };

  // State Object For Expense Modal Window
  const [openExpenseModal, setOpenExpenseModal] = useState(false);

  // Show The Expense Modal Window Screen
  const openExpenseModalWindow = () => {
    const rootDataValidation = beforeOpenModalWindow();

    if (rootDataValidation) setOpenExpenseModal(true);
  };

  // Close The Expense Modal Window Screen
  const closeExpenseModalWindow = () => {
    setOpenExpenseModal(false);
  };

  // Import last month expense data
  const importLastMonthExpenseData = () => {
    const rootDataValidation = beforeOpenModalWindow();

    if (rootDataValidation)
      dispatch(expenseImportAction(expenseMonth, expenseYear));
  };

  // State Object For Grocery Modal Window
  const [openGroceryModal, setOpenGroceryModal] = useState(false);

  // Show The Grocery Modal Window Screen
  const openGroceryModalWindow = () => {
    const rootDataValidation = beforeOpenModalWindow();

    if (rootDataValidation) setOpenGroceryModal(true);
  };

  // Close The Grocery Modal Window Screen
  const closeGroceryModalWindow = () => {
    setOpenGroceryModal(false);
  };

  // Import last month grocery data
  const importLastMonthGroceryData = () => {
    const rootDataValidation = beforeOpenModalWindow();

    if (rootDataValidation)
      dispatch(groceryImportAction(expenseMonth, expenseYear));
  };

  // Get expense list
  useEffect(() => {
    const getExpenseLists = (month, year) => {
      dispatch(expenseListAction(month, year));
      dispatch(groceryListAction(month, year));
    };

    if (
      expenseMonth &&
      expenseMonth !== "select" &&
      expenseYear &&
      expenseYear !== "select"
    ) {
      getExpenseLists(expenseMonth, expenseYear);
    } else {
      getExpenseLists(0, 0);
    }
  }, [
    dispatch,
    expenseMonth,
    expenseYear,
    expenseDatas,
    expenseImportDatas,
    expenseUpdated,
    expenseDeleted,
    groceryDatas,
    groceryImportDatas,
    groceryUpdated,
    groceryDeleted,
  ]);

  const expenseColumns = [
    {
      dataField: "particular",
      text: t("particular"),
    },
    {
      dataField: "estimatedCost",
      text: t("estimatedCost"),
      key: "currency",
    },
    {
      dataField: "actualCost",
      text: t("actualCost"),
      key: "currency",
    },
    {
      dataField: "paymentType",
      text: t("paymentType"),
    },
    {
      dataField: "paymentDate",
      text: t("paymentDate"),
      formatter: (cell, row) => {
        let paymentDate = new Date(row.paymentDate).toLocaleDateString();
        return new Date(paymentDate).toLocaleString("en-us", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      dataField: "paymentBank",
      text: t("paymentBank"),
    },
    {
      dataField: "description",
      text: t("description"),
    },
  ];

  // Edit Expense Data
  const editExpenseData = (recordId) => {
    setSelectedRecord(recordId);
    // openExpenseModalWindow();
    setOpenExpenseModal(true);
  };

  // Get event from child component for delete expense data
  const expenseDeleteScreenRef = useRef(null);
  const handleOpenExpenseDeleteScreen = (rowData) => {
    setSelectedRecord(rowData);
    expenseDeleteScreenRef.current.openModalWindow();
  };

  const groceryColumns = [
    {
      dataField: "particulars",
      text: t("particular"),
    },
    {
      dataField: "qty",
      text: t("quantity"),
    },
    {
      dataField: "unitPrice",
      text: t("unitPrice"),
      key: "currency",
    },
    {
      dataField: "totalPrice",
      text: t("totalPrice"),
      key: "currency",
    },
  ];

  // Edit Grocery Data
  const editGroceryData = (recordId) => {
    setSelectedRecord(recordId);
    // openGroceryModalWindow();
    setOpenGroceryModal(true);
  };

  // Get event from child component for delete grocery data
  const groceryDeleteScreenRef = useRef(null);
  const handleOpenGroceryDeleteScreen = (rowData) => {
    setSelectedRecord(rowData);
    groceryDeleteScreenRef.current.openModalWindow();
  };

  const tabLists = [
    {
      title: t("expenseLists"),
      eventKey: "expense-tab",
      content: (
        <>
          <AddImportData
            addImportCustomClass="text-right expense-section__add-import-comp"
            customFirstTitle={t("copyExpenseData")}
            customSecondTitle={t("addNewExpense")}
            customHandleNewData={openExpenseModalWindow}
            customHandleCopyData={importLastMonthExpenseData}
            checkDataExists={expenseLists && expenseLists.expenseDetails}
          />
          <BootstrapTableComp
            headerColumns={expenseColumns}
            bootstrapCustomClasses="expense-section__boot-table"
            tableData={expenseLists && expenseLists.expenseDetails}
            tableActionEnabled={true}
            tableEditAction={editExpenseData}
            tableDeleteAction={handleOpenExpenseDeleteScreen}
          />
        </>
      ),
    },

    {
      title: t("groceryLists"),
      eventKey: "grocery-tab",
      content: (
        <>
          <AddImportData
            addImportCustomClass="text-right expense-section__add-import-comp"
            customFirstTitle={t("copyGroceryData")}
            customSecondTitle={t("addNewGrocery")}
            customHandleNewData={openGroceryModalWindow}
            customHandleCopyData={importLastMonthGroceryData}
            checkDataExists={groceryLists && groceryLists.groceryItems}
          />
          <BootstrapTableComp
            headerColumns={groceryColumns}
            bootstrapCustomClasses="expense-section__boot-table"
            tableData={groceryLists && groceryLists.groceryItems}
            tableActionEnabled={true}
            tableEditAction={editGroceryData}
            tableDeleteAction={handleOpenGroceryDeleteScreen}
          />
        </>
      ),
    },
  ];

  return (
    <>
      {expenseLoading && <Loading />}
      {expenseImportLoading && <Loading />}
      {expenseUpdateLoading && <Loading />}
      {expenseDeleteLoading && <Loading />}
      {expenseListLoading && <Loading />}
      {groceryLoading && <Loading />}
      {groceryImportLoading && <Loading />}
      {groceryUpdateLoading && <Loading />}
      {groceryDeleteLoading && <Loading />}
      {groceryListLoading && <Loading />}
      <MainLayout title={t("expenses")}>
        <div className="expense-section">
          <div className="expense-section__root-input">
            <RootData
              rootData={getRootData}
              rootDataErrors={rootDataErrors}
              updateRootData={{ month: expenseMonth, year: expenseYear }}
              ref={rootDataRef}
            />
          </div>
          <div className="expense-section__tab-component">
            <Row>
              <Col>
                <div className="input-hints expense-section__input-hints">
                  <p>
                    <span>{t("note")}:</span>{" "}
                    {t("pleaseSelectInputToAddViewExpenses")}.
                  </p>
                </div>
                <Tab
                  tabCustomClass="budget-app-tab-component__expense"
                  tabActive="expense-tab"
                  tabLists={tabLists}
                />
              </Col>
            </Row>
          </div>
        </div>
        <RootDataContext.Provider
          value={{
            month: expenseMonth,
            year: expenseYear,
            closeExpenseModal: setOpenExpenseModal,
            closeGroceryModal: setOpenGroceryModal,
            selectedRecordData: selectedRecord,
          }}
        >
          <ExpenseModalWindow
            openModal={openExpenseModal}
            closeModalWindow={closeExpenseModalWindow}
          />
          <GroceryModalWindow
            openModal={openGroceryModal}
            closeModalWindow={closeGroceryModalWindow}
          />
        </RootDataContext.Provider>
      </MainLayout>
      <RecordDeleteScreen
        deleteScreenClasses="expense-section__delete-modal"
        recordId={selectedRecord && selectedRecord._id}
        recordNav=""
        ref={expenseDeleteScreenRef}
        deleteScreenContent={
          <>
            Do you want to delete the expense item -{" "}
            <b style={{ color: "#FF0000" }}>
              {selectedRecord && selectedRecord.particular}
            </b>
          </>
        }
        dataDispatchAction={expenseDeleteAction}
      />
      <RecordDeleteScreen
        deleteScreenClasses="grocery-section__delete-modal"
        recordId={selectedRecord && selectedRecord._id}
        recordNav=""
        ref={groceryDeleteScreenRef}
        deleteScreenContent={
          <>
            Do you want to delete the grocery item -{" "}
            <b style={{ color: "#FF0000" }}>
              {selectedRecord && selectedRecord.particulars}
            </b>
          </>
        }
        dataDispatchAction={groceryDeleteAction}
      />
    </>
  );
};

export default Expenses;
