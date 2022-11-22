import React, { useContext, useRef } from "react";
import "./expenses.scss";
import { useTranslation } from "react-i18next";

import ModalWindow from "../../components/modalWindow/ModalWindow";
import ExpenseForm from "./ExpenseForm";
import { RootDataContext } from "./Expenses";

const ExpenseModalWindow = ({ openModal, closeModalWindow = () => {} }) => {
  // Get translation locale
  const { t } = useTranslation();

  // Pass child comp reference to parent component
  const expenseFormRef = useRef();

  // Get Expense RootData From Context
  const { selectedRecordData } = useContext(RootDataContext);

  return (
    <ModalWindow
      modalCustomClasses="expense-section-modal-window"
      showModal={openModal}
      closeModal={closeModalWindow}
      enableFullScreen={true}
      modalTitle={t("addExpense")}
      modalBody={<ExpenseForm ref={expenseFormRef} />}
      modalFooter={
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            expenseFormRef.current.triggerNewExpense();
          }}
        >
          {!selectedRecordData ? t("add") : t("update")}
        </button>
      }
    />
  );
};

export default ExpenseModalWindow;
