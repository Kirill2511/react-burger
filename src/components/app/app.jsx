import "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { useEffect, useState } from "react";

const App = () => {
  const [state, setState] = useState({
    data: [],
    hasError: false,
  });

  useEffect(() => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const getIngredientsData = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const { data } = await response.json();
          setState({ ...state, data });
        } else {
          throw new Error(`Ошибка: ${response.status}`)
        }
      } catch (error) {
        setState({ ...state, hasError: true });
      }
    }

    getIngredientsData();
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={state.data}
          hasError={state.hasError}
        />
        <BurgerConstructor
          ingredients={state.data}
          hasError={state.hasError}
        />
      </main>
    </>
  );
};

export default App;
