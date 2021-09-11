import styles from "./error.module.css";

const Error = () => (
  <div className={styles.error}>
    <h2 className="text text_type_main-large">Ошибка</h2>
    <h3 className="text text_type_main-default">Увы, но эта страница где-то затерялась</h3>
  </div>
);

export default Error;
