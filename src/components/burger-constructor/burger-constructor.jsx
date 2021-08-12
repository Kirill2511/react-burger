import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropsTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTopping,
  getTotalPrice,
  sortToppings,
} from "../../services/actions/constructorActions";
import { openOrderModal } from "../../services/actions/modalActions";
import { getOrderDetails } from "../../services/actions/orderActions";
import MovableTopping from "../movable-topping/movable-topping";
import styles from "./burger-constructor.module.css";

const burger = (state) => state.burger;

const BurgerConstructor = (props) => {
  const { onDropHandler } = props;
  const dispatch = useDispatch();
  const { burgerData, totalPrice } = useSelector(burger);
  const { bun, toppings } = burgerData;

  const [, dropIngredientCard] = useDrop({
    accept: "ingredient-card",
    drop(itemId) {
      onDropHandler(itemId);
    },
  });
  const [, dropTopping] = useDrop({ accept: "sort-toppings" });

  useEffect(() => {
    dispatch(getTotalPrice(burgerData));
  }, [dispatch, burgerData]);

  const findTopping = useCallback(
    (id) => {
      const topping = toppings.find((topping) => topping._id === id);

      return {
        topping,
        index: toppings.indexOf(topping),
      };
    },
    [toppings]
  );

  const moveTopping = useCallback(
    (index, atIndex) => {
      dispatch(sortToppings(index, atIndex));
    },
    [dispatch]
  );

  const onSubmit = () => {
    dispatch(getOrderDetails(burgerData));
    dispatch(openOrderModal());
  };

  return (
    <section style={{ width: 600 }}>
      <div
        ref={dropIngredientCard}
        className={`${styles.ingredientsWrapper} mt-25`}
      >
        {bun._id && (
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
        <ul ref={dropTopping} className={styles.toppings}>
          {toppings.map((topping, index) => (
            <li
              /* eslint-disable-next-line react/no-array-index-key */
              key={`${topping._id}-${index}`}
              style={{ width: 568, marginRight: 18 }}
            >
              <MovableTopping
                toppingId={topping._id}
                toppingIndex={index}
                findTopping={findTopping}
                moveTopping={moveTopping}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={topping.name}
                  price={topping.price}
                  thumbnail={topping.image_mobile}
                  handleClose={() => dispatch(deleteTopping(index))}
                />
              </MovableTopping>
            </li>
          ))}
        </ul>
        {bun._id && (
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
      </div>
      <div className={`${styles.submitBlock} mt-10 mr-4`}>
        <span
          className={`${styles.totalPrice} text text_type_digits-medium mr-10`}
        >
          {totalPrice}&nbsp;
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={onSubmit}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propsTypes = {
  onDropHandler: PropsTypes.func,
};

export default BurgerConstructor;
