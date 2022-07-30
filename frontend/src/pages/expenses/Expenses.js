import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./expenses.scss";

import MainLayout from "../../layouts/mainLayout/MainLayout";
import RootData from "../../components/rootData/RootData";
import Tab from "../../components/tab/Tab";
import AddImportData from "../../components/addImportData/AddImportData";
import ExpenseModalWindow from "./ExpenseModalWindow";
import GroceryModalWindow from "./GroceryModalWindow";

import BootstrapTableComp from "../../components/bootstrapTable/BootstrapTable";

const Expenses = (props) => {
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
      text: "Particular",
    },
    {
      dataField: "estimatedCost",
      text: "Estimated Cost",
      key: "currency",
    },
    {
      dataField: "actualCost",
      text: "Actual Cost",
      key: "currency",
    },
    {
      dataField: "paymentType",
      text: "Payment Type",
    },
    {
      dataField: "paymentDate",
      text: "Payment Date",
      key: "date",
    },
    {
      dataField: "paymentBank",
      text: "Payment Bank",
    },
    {
      dataField: "description",
      text: "Description",
    },
  ];

  const groceryColumns = [
    {
      dataField: "particular",
      text: "Particular",
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "priceType",
      text: "Price Type",
    },
    {
      dataField: "unitPrice",
      text: "Unit Price",
      key: "currency",
    },
    {
      dataField: "totalPrice",
      text: "Total Price",
      key: "currency",
    },
  ];

  const tabLists = [
    {
      title: "Expense Lists",
      eventKey: "expense-tab",
      content: (
        <>
          <AddImportData
            addImportCustomClass="text-right expense-section__add-import-comp"
            customFirstTitle="Copy expenses data"
            customSecondTitle="Add new expense"
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
      title: "Grocery Lists",
      eventKey: "grocery-tab",
      content: (
        <>
          <AddImportData
            addImportCustomClass="text-right expense-section__add-import-comp"
            customFirstTitle="Copy grocery data"
            customSecondTitle="Add new grocery"
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
    <MainLayout title="Expenses">
      <div className="expense-section">
        <div className="expense-section__root-input">
          <RootData rootData={getRootData} />
        </div>
        <div className="expense-section__tab-component">
          <Row>
            <Col>
              <div className="input-hints expense-section__input-hints">
                <p>
                  <span>Note:</span> Please select month & year in the above
                  section, do add or view expense and grocery items.
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
