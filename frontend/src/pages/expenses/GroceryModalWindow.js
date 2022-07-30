import React, { useRef } from "react";
import "./expenses.scss";

import ModalWindow from "../../components/modalWindow/ModalWindow";
import GroceryForm from "./GroceryForm";

const GroceryModalWindow = ({ openModal, closeModalWindow = () => {} }) => {
  const groceryFormRef = useRef();
  return (
    <ModalWindow
      modalCustomClasses="expense-section-modal-window"
      showModal={openModal}
      closeModal={closeModalWindow}
      enableFullScreen={true}
      modalTitle="Add Grocery"
      modalBody={<GroceryForm ref={groceryFormRef} />}
      modalFooter={
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            groceryFormRef.current.triggerNewGrocery();
          }}
        >
          Add
        </button>
      }
    />
  );
};

export default GroceryModalWindow;
