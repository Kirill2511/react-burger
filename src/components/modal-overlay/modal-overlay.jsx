import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ handleOverlayClose, handleOverlayEnterClose }) => (
  <div
    aria-checked="false"
    aria-labelledby="foo"
    role="switch"
    className={styles.modalOverlay}
    onClick={handleOverlayClose}
    onKeyDown={handleOverlayEnterClose}
    onKeyPress={handleOverlayEnterClose}
    tabIndex="0"
  />
);

export default ModalOverlay;

ModalOverlay.propTypes = {
  // eslint-disable-next-line react/require-default-props
  handleOverlayClose: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  handleOverlayEnterClose: PropTypes.func,
};
