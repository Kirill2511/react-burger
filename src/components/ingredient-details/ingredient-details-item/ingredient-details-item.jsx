import styles from "./ingredient-details-item.module.css"

const IngredientDetailsItem = ({ title, value }) => (
  <li className={styles.details_list_item}>
    <p className="text text_type_main-default text_color_inactive">
      {title}
    </p>
    <p className="text text_type_digits-default text_color_inactive">
      {value}
    </p>
  </li>
);

export default IngredientDetailsItem;