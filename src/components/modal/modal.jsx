import PropTypes from "prop-types";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalPortal = document.querySelector("#modal-root");

const Modal = ({ modalHeader = null, handleClose, children }) => {
  const history = useHistory();

  useEffect(() => {
    const closeCallbackModalEscape = (e) => {
      if (e.key === "Escape" || e.code === "NumpadEnter") {
        e.preventDefault();
        handleClose();
        history.goBack();
      }
    };

    document.addEventListener("keydown", closeCallbackModalEscape);

    return () => {
      document.removeEventListener("keydown", closeCallbackModalEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClose]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <ModalOverlay handleOverlayClose={handleClose} handleOverlayEnterClose={handleClose} />
      <div className={`${styles.modal__content} scrollbar-vertical`}>
        <button aria-label="Close" type="button" className={styles.modal__close} onClick={handleClose} title="Close" />
        {modalHeader && <h2 className={`${styles.modal__title} text text_type_main-large`}>{modalHeader}</h2>}
        {children}
      </div>
    </div>,
    modalPortal
  );
};

export default Modal;

Modal.propTypes = {
  // eslint-disable-next-line react/require-default-props
  modalHeader: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  handleClose: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.element,
};
