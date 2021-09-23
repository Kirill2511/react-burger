import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { setViewItem } from "../../redux/actions";
import { ITEM_DETAILS } from "../../utils/constants";
import { useDispatch, useSelector } from "../../utils/hooks";
import styles from "./ingredient-details.module.css";
import IngredientDetailsItem from "./ingredient-details-item/ingredient-details-item";

type TParamTypes = {
  id: string;
};

const IngredientDetails: FC = () => {
  const { id } = useParams<TParamTypes>();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);

  useEffect(() => {
    const itemData = ingredients.data?.find((item) => item._id === id);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    itemData && dispatch(setViewItem(itemData));
  }, [id, ingredients.data]);

  const viewedItem = useSelector((state) => state.viewedItem.data);

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
