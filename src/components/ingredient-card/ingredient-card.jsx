import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

import styles from "./ingredient-card.module.css";

const burger = (state) => state.burger;

const IngredientCard = (props) => {
  const { data, onClick } = props;
  const [count, setCount] = useState(0);
  const { burgerData } = useSelector(burger);

  const [{opacity}, dragIngredientCard] = useDrag({
    type: "ingredient-card",
    item: { id: data._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  useEffect(() => {
    const { bun, toppings } = burgerData;

    if (data.type === "bun") {
      setCount(
        Object.values(bun).filter((value) => value === data._id).length * 2
      );
    } else {
      setCount(toppings.filter((topping) => topping._id === data._id).length);
    }
  }, [burgerData, data]);

  return (
    <div
      onClick={() => onClick(data)}
      ref={dragIngredientCard}
      style={{ overflow: "hidden", opacity }}
      role="presentation"
    >
      <li className={`${styles.ingredientCard}`}>
        <img className="ml-4 mr-4" src={data.image} alt={data.name} />
        <span
          style={{ display: "flex" }}
          className="text text_type_digits-default mt-1 mb-1"
        >
          {data.price}&nbsp;
          <CurrencyIcon type="primary" />
        </span>
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          {data.name}
        </span>
        {count > 0 && <Counter count={count} size="default" />}
      </li>
    </div>
  );
};

IngredientCard.propTypes = {
  data: PropTypes.shape({
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
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(IngredientCard);
