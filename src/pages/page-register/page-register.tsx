import {FC} from "react";

import SignRegister from "../../components/sign-register/sign-register";
import styles from "./page-register.module.css"

const PageRegister: FC = () => (
  <div className={styles.wrapper}>
    <SignRegister />
  </div>
);

export default PageRegister;
