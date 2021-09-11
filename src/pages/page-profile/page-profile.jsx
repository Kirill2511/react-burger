import Menu from "../../components/menu/menu";
import styles from "./page-profile.module.css";

const PageProfile = ({ children }) => (
    <div className={styles.container}>
      <div className={styles.left}>
        <Menu />
      </div>
      {children}
    </div>
);

export default PageProfile;
