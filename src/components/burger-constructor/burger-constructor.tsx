import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "../../utils/hooks";

import { addConstructorIngredient, swapConstructorIngredient } from "../../redux/actions";
import ConstructorItem from "./burger-constructor-item/burger-constructor-item";
import ConstructorItemSwap from "./burger-constructor-item-swap/burger-constructor-item-swap";
import { TIngredient } from "../../redux/types";
import styles from "./burger-constructor.module.css";

interface IBurgerConstructor {
  openModal: () => void;
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ openModal }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const prodData = [...cart.data];

  const onDropHandler = (data: TIngredient) => dispatch(addConstructorIngredient(data));
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: onDropHandler,
  });

  const coverData = Object.keys(cart.sortedData.bun).length > 0 ? [cart.sortedData.bun] : [cart.sortedData.empty];

  const middleData = prodData && Array.isArray(prodData) && cart.sortedData.fillers;
  const totalBurgerPrice = useMemo(
    () =>
      Array.isArray(prodData) && [...coverData, ...middleData, ...coverData].reduce((sum, item) => sum + item.price, 0),
    [coverData, middleData]
  );

  const moveElem = (dragIndex: number, hoverIndex: number) =>
    dispatch(swapConstructorIngredient(dragIndex, hoverIndex));

  const renderMiddle = (item: TIngredient, indx: number) => (
    <ConstructorItemSwap key={indx} itemData={item} handlerId={indx} moveElem={moveElem} index={indx} id={item._id} />
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
};

export default BurgerConstructor;
