import PropTypes from "prop-types";

import styles from "./burger-ingredients-category.module.css";

const BurgerIngredientsCategory = ({ categoryHeader, children }) => (
  <div className={styles.category}>
    <div className="mb-6">{categoryHeader && <h2 className={`${styles.category__title}`}>{categoryHeader}</h2>}</div>
    <div className={styles.category__columns}>{children}</div>
  </div>
);

export default BurgerIngredientsCategory;

BurgerIngredientsCategory.propTypes = {
  // eslint-disable-next-line react/require-default-props
  categoryHeader: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};
