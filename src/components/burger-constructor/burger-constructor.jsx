import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../services/appContext";

const BurgerConstructor = () => {
  const { burgerData, totalPrice, dispatch } = useContext(AppContext);
  const { bun, toppings } = burgerData;

  useEffect(() => {
    const bunPrise = bun.price * 2 || 0;
    const toppingPrise = toppings.reduce((total, current) => {
      return total + current.price;
    }, 0);

    dispatch({
      type: "totalPrice",
      payload: bunPrise + toppingPrise,
    });
  }, [bun, toppings, dispatch]);

  const onSubmit = () => {
    const { bun } = burgerData;

    if (bun._id) {
      const requestData = {
        ingredients: Object.keys(burgerData).flatMap((ingredientType) => {
          switch (ingredientType) {
            case "bun":
              return burgerData.bun._id;
            case "toppings":
              return burgerData[ingredientType].map(
                (ingredient) => ingredient._id
              );
            default:
              return [];
          }
        }),
      };

      const request = new Request(
        "https://norma.nomoreparties.space/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );
      (async () => {
        try {
          const response = await fetch(request);

          if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
          }
          const data = await response.json();
          dispatch({ type: "order", payload: data });
        } catch (error) {
          dispatch({
            type: "orderError",
            payload: "Ошибка получения данных...",
          });
        }
      })();
    } else {
      dispatch({
        type: "orderError",
        payload: "Должна быть выбрана булка для бургера",
      });
    }
  };

  return (
    <section style={{ width: 600 }}>
      <div className={`${styles.ingredientsWrapper} mt-25`}>
        {bun._id && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
        <ul className={styles.toppings}>
          {toppings.map((topping, index) => (
            <li
              key={`${topping._id}-${index}`}
              style={{ width: 568, marginRight: 18 }}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={topping.name}
                price={topping.price}
                thumbnail={topping.image_mobile}
                handleClose={() =>
                  dispatch({
                    type: "deleteTopping",
                    payload: index,
                  })
                }
              />
            </li>
          ))}
        </ul>
        {bun._id && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ),
  hasError: PropTypes.bool,
};

export default BurgerConstructor;
