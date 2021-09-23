import { FC } from "react";

import SignLogin from "../../components/sign-login/sign-login";
import styles from "./page-login.module.css";

const PageLogin: FC = () => (
  <div className={styles.wrapper}>
    <SignLogin />
  </div>
);

export default PageLogin;
