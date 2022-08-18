import React, { useRef } from "react";
import "./expenses.scss";
import { useTranslation } from "react-i18next";

import ModalWindow from "../../components/modalWindow/ModalWindow";
import ExpenseForm from "./ExpenseForm";

const ExpenseModalWindow = ({ openModal, closeModalWindow = () => {} }) => {
  const { t } = useTranslation();
  const expenseFormRef = useRef();

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
          {t("add")}
        </button>
      }
    />
  );
};

export default ExpenseModalWindow;
