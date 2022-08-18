import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";
import { useTranslation } from "react-i18next";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import RootData from "../../components/rootData/RootData";
import Tab from "../../components/tab/Tab";
import AddImportData from "../../components/addImportData/AddImportData";
import ExpenseModalWindow from "./ExpenseModalWindow";
import GroceryModalWindow from "./GroceryModalWindow";

import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";

const Expenses = (props) => {
  const { t } = useTranslation();

  // State Object For Month & Year
  const [salaryMonth, setSalaryMonth] = useState();
  const [salaryYear, setSalaryYear] = useState();

  // State Obejct For Handling Expense Error
  const [expenseErrors, setExpensErrors] = useState({});

  const getRootData = (month, year, rootErrors) => {
    setSalaryMonth(month);
    setSalaryYear(year);
    setExpensErrors(rootErrors);
  };

  // State Object For Expense Modal Window
  const [openExpenseModal, setOpenExpenseModal] = useState(false);

  // Show The Expense Modal Window Screen
  const openExpenseModalWindow = () => {
    setOpenExpenseModal(true);
  };

  // Close The Expense Modal Window Screen
  const closeExpenseModalWindow = () => {
    setOpenExpenseModal(false);
  };

  // State Object For Grocery Modal Window
  const [openGroceryModal, setOpenGroceryModal] = useState(false);

  // Show The Grocery Modal Window Screen
  const openGroceryModalWindow = () => {
    setOpenGroceryModal(true);
  };

  // Close The Grocery Modal Window Screen
  const closeGroceryModalWindow = () => {
    setOpenGroceryModal(false);
  };

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
      key: "date",
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

  const groceryColumns = [
    {
      dataField: "particular",
      text: t("particular"),
    },
    {
      dataField: "quantity",
      text: t("quantity"),
    },
    {
      dataField: "priceType",
      text: t("priceType"),
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
          />
          <BootstrapTableComp
            headerColumns={expenseColumns}
            bootstrapCustomClasses="expense-section__boot-table"
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
          />
          <BootstrapTableComp
            headerColumns={groceryColumns}
            bootstrapCustomClasses="expense-section__boot-table"
          />
        </>
      ),
    },
  ];

  return (
    <MainLayout title={t("expenses")}>
      <div className="expense-section">
        <div className="expense-section__root-input">
          <RootData rootData={getRootData} />
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
      <ExpenseModalWindow
        openModal={openExpenseModal}
        closeModalWindow={closeExpenseModalWindow}
      />
      <GroceryModalWindow
        openModal={openGroceryModal}
        closeModalWindow={closeGroceryModalWindow}
      />
    </MainLayout>
  );
};

export default Expenses;
