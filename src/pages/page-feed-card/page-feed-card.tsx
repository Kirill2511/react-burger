import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import OrdersCardDetails from "../../components/orders-card-details/orders-card-details";
import { getOrderDetails, setViewOrder } from "../../redux/actions";
import { TGroupedIngredient } from "../../redux/types";
import { useDispatch, useSelector } from "../../utils/hooks";
import styles from "./page-feed-card.module.css";

interface IParams {
  id: string;
  number: string;
}

const PageFeedCard: FC = () => {
  const { id, number } = useParams<IParams>();
  const dispatch = useDispatch();
  const { data: ingredients } = useSelector((store) => store.ingredients);
  const { isLoaded, isFetching, data: order } = useSelector((store) => store.viewedOrder);

  useEffect(() => {
    dispatch(getOrderDetails(number));
  }, [dispatch]);

  const orderIngredientsWDetails = useMemo(
    () => order?.ingredients?.map((idItem) => ingredients.find((ingredient) => ingredient._id === idItem)),
    [order, ingredients]
  );

  const orderIngredients = useMemo(() => {
    const orderIngredientsWDetailsGroups: Array<TGroupedIngredient> = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    orderIngredientsWDetails?.length &&
      orderIngredientsWDetails.forEach((elem) => {
        const existingGroups = orderIngredientsWDetailsGroups.find((groupItem) => groupItem._id === elem?._id);
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
    () => orderIngredients.reduce((sum, item) => (sum + item.price * item.count), 0),
    [orderIngredients]
  );

  if (!isLoaded && order?._id === id && orderTotalPrice) {
    dispatch(
      setViewOrder({
        ...order,
        groupedIngredients: orderIngredients,
        ingredientsWDetails: orderIngredientsWDetails,
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
  if (order?._id !== id || !orderTotalPrice) {
    return <h4 className={`text text_type_main-medium mt-4 mb-8 ${styles.wrapper}`}>Ищем заказ, ожидайте...</h4>;
  }

  return (
    <div className={`${styles.wrapper}`}>
      <OrdersCardDetails />
    </div>
  );
};

export default PageFeedCard;
