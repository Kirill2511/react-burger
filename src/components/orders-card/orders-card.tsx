import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";
import { FC, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { setViewOrder } from "../../redux/actions";
import { EOrderStatus, TGroupedIngredient, TId, TOrder } from "../../redux/types";
import { useDispatch, useSelector } from "../../utils/hooks";
import { formatDistanceDayToNow } from "../../utils/utils";
import styles from "./orders-card.module.css";

interface IOrdersCard {
  order: TOrder;
}

const OrdersCard: FC<IOrdersCard> = ({ order }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { wsConnected: cardOfProfile } = useSelector((store) => store.wsSign);
  const { data: ingredients } = useSelector((store) => store.ingredients);

  const orderIngredientsWDetails = useMemo(
    () => order.ingredients?.map((id: TId) => ingredients.find((ingredient) => ingredient._id === id)),
    [order, ingredients]
  );

  const orderIngredients = useMemo(() => {
    const orderIngredientsWDetailsGroups: Array<TGroupedIngredient> = [];
    orderIngredientsWDetails?.forEach(
      (elem) => {
        const existingGroups = orderIngredientsWDetailsGroups.find(groupItem => groupItem._id === elem?._id);
        if (!existingGroups) {
          const count = order?.ingredients.filter(id => id === elem._id).length || 0;
          orderIngredientsWDetailsGroups.push(
            {
              ...elem,
              count
            }
          );
        }
      });

    return orderIngredientsWDetailsGroups;
  }, [order, orderIngredientsWDetails]);

  const orderTotalPrice = useMemo(
    () => orderIngredients.reduce((sum, item) => (sum + item.price * item.count), 0),
    [orderIngredients]
  );

  const openOrderDetails = () => {
    dispatch(setViewOrder(
      {
        ...order,
        groupedIngredients: orderIngredients,
        ingredientsWDetails: orderIngredientsWDetails,
        orderTotalPrice
      }
    ));

    history.replace(`${cardOfProfile ? '/profile/orders' : '/feed'}/${order._id}/${order.number}`, { background: true });

  };

  const createdAt = new Date(order.createdAt);

  return (
    <>
      <div className={styles.order_item} aria-hidden="true" role="presentation" onClick={openOrderDetails}>
        <div className={styles.order_info}>
          <p className={`text text_type_digits-default ${styles.order_number}`}>#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">{`${formatDistanceDayToNow(
            createdAt
          )}, ${format(createdAt, "HH:mm 'i-'z")}`}</p>
        </div>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        {cardOfProfile && (
          <p className={`text text_type_main-default ${order.status === "done" ? styles.done : ""}`}>
            {EOrderStatus[order.status]}
          </p>
        )}

        <div className={styles.ingredients_info}>
          <div className={styles.ingredients_list}>
            {orderIngredients.map((ingredient, idx) => (
              <div
                className={styles.ingredient_wrapper}
                /* eslint-disable-next-line react/no-array-index-key */
                key={idx}
                style={{ zIndex: orderIngredients.length - idx }}
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
