import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";
import { FC } from "react";

import { useSelector } from "../../utils/hooks";
import { EOrderStatus } from "../../redux/types";
import { formatDistanceDayToNow } from "../../utils/utils";
import styles from "./orders-card-details.module.css";


const OrdersCardDetails: FC = () => {
  const { data: order } = useSelector((store) => store.viewedOrder);

  const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();

  return (
    <>
      <h2 className={`text text_type_digits-default ${styles.header}`}>#{order.number}</h2>
      <div className={styles.card_details_wrapper}>
        <h2 className="text text_type_main-medium">{order.name}aa</h2>
        <p className={`text text_type_main-default ${styles.status} ${order.status === "done" ? styles.done : ""}`}>
          {EOrderStatus[order.status]}
        </p>
        <h2 className="text text_type_main-medium">Состав:</h2>
        <div className={styles.ingredients_list}>
          {order.groupedIngredients?.map((ingredient, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.ingredient_wrapper} key={idx}>
              <div className={styles.img_wrapper} style={{ zIndex: order.groupedIngredients.length - idx }}>
                <div className={styles.img}>
                  <img src={ingredient.image_mobile} width="64" alt={ingredient.name} />
                </div>
              </div>
              <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
              <div className={styles.ingredient_cost}>
                <p className="text text_type_digits-default">{`${ingredient.count}x${ingredient.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.ingredients_footer}>
          <p className="text text_type_main-default text_color_inactive">{`${formatDistanceDayToNow(
            createdAt
          )}, ${format(createdAt, "HH:mm 'i-'z")}`}</p>
          <div className={styles.ingredient_cost}>
            <p className="text text_type_digits-default">{order.orderTotalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersCardDetails;
