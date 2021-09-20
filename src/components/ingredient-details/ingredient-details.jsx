import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setViewItem } from "../../redux/actions";
import { getStateIngredients, getStateViewedItemData } from "../../redux/selectors";
import { ITEM_DETAILS } from "../../utils/constants";
import styles from "./ingredient-details.module.css";
import IngredientDetailsItem from "./ingredient-details-item/ingredient-details-item";

const IngredientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector(getStateIngredients);

  useEffect(() => {
    const itemData = ingredients.data?.find((item) => item._id === id);
    // eslint-disable-next-line babel/no-unused-expressions
    itemData && dispatch(setViewItem(itemData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ingredients.data]);

  const viewedItem = useSelector(getStateViewedItemData);

  if (!viewedItem._id) {
    return <h4 className="text text_type_main-medium mt-4 mb-8">Загрузка данных...</h4>;
  }

  return (
    <div className={styles.container}>
      <img src={viewedItem.image_large} alt={viewedItem.name} title={viewedItem.name} />
      <h4 className="text text_type_main-medium mt-4 mb-8">{viewedItem.name}</h4>
      <ul className={`${styles.details_list} mb-15`}>
        <IngredientDetailsItem title={ITEM_DETAILS.calories} value={viewedItem.calories} />
        <IngredientDetailsItem title={ITEM_DETAILS.proteins} value={viewedItem.proteins} />
        <IngredientDetailsItem title={ITEM_DETAILS.fat} value={viewedItem.fat} />
        <IngredientDetailsItem title={ITEM_DETAILS.carbohydrates} value={viewedItem.carbohydrates} />
      </ul>
    </div>
  );
};

export default IngredientDetails;
