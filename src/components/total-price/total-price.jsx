import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./total-price.module.css";

const TotalPrice = ({ totalPrice }) => (
  <div className={`${styles.totalPrice}`}>
    <p className="text text_type_digits-medium pr-2">{totalPrice}</p>
    <CurrencyIcon type="secondary" />
  </div>
);

export default TotalPrice;
