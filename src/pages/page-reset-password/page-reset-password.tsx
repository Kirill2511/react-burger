import { FC } from "react";

import SignResetPassword from "../../components/sign-reset-password/sign-reset-password";
import styles from "./page-reset-password.module.css";

const PageResetPassword: FC = () => (
  <div className={styles.wrapper}>
    <SignResetPassword />
  </div>
);

export default PageResetPassword;
