import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";

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

IngredientCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }).isRequired,
};

export default IngredientCard;
