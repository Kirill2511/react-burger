import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setViewOrder } from "../../redux/actions";
import { getIngredients, getSing } from "../../redux/selectors";
import { ORDER_STATUS } from "../../utils/constants";
import { convertOrderDate } from "../../utils/utils";
import styles from "./orders-card.module.css";

const OrdersCard = ({ order }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { wsConnected: cardOfProfile } = useSelector(getSing);
  const { data: ingredients } = useSelector(getIngredients);

  const orderIngredientsWDetails = useMemo(
    () => order.ingredients?.map((id) => ingredients.find((ingredient) => ingredient._id === id)),
    [order, ingredients]
  );

  const orderIngredients = useMemo(() => {
    const orderIngredientsWDetailsGroups = [];
    orderIngredientsWDetails.forEach((elem) => {
      const existingGroups = orderIngredientsWDetailsGroups.find((groupItem) => groupItem._id === elem._id);
      if (!existingGroups) {
        const count = order.ingredients?.filter((item) => item === elem?._id).length || 0;
        orderIngredientsWDetailsGroups.push({
          ...elem,
          count,
        });
      }
    });

    return orderIngredientsWDetailsGroups;
  }, [order, orderIngredientsWDetails]);

  const orderTotalPrice = useMemo(
    // eslint-disable-next-line unicorn/no-array-reduce,no-param-reassign,no-return-assign
    () => orderIngredients.reduce((sum, item) => (sum += item.price * item.count), 0),
    [orderIngredients]
  );

  const openOrderDetails = () => {
    dispatch(
      setViewOrder({
        ...order,
        groupedIngredients: orderIngredients,
        ingredientsWDetails: orderIngredientsWDetails,
        orderTotalPrice,
      })
    );

    history.replace(`${cardOfProfile ? "/profile/orders" : "/feed"}/${order._id}/${order.number}`, {
      background: true,
    });
  };

  return (
    <>
      <div className={styles.order_item} aria-hidden="true" role="presentation" onClick={openOrderDetails}>
        <div className={styles.order_info}>
          <p className={`text text_type_digits-default ${styles.order_number}`}>#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">{convertOrderDate(order.createdAt)}</p>
        </div>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        {cardOfProfile && (
          <p className={`text text_type_main-default ${order.status === "done" ? styles.done : ""}`}>
            {ORDER_STATUS[order.status]}
          </p>
        )}

        <div className={styles.ingredients_info}>
          <div className={styles.ingredients_list}>
            {orderIngredients.map((ingredient, idx) => (
              <div
                className={styles.ingredient_wrapper}
                /* eslint-disable-next-line react/no-array-index-key */
                key={idx}
                style={{ zIndex: `${orderIngredients.length - idx}` }}
              >
                <div className={styles.ingredient}>
                  <img src={ingredient.image_mobile} width="64" alt={ingredient.name} />
                  {ingredient.count > 1 && (
                    <div className={styles.count_wrapper}>
                      <p className="text text_type_main-default">{`+${ingredient.count - 1}`}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.ingredients_price}>
            <p className="text text_type_digits-default">{orderTotalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
