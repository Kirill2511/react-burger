import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../../utils/hooks";

import { DELETE_CONSTRUCTOR_INGREDIENT } from "../../../redux/action-types";
import { TId, TIngredient } from "../../../redux/types";
import { ITEM_TYPE } from "../../../utils/constants";
import styles from "./burger-constructor-item-swap.module.css";

const style = {
  cursor: "move",
};

interface IConstructorItemSwap {
  itemData: TIngredient;
  type?: "top" | "bottom";
  isLocked?: boolean;
  handlerId: TId;
  index: number;
  moveElem: (dragIndex: number, hoverIndex: number) => void;
  id: TId;
}

const ConstructorItemSwap: FC<IConstructorItemSwap> = ({ itemData, index, isLocked, type, moveElem, id }) => {
  const dispatch = useDispatch();

  const handleClose = () => dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENT, payload: index });

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ITEM_TYPE.FILLERS,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { id: string; index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveElem(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: ITEM_TYPE.FILLERS,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = 1;
  drag(drop(ref));

  return (
    <li
      className={`${styles.item} pb-4 ${isLocked ? "pl-8 pr-4" : "pr-2"}`}
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
    >
      {!isLocked && (
        <span className={styles.drag_icon}>
          <DragIcon type="secondary" />
        </span>
      )}
      <ConstructorElement
        text={`${itemData.name} ${type === "top" ? "(верх)" : ""} ${type === "bottom" ? "(низ)" : ""} `}
        thumbnail={itemData.image_mobile}
        price={itemData.price}
        isLocked={isLocked}
        type={type}
        handleClose={handleClose}
      />
    </li>
  );
};

export default ConstructorItemSwap;
