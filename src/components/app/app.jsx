import './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";


const App = () => {
  return (
      <>
      <AppHeader />
      <main style={{display: 'flex', justifyContent: 'center'}}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
      </>
  );
}

export default App;
