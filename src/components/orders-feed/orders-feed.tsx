import { FC, useEffect, useMemo } from "react";

import { wsAllClose, wsAllInit } from "../../redux/actions";
import { useDispatch, useSelector } from "../../utils/hooks";
// eslint-disable-next-line import/no-cycle
import { OrdersCard } from "..";
import styles from "./orders-feed.module.css";

const OrdersFeed: FC = () => {
  const dispatch = useDispatch();

  const { data, wsConnected } = useSelector((store) => store.wsAll);

  useEffect(() => {
    dispatch(wsAllInit());
    return () => {
      dispatch(wsAllClose());
    };
  }, [dispatch]);

  const { orders, total, totalToday } = data;
  const doneOrders = useMemo(() => orders?.filter((order) => order.status === "done"), [orders]);
  const pendingOrders = useMemo(() => orders?.filter((order) => order.status === "pending"), [orders]);

  if (!wsConnected) return <h4 className="text text_type_main-medium mt-4 mb-8">Соединяемся с кухней, ожидайте...</h4>;
  if (!orders?.length) return <h4 className="text text_type_main-medium mt-4 mb-8">На кухне заказов пока нет...</h4>;

  return (
    <>
      <h1 className={`text text_type_main-large ${styles.header}`}>Лента заказов</h1>
      <div className={styles.content_wrapper}>
        <div className={styles.order_list}>
          {orders.map((order) => order.ingredients?.length && <OrdersCard key={order._id} order={order} />)}
        </div>

        <div className={styles.info_wrapper}>
          <div className={styles.info_table}>
            <div className={styles.done}>
              <h2 className="text text_type_main-medium">Готовы:</h2>
              <ul className={styles.list}>
                {doneOrders.map((doneOrder) => (
                  <li
                    key={doneOrder._id}
                    className={`text text_type_digits-default ${styles.list_item} ${styles.list_item_done}`}
                  >
                    {doneOrder.number}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.progress}>
              <h2 className="text text_type_main-medium">В работе:</h2>
              <ul className={styles.list}>
                {pendingOrders.map((pendingOrder) => (
                  <li key={pendingOrder._id} className={`text text_type_digits-default ${styles.list_item}`}>
                    {pendingOrder.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.total_count}>
            <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
            <p className={`text text_type_digits-large ${styles.count}`}>{total}</p>
          </div>
          <div className={styles.today_count}>
            <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className={`text text_type_digits-large ${styles.count}`}>{totalToday}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersFeed;
