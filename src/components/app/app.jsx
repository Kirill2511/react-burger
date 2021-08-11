import { useEffect, useReducer } from "react";
import { appReducer } from "../../services/appReduce";
import { AppContext } from "../../services/appContext";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredients-details/ingredients-details";
import OrderDetails from "../order-details/order-details";

const initialState = {
  ingredients: [],
  ingredientsError: "",
  ingredientInfo: {},
  burgerData: {
    bun: {},
    toppings: [],
  },
  orderDetails: null,
  orderError: "",
  modalMode: "",
  modalIsOpen: false,
  totalPrice: 0,
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState, undefined);

  useEffect(() => {
    const request = new Request(
      "https://norma.nomoreparties.space/api/ingredients"
    );
    const getIngredientsData = async () => {
      try {
        const response = await fetch(request);

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const { data } = await response.json();
        dispatch({ type: "ingredientsGet", payload: data });
      } catch (error) {
        dispatch({
          type: "ingredientsError",
          payload: "Ошибка получения данных...",
        });
      }
    };

    getIngredientsData();
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <AppContext.Provider
          value={{
            ingredients: state.ingredients,
            ingredientsError: state.ingredientsError,
            burgerData: state.burgerData,
            modalIsOpen: state.modalIsOpen,
            totalPrice: state.totalPrice,
            dispatch,
          }}
        >
          <BurgerIngredients />
          <BurgerConstructor />
        </AppContext.Provider>
      </main>
      {state.modalIsOpen && state.modalMode === "ingredient-details" ? (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch({ type: "closeModal" })}
        >
          <IngredientDetails data={state.ingredientInfo} />
        </Modal>
      ) : null}
      {state.modalIsOpen && state.modalMode === "order-details" ? (
        <Modal onClose={() => dispatch({ type: "closeModal" })}>
          <OrderDetails
            orderDetails={state.orderDetails}
            orderError={state.orderError}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default App;
