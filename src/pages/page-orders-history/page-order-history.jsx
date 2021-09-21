import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import OrdersCardDetails from "../../components/orders-card-details/orders-card-details";
import { getOrderDetails, setViewOrder } from "../../redux/actions";
import { getIngredients, getViewedOrder } from "../../redux/selectors";
import styles from "./page-order-history.module.css";

function OrdersCardDetailsPage() {
  const { id, number } = useParams();
  const dispatch = useDispatch();
  const { data: ingredients } = useSelector(getIngredients);
  const { isLoaded, isFetching, data: order } = useSelector(getViewedOrder);

  useEffect(
    () => {
      dispatch(getOrderDetails(number));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const orderIngredientsDetails = useMemo(
    () => order?.ingredients?.map((idItem) => ingredients.find((ingredient) => ingredient._id === idItem)),
    [order, ingredients]
  );

  const orderIngredients = useMemo(() => {
    const orderIngredientsDetailsGroups = [];
    // eslint-disable-next-line babel/no-unused-expressions
    orderIngredientsDetails?.length &&
      orderIngredientsDetails.forEach((elem) => {
        const existingGroups = orderIngredientsDetailsGroups.find((groupItem) => groupItem._id === elem?._id);
        if (!existingGroups) {
          const count = order.ingredients?.filter((item) => item === elem?._id).length || 0;
          orderIngredientsDetailsGroups.push({
            ...elem,
            count,
          });
        }
      });

    return orderIngredientsDetailsGroups;
  }, [order, orderIngredientsDetails]);

  const orderTotalPrice = useMemo(
    // eslint-disable-next-line no-param-reassign,no-return-assign,unicorn/no-array-reduce
    () => orderIngredients.reduce((sum, item) => (sum += item.price), 0),
    [orderIngredients]
  );

  if (!isLoaded && order?._id?.includes(id) && orderTotalPrice) {
    dispatch(
      setViewOrder({
        ...order,
        groupedIngredients: orderIngredients,
        ingredientsDetails: orderIngredientsDetails,
        orderTotalPrice,
      })
    );
  }

  if (isFetching) {
    return (
      <h4 className={`text text_type_main-medium mt-4 mb-8 ${styles.wrapper}`}>Соединяемся с кухней, ожидайте...</h4>
    );
  }
  if (isLoaded && !order) {
    return (
      <h4 className={`text text_type_main-medium mt-4 mb-8 ${styles.wrapper}`}>
        Данных о заказе пока нет. Идет загрузка, ожидайте...
      </h4>
    );
  }
  if (!order?._id?.includes(id)) {
    return <h4 className={`text text_type_main-medium mt-4 mb-8 ${styles.wrapper}`}>Ищем заказ, ожидайте...</h4>;
  }

  return (
    <div className={styles.wrapper}>
      <OrdersCardDetails />
    </div>
  );
}
export default OrdersCardDetailsPage;
