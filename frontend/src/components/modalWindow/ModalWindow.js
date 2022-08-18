import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./modal-window.scss";
import { useTranslation } from "react-i18next";

const ModalWindow = ({
  modalCustomClasses = "",
  showModal,
  closeModal,
  enableFullScreen = false,
  modalTitle = "",
  modalBody = "",
  modalFooter = "",
}) => {
  const { t } = useTranslation();
  const handleClose = () => closeModal();

  return (
    <Modal
      backdrop="static"
      centered
      fullscreen={enableFullScreen}
      show={showModal}
      onHide={handleClose}
      className={`budget-app-modal-window ${modalCustomClasses}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("close")}
        </Button>
        {modalFooter}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
