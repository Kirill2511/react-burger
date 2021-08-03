import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const Modal = (props) => {
  const { children, title, onClose } = props;
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div
          className={`text text_type_main-large
                            ${title ? styles.withTitle : styles.withoutTitle}`}
        >
          {title}

          <button
              type="button"
              className={styles.modalButton}
              onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: "",
};

export default Modal;
