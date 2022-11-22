import React, { useContext, useRef } from "react";
import "./expenses.scss";
import { useTranslation } from "react-i18next";

import ModalWindow from "../../components/modalWindow/ModalWindow";
import GroceryForm from "./GroceryForm";
import { RootDataContext } from "./Expenses";

const GroceryModalWindow = ({ openModal, closeModalWindow = () => {} }) => {
  // Get translation locale
  const { t } = useTranslation();

  // Pass child comp reference to parent component
  const groceryFormRef = useRef();

  // Get Expense RootData From Context
  const { selectedRecordData } = useContext(RootDataContext);

  return (
    <ModalWindow
      modalCustomClasses="expense-section-modal-window"
      showModal={openModal}
      closeModal={closeModalWindow}
      enableFullScreen={true}
      modalTitle={t("addGrocery")}
      modalBody={<GroceryForm ref={groceryFormRef} />}
      modalFooter={
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            groceryFormRef.current.triggerNewGrocery();
          }}
        >
          {!selectedRecordData ? t("add") : t("update")}
        </button>
      }
    />
  );
};

export default GroceryModalWindow;
