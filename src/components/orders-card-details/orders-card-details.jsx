import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

import { getViewedOrder } from "../../redux/selectors";
import { ORDER_STATUS } from "../../utils/constants";
import { convertOrderDate } from "../../utils/utils";
import styles from "./orders-card-details.module.css";

function OrdersCardDetails() {
  const { data: order } = useSelector(getViewedOrder);

  return (
    <>
      <h2 className={`text text_type_digits-default ${styles.header}`}>#{order.number}</h2>
      <div className={styles.card_details_wrapper}>
        <h2 className="text text_type_main-medium">{order.name}aa</h2>
        <p className={`text text_type_main-default ${styles.status} ${order.status === "done" ? styles.done : ""}`}>
          {ORDER_STATUS[order.status]}
        </p>
        <h2 className="text text_type_main-medium">Состав:</h2>
        <div className={styles.ingredients_list}>
          {order.groupedIngredients?.map((ingredient, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.ingredient_wrapper} key={idx}>
              <div className={styles.img_wrapper} style={{ zIndex: `${order.groupedIngredients.length - idx}` }}>
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
          <p className="text text_type_main-default text_color_inactive">{convertOrderDate(order.createdAt)}</p>
          <div className={styles.ingredient_cost}>
            <p className="text text_type_digits-default">{order.orderTotalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersCardDetails;
