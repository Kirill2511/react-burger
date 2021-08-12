import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showIngredientInfo } from "../../services/actions/ingredientsActions";
import { openIngredientModal } from "../../services/actions/modalActions";
import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./burger-ingredients.module.css";

const ingredient = (state) => state.ingredients;

const BurgerIngredients = () => {
  const [nearestTab, setNearestTab] = useState("bun");
  const dispatch = useDispatch();
  const { ingredients, ingredientsError } = useSelector(ingredient);

  const scrollContainerRef = useRef(null);
  const bunsHeaderRef = useRef(null);
  const saucesHeaderRef = useRef(null);
  const mainsHeaderRef = useRef(null);

  const handleScroll = () => {
    const scrollContainerPosition =
      scrollContainerRef.current.getBoundingClientRect().top;

    const bunHeaderPosition = bunsHeaderRef.current.getBoundingClientRect().top;
    const sauceHeaderPosition =
      saucesHeaderRef.current.getBoundingClientRect().top;
    const mainHeaderPosition =
      mainsHeaderRef.current.getBoundingClientRect().top;

    const bunsDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
    const saucesDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
    const mainsDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);

    if (bunsDiff < saucesDiff) {
      setNearestTab("bun");
    } else if (saucesDiff < mainsDiff) {
      setNearestTab("sauce");
    } else {
      setNearestTab("main");
    }
  };

  const onIngredientCardClick = useCallback(
    (data) => {
      dispatch(showIngredientInfo(data));
      dispatch(openIngredientModal());
    },
    [dispatch]
  );

  if (ingredientsError) {
    return (
      <section style={{ width: 600 }}>
        <h1 style={{ height: 40 }} className="text text_type_main-large">
          {ingredientsError}
        </h1>
      </section>
    );
  }

  return (
    <section style={{ width: 600 }} className="mr-10">
      <h1
        style={{ height: 40 }}
        className="text text_type_main-large mt-10 mb-5"
      >
        Соберите бургер
      </h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={nearestTab === "bun"} onClick={() => {}}>
          Булки
        </Tab>
        <Tab value="sauce" active={nearestTab === "sauce"} onClick={() => {}}>
          Соусы
        </Tab>
        <Tab value="main" active={nearestTab === "main"} onClick={() => {}}>
          Начинки
        </Tab>
      </div>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={styles.ingredientsWrapper}
      >
        <h3
          ref={bunsHeaderRef}
          className={`${styles.subtitle} text text_type_main-medium`}
        >
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
        <h3
          ref={saucesHeaderRef}
          className={`${styles.subtitle} text text_type_main-medium`}
        >
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
        <h3
          ref={mainsHeaderRef}
          className={`${styles.subtitle} text text_type_main-medium`}
        >
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

export default BurgerIngredients;
