import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useHistory } from "react-router-dom";

import styles from "./burger-ingredient.module.css";

const style = {
  cursor: "move",
};

const BurgerIngredient = ({ itemData, itemCounter, onItemClick }) => {
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

BurgerIngredient.propTypes = {
  // eslint-disable-next-line react/require-default-props
  item: PropTypes.shape({
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }),
};
