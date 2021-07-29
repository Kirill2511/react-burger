import "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { useEffect, useState } from "react";

const App = ({ ingredients }) => {
  const [state, setState] = useState({
    ingredientData: [],
    hasError: false,
  });

  useEffect(() => {
    const getIngredientsData = async () => {
      setState({ ...state, hasError: false });
      const res = await fetch(
        "https://norma.nomoreparties.space/api/ingredients"
      );
      const data = await res.json();
      setState({ ingredientData: data.data, hasError: false });
    };

    getIngredientsData();
  }, [ingredients]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={state.ingredientData} hasError={state.hasError} />
        <BurgerConstructor ingredients={state.ingredientData} hasError={state.hasError} />
      </main>
    </>
  );
};

export default App;
