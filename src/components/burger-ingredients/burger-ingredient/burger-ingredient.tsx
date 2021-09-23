import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useDrag } from "react-dnd";
import { useHistory } from "react-router-dom";

import { TIngredient } from "../../../redux/types";
import styles from "./burger-ingredient.module.css";

const style = {
  cursor: "move",
};

interface IIngredientItem {
  itemData: TIngredient;
  itemCounter?: number;
  onItemClick: () => void;
}

const BurgerIngredient: FC<IIngredientItem> = ({ itemData, itemCounter, onItemClick }) => {
  const history = useHistory();
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: itemData,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  function handleClick() {
    onItemClick();
    history.replace(`/ingredients/${itemData._id}`, { background: true });
  }
  const opacity = isDragging ? 0.2 : 1;

  return (
    <li
      className={styles.item}
      aria-hidden="true"
      role="presentation"
      onClick={handleClick}
      ref={dragRef}
      style={{ ...style, opacity }}
    >
      {itemCounter && itemCounter > 0 ? <Counter count={itemCounter} size="default" /> : null}
      <img src={itemData.image} className={`${styles.item_image}`} alt={itemData.name} />

      <p className={`text text_type_digits-default ${styles.item_description} mt-1 mb-1`}>
        <span className="mr-2">{itemData.price}</span>
        <CurrencyIcon type="secondary" />
      </p>

      <h3 className={`text text_type_main-default ${styles.item_name}`}>{itemData.name}</h3>
    </li>
  );
};

export default BurgerIngredient;
