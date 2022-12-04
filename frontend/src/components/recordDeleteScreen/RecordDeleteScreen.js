import { t } from "i18next";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalWindow from "../../components/modalWindow/ModalWindow";

const RecordDeleteScreen = forwardRef((props, ref) => {
  // Dispatch the action to redux
  const dispatch = useDispatch();

  // Navigate to another page without redirection using react-router-dom
  const navigate = useNavigate();

  // Get props data & event from parent component
  const {
    deleteScreenClasses,
    recordId,
    recordNav,
    deleteScreenContent,
    dataDispatchAction,
  } = props;

  // State object for modal window
  const [openModal, setOpenModal] = useState(false);

  // Use forwardRef to pass event from child to parent
  useImperativeHandle(ref, () => ({
    // Show the modal window screen
    openModalWindow() {
      setOpenModal(true);
    },
  }));

  // Close the modal window screen
  const closeModalWindow = () => {
    setOpenModal(false);
    // updateDeleteScreen(false);
  };

  // Delete selected record information data
  const deleteRecordData = (e) => {
    e.preventDefault();
    setOpenModal(false);

    dispatch(dataDispatchAction(recordId));
    recordNav && navigate(recordNav);
  };

  return (
    <>
      <ModalWindow
        modalCustomClasses={deleteScreenClasses}
        showModal={openModal}
        closeModal={closeModalWindow}
        modalTitle={t("confirmDelete")}
        modalBody={deleteScreenContent}
        modalFooter={
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteRecordData}
          >
            {t("confirm")}
          </button>
        }
      />
    </>
  );
});

export default RecordDeleteScreen;
