import {FC} from "react";
import SignForgotPassword from "../../components/sign-forgot-password/sign-forgot-password";
import styles from "./page-forgot-password.module.css"

const PageForgotPassword: FC = () => (
  <div className={styles.wrapper}>
    <SignForgotPassword />
  </div>
);

export default PageForgotPassword;
