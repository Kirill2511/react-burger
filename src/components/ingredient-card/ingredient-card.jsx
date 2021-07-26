import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";

const IngredientCard = (props) => {
  const { data } = props;
  return (
    <li className={`${styles.ingredientCard}`}>
      <img className="ml-4 mr-4" src={data.image} alt={data.name} />
      <small
        style={{ display: "flex" }}
        className="text text_type_digits-default mt-1 mb-1"
      >
        {data.price}&nbsp;
        <CurrencyIcon type="primary" />
      </small>
      <small className={`${styles.ingredientName} text text_type_main-default`}>
        {data.name}
      </small>
      <Counter count={1} size="default" />
    </li>
  );
};

export default IngredientCard;
