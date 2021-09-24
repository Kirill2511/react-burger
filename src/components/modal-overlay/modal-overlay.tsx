import { FC } from "react";

import styles from "./modal-overlay.module.css";

interface IModalOverlay {
  closeModal: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ closeModal }) => (
  <div aria-hidden="true" role="presentation" className={styles.modal_overlay} onClick={closeModal} />
);

export default ModalOverlay;
