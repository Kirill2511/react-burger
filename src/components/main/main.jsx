import PropTypes from "prop-types";

import styles from "./main.module.css";

const Main = ({ children }) => (
    <main className={styles.main}>
      <section className={`container ${styles.main__container} pt-5`}>{children}</section>
    </main>
  );

export default Main;

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
