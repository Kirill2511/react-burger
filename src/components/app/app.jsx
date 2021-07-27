import './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"


const App = () => {
  return (
      <>
      <AppHeader />
      <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
      </>
  );
}

export default App;
