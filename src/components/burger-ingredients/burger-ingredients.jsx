import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { AppContext } from "../../services/appContext";

const BurgerIngredients = () => {
  const { ingredients, dispatch } = useContext(AppContext);

  const onIngredientCardClick = useCallback(
    (data) => {
      switch (data.type) {
        case "bun":
          dispatch({ type: "addBun", payload: data });
          break;
        case "sauce":
        case "main":
          dispatch({ type: "addTopping", payload: data });
          break;
        default:
          break;
      }
    },
    [dispatch]
  );

  return (
    <section style={{ width: 600 }} className="mr-10">
      <h1
        style={{ height: 40 }}
        className="text text_type_main-large mt-10 mb-5"
      >
        Соберите бургер
      </h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={true} onClick={() => {}}>
          Булки
        </Tab>
        <Tab value="sauce" active={false} onClick={() => {}}>
          Соусы
        </Tab>
        <Tab value="main" active={false} onClick={() => {}}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredientsWrapper}>
        <h3 className={`${styles.subtitle} text text_type_main-medium`}>
          Булки
        </h3>
        <ul className={styles.ingredientsBlock}>
          {ingredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((bunItem) => (
              <IngredientCard
                key={bunItem._id}
                data={bunItem}
                onClick={onIngredientCardClick}
              />
            ))}
        </ul>
        <h3 className={`${styles.subtitle} text text_type_main-medium`}>
          Соусы
        </h3>
        <ul className={styles.ingredientsBlock}>
          {ingredients
            .filter((ingredient) => ingredient.type === "sauce")
            .map((sauceItem) => (
              <IngredientCard
                key={sauceItem._id}
                data={sauceItem}
                onClick={onIngredientCardClick}
              />
            ))}
        </ul>
        <h3 className={`${styles.subtitle} text text_type_main-medium`}>
          Начинка
        </h3>
        <ul className={styles.ingredientsBlock}>
          {ingredients
            .filter((ingredient) => ingredient.type === "main")
            .map((mainItem) => (
              <IngredientCard
                key={mainItem._id}
                data={mainItem}
                onClick={onIngredientCardClick}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired
  ),
  hasError: PropTypes.bool,
};

export default BurgerIngredients;
