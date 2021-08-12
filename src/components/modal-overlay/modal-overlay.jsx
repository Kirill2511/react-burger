import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";

import styles from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  const { onClose } = props;
  const modalOverlayRef = useRef(document.createElement("div"));

  const onEscapeClose = useCallback(
    (event) => {
      const escapeKeyCode = 27;
      if (event.keyCode === escapeKeyCode) {
        onClose();
      }
    },
    [onClose]
  );

  const onOverlayClose = React.useCallback(
    ({ target }) => {
      if (modalOverlayRef.current === target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onEscapeClose);
    document.addEventListener("click", onOverlayClose);

    return () => {
      document.removeEventListener("keydown", onEscapeClose);
      document.removeEventListener("click", onOverlayClose);
    };
  });

  return <div ref={modalOverlayRef} className={styles.overlay} />;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
