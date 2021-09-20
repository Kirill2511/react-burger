import SignLogin from "../../components/sign-login/sign-login";
import styles from "./page-login.module.css"


function PageLogin() {
  return (
    <div className={styles.wrapper}>
      <SignLogin />
    </div>
  );
}

export default PageLogin;
