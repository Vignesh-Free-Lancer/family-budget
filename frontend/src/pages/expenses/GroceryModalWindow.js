import React, { useRef } from "react";
import "./expenses.scss";
import { useTranslation } from "react-i18next";

import ModalWindow from "../../components/modalWindow/ModalWindow";
import GroceryForm from "./GroceryForm";

const GroceryModalWindow = ({ openModal, closeModalWindow = () => {} }) => {
  const { t } = useTranslation();
  const groceryFormRef = useRef();

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
          {t("add")}
        </button>
      }
    />
  );
};

export default GroceryModalWindow;
