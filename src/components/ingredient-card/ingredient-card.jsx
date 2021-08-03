import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";

const IngredientCard = (props) => {
  const { data, onClick } = props;
  return (
    <div style={{overflow: 'hidden'}} onClick={() => onClick(data)}>
      <li className={`${styles.ingredientCard}`}>
        <img className="ml-4 mr-4" src={data.image} alt={data.name} />
        <span
          style={{ display: "flex" }}
          className="text text_type_digits-default mt-1 mb-1"
        >
          {data.price}&nbsp;
          <CurrencyIcon type="primary" />
        </span>
        <span
          className={`${styles.ingredientName} text text_type_main-default`}
        >
          {data.name}
        </span>
      </li>
    </div>
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
  onClick: PropTypes.func.isRequired,
};

export default IngredientCard;
