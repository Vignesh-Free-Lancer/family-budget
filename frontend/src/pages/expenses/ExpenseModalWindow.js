import React, { useRef } from "react";
import "./expenses.scss";

import ModalWindow from "../../components/modalWindow/ModalWindow";
import ExpenseForm from "./ExpenseForm";

const ExpenseModalWindow = ({ openModal, closeModalWindow = () => {} }) => {
  const expenseFormRef = useRef();

  return (
    <ModalWindow
      modalCustomClasses="expense-section-modal-window"
      showModal={openModal}
      closeModal={closeModalWindow}
      enableFullScreen={true}
      modalTitle="Add Expense"
      modalBody={<ExpenseForm ref={expenseFormRef} />}
      modalFooter={
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            expenseFormRef.current.triggerNewExpense();
          }}
        >
          Add
        </button>
      }
    />
  );
};

export default ExpenseModalWindow;
