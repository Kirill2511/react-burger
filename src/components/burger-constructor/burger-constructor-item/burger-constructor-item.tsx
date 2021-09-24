import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

import { TIngredient } from "../../../redux/types";
import styles from "./burger-constructor-item.module.css";

interface IConstructorItem {
  itemData: TIngredient;
  type: "top" | "bottom";
  isLocked: boolean;
}

const ConstructorItem: FC<IConstructorItem> = ({ itemData, type, isLocked }) => (
  <li className={`${styles.item} mb-4 pl-8 pr-4'}`}>
    <ConstructorElement
      text={`${itemData.name} ${type === "top" ? "(верх)" : ""} ${type === "bottom" ? "(низ)" : ""} `}
      thumbnail={itemData.image_mobile}
      price={itemData.price}
      type={type}
      isLocked={isLocked}
    />
  </li>
);

export default ConstructorItem;
