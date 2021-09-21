import { useSelector } from "react-redux";

import orderInfo from "../../images/icon-info.svg";
import { getStateOrder } from "../../redux/selectors";

function leftFillNum(num, targetLength) {
  return num.toString().padStart(targetLength, 0);
}

const OrderFailed = () => {
  const order = useSelector(getStateOrder);
  return (
    <>
      <h1 className="text text_type_digits-large mt-30">{leftFillNum(0, 7)}</h1>
      <p className="text text_type_main-medium mt-8">что-то пошло не так</p>
      <p className="text text_type_main-medium mt-8">{order.error}</p>

      <img className="mt-15" src={orderInfo} alt="Заказ не готовится" />
      <p className="text text_type_main-default mt-15">Мы не можем приготовить пустой заказ</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Соберите бургер и мы его вам приготовим
      </p>
    </>
  );
};

export default OrderFailed;
