import React, { FC } from "react";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./page-ingredient.module.css";

const IngredientPage: FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Детали ингредиента</h1>
    <IngredientDetails />
  </div>
);

export default IngredientPage;
