import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { useState } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = (props) => {
  const { ingredients, hasError } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let totalPrice = 2510;

  const randToppings = ingredients.slice(1, ingredients.length + 1);

  totalPrice += randToppings.reduce((total, current) => {
    return total + current.price;
  }, 0);

  if (hasError) {
    return (
      <section style={{ width: 600 }}>
        <h1 style={{ height: 40 }} className="text text_type_main-large">
          Ошибка получения данных...
        </h1>
      </section>
    );
  }

  return (
    <section style={{ width: 600 }}>
      <div className={`${styles.ingredientsWrapper} mt-25`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
        />
        <ul className={styles.toppings}>
          {randToppings.map((topping) => (
            <li key={topping._id} style={{ width: 568, marginRight: 18 }}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={topping.name}
                price={topping.price}
                thumbnail={topping.image_mobile}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={1255}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
        />
      </div>
      <div className={`${styles.submitBlock} mt-10 mr-4`}>
        <span
          className={`${styles.totalPrice} text text_type_digits-medium mr-10`}
        >
          {totalPrice}&nbsp;
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          onClick={() => setModalIsOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {modalIsOpen ? (
        <Modal onClose={() => setModalIsOpen(false)}>
          <OrderDetails />
        </Modal>
      ) : null}
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
