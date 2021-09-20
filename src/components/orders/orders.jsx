import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { wsSignClose, wsSignInit } from "../../redux/actions";
import { getWsSign } from "../../redux/selectors";
import OrdersCard from "../orders-card/orders-card";
import styles from "./orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();
  const { wsConnected, data } = useSelector(getWsSign);
  const { orders } = data;
  useEffect(() => {
    dispatch(wsSignInit());
    return () => {
      dispatch(wsSignClose());
    };
  }, [dispatch]);

  if (!wsConnected)
    return <h4 className="text text_type_main-medium mt-4 mb-8">Соединяемся с сервером, ожидайте...</h4>;
  if (!orders?.length) return <h4 className="text text_type_main-medium mt-4 mb-8">Ваших заказов пока нет...</h4>;

  return (
    <div className={styles.orders_list}>
      {orders?.slice(0).reverse().map((order) => order.ingredients?.length && <OrdersCard key={order._id} order={order} />)}
    </div>
  );
};

export default Orders;
