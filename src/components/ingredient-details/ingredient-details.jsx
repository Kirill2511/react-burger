import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ingredient-details.module.css";

const ingredients = (store) => store.data;

const IngredientDetails = () => {
  const { id } = useParams();
  const { data } = useSelector(ingredients);
  const item = data.find((el) => el._id === id);
  // eslint-disable-next-line babel/camelcase
  const { image_large, name, calories, proteins, fat, carbohydrates } = item || {};

  return (
    <div className={styles.ingredientDetails}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <div className={styles.ingredientDetails__body}>
        <picture className={`${styles.ingredientDetails__pict} mb-4`}>
          {/* eslint-disable-next-line babel/camelcase */}
          <img className={styles.ingredientDetails__img} loading="lazy" src={image_large} alt={name} />
        </picture>
        <h3 className={`${styles.ingredientDetails__name} text text_type_main-medium`}>{name}</h3>
        <ul className={`${styles.ingredientDetails__list} text_color_inactive`}>
          <li className={styles.ingredientDetails__item}>
            <span className={styles.ingredientDetails__text}>Калории,ккал</span>
            <span className={`${styles.ingredientDetails__value} text text_type_digits-default mt-2`}>{calories}</span>
          </li>
          <li className={styles.ingredientDetails__item}>
            <span className={styles.ingredientDetails__text}>Белки, г</span>
            <span className={`${styles.ingredientDetails__value} text text_type_digits-default mt-2`}>{proteins}</span>
          </li>
          <li className={styles.ingredientDetails__item}>
            <span className={styles.ingredientDetails__text}>Жиры, г</span>
            <span className={`${styles.ingredientDetails__value} text text_type_digits-default mt-2`}>{fat}</span>
          </li>
          <li className={styles.ingredientDetails__item}>
            <span className={styles.ingredientDetails__text}>Углеводы, г</span>
            <span className={`${styles.ingredientDetails__value} text text_type_digits-default mt-2`}>
              {carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
