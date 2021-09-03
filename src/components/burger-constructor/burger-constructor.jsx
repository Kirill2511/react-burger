import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addBun, addtem, resetState } from "../../services/actions/dataActions";
import { closeOrderModal, openOrderModal } from "../../services/actions/modalOrderActions";
import { getOrder, setOrderItems } from "../../services/actions/orderActions";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import Error from "../error/error";
import Loader from "../loader/loader";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Spinner from "../spinner/spinner";
import TotalPrice from "../total-price/total-price";
import styles from "./burger-constructor.module.css";

const user = (state) => state.user;
const modalOrder = (store) => store.modalOrder;
const order = (store) => store.order;
const data = (store) => store.data;

// eslint-disable-next-line sonarjs/cognitive-complexity
const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { items, bun } = useSelector(data);
  const { orderId, itemsId, hasError, isLoading } = useSelector(order);
  const { isModalOrderOpened } = useSelector(modalOrder);
  const { isLoggined } = useSelector(user);

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const itemsPrice = items ? items.reduce((acc, val) => acc + val.price, 0) : 0;
    return itemsPrice + bunPrice;
  }, [items, bun]);

  useEffect(() => {
    const order = items.map((item) => item._id);
    // eslint-disable-next-line babel/no-unused-expressions
    bun && order.push(bun._id);
    dispatch(setOrderItems(order));
  }, [dispatch, items, bun]);

  const handleDrop = (item) => {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (item.type) {
      case "bun":
        return dispatch(addBun(item));

      default:
        return dispatch(addtem(item));
    }
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      handleDrop(item);
    },
  });

  const bgColor = isHover && "rgba(0, 0, 0, .5)";

  const makeOrder = () => {
    dispatch(
      getOrder({
        ingredients: itemsId,
      })
    );
    dispatch(openOrderModal());
  };

  const closeModal = () => {
    dispatch(closeOrderModal());
    dispatch(resetState());
  };

  return (
    <section className={`${styles.burgerConstructor}`}>
      <>
        <div className={`${styles.burgerConstructor__inner}`} style={{ bgColor }} ref={dropTarget}>
          {bun || items.length > 0 ? (
            <>
              {bun !== null ? (
                bun && (
                  <div className={`${styles.burgerConstructor__head}`}>
                    <button type="button" aria-label="Add" className={`${styles.burgerConstructor__drag}`} />
                    <ConstructorElement
                      type="top"
                      isLocked
                      text={`${bun.name} (верх)`}
                      thumbnail={bun.image}
                      price={bun.price}
                      draggable={false}
                    />
                  </div>
                )
              ) : (
                <div className={styles.burgerConstructor__preview} data-position="top">
                  Добавить булочку (вверх)
                </div>
              )}

              {items.length > 0 ? (
                <div className={`${styles.burgerConstructor__body} scrollbar-vertical`}>
                  {items.map((item, index) => {
                    const { constructorItemId, name, image, price } = item;
                    return (
                      <BurgerConstructorItem
                        key={item}
                        id={constructorItemId}
                        idx={index}
                        text={name}
                        thumbnail={image}
                        price={price}
                        draggable
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={styles.burgerConstructor__preview}>Добавить начинку</div>
              )}

              {bun !== null ? (
                bun && (
                  <div className={`${styles.burgerConstructor__foot}`}>
                    <button aria-label="add" type="button" className={`${styles.burgerConstructor__drag}`} />
                    <ConstructorElement
                      type="bottom"
                      isLocked
                      text={`${bun.name} (низ)`}
                      thumbnail={bun.image}
                      price={bun.price}
                      draggable={false}
                    />
                  </div>
                )
              ) : (
                <div className={styles.burgerConstructor__preview} data-position="bottom">
                  Добавить булочку (низ)
                </div>
              )}
            </>
          ) : (
            <div className={styles.burgerConstructor__previews}>
              <div className={styles.burgerConstructor__preview}>Добавить ингредиенты</div>
            </div>
          )}
        </div>

        <div className={`${styles.burgerConstructor__bottom} pt-10 pb-10`}>
          <div className="mr-10">
            <TotalPrice totalPrice={totalPrice} />
          </div>
          <div className={styles.burgerConstructor__order}>
            {isLoggined
              ? bun &&
                items.length > 0 && (
                  <Button type="primary" size="medium" onClick={makeOrder}>
                    Оформить заказ {isLoading ? <Spinner /> : null}
                  </Button>
                )
              : bun &&
                items.length > 0 && (
                  <Link to="/login" className="form__link text text_type_main-medium pr-3" style={{ color: "#ffffff" }}>
                    Войти {isLoading ? <Spinner /> : null}
                  </Link>
                )}
          </div>
        </div>

        {isModalOrderOpened && (
          <Modal handleClose={closeModal}>
            {isLoading ? <Loader /> : hasError ? <Error /> : <OrderDetails orderId={orderId} />}
          </Modal>
        )}
      </>
    </section>
  );
};

export default BurgerConstructor;
