import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

function ModalOverlay({ closeModal }) {
  return (
    <div aria-hidden="true" role="presentation" className={styles.modal_overlay} onClick={closeModal} />
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
