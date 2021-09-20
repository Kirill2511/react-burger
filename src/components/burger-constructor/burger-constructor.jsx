import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import { ADD_CONSTRUCTOR_INGREDIENT, SWAP_CONSTRUCTOR_INGREDIENT } from "../../redux/action-types";
import {getStateCart} from "../../redux/selectors";
import styles from "./burger-constructor.module.css";
import ConstructorItem from "./burger-constructor-item/burger-constructor-item";
import ConstructorItemSwap from "./burger-constructor-item-swap/burger-constructor-item-swap";

function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();
  const cart = useSelector(getStateCart);
  const prodData = [...cart.data];

  const onDropHandler = (data) => dispatch({ type: ADD_CONSTRUCTOR_INGREDIENT, payload: data });
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: onDropHandler,
  });

  const coverData = Object.keys(cart.sortedData.bun).length > 0 ? [cart.sortedData.bun] : [cart.sortedData.empty];

  const middleData = prodData && Array.isArray(prodData) && cart.sortedData.fillers;
  const totalBurgerPrice = useMemo(
    () =>
      Array.isArray(prodData) && [...coverData, ...middleData, ...coverData].reduce((sum, item) => sum + item.price, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coverData, middleData]
  );

  const moveElem = (dragIndex, hoverIndex) =>
    dispatch({ type: SWAP_CONSTRUCTOR_INGREDIENT, payload: { dragIndex, hoverIndex } });

  const renderMiddle = (item, indx) => (
    <ConstructorItemSwap
      key={indx}
      itemData={item}
      handlerId={indx}
      moveElem={moveElem}
      index={indx}
      id={item._id}
    />
  );

  return (
    <section className={`${styles.container} pt-25`} ref={dropTarget}>
      <ul className={styles.item_list}>
        {coverData &&
          Array.isArray(coverData) &&
          coverData.map((item) => <ConstructorItem key={item._id} itemData={item} type="top" isLocked />)}
        <li className="mb-4" key="middle">
          <ul className={styles.scroll_list}>
            {middleData &&
              Array.isArray(middleData) &&
              middleData.map((element, index) => renderMiddle(element, index))}
          </ul>
        </li>

        {coverData &&
          Array.isArray(coverData) &&
          coverData.map((item) => <ConstructorItem key={item._id} itemData={item} type="bottom" isLocked />)}
      </ul>
      <div className={`${styles.checkout_container} pr-8`}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">{totalBurgerPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
