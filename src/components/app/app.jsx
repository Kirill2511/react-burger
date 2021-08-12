import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

import { addIngredient } from "../../services/actions/constructorActions";
import { getIngredients } from "../../services/actions/ingredientsActions";
import { closeModal } from "../../services/actions/modalActions";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./app.module.css";

const ingredient = state => state.ingredients;
const modal = (state) => state.modal;

const App = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(ingredient);
  const { modalIsOpen, modalMode } = useSelector(modal);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleDrop = (itemId) => {
    dispatch(
      addIngredient(
        ingredients.find((ingredient) => ingredient._id === itemId.id)
      )
    );
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={handleDrop} />
        </DndProvider>
      </main>
      {modalIsOpen && modalMode === "ingredient-details" ? (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(closeModal())}
        >
          <IngredientDetails />
        </Modal>
      ) : null}
      {modalIsOpen && modalMode === "order-details" ? (
        <Modal onClose={() => dispatch(closeModal())}>
          <OrderDetails />
        </Modal>
      ) : null}
    </>
  );
};

export default App;
