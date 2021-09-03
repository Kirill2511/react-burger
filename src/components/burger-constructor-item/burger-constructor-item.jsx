import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import { actionItem, delItem } from "../../services/actions/dataActions";
import styles from "./burger-constructor-item.module.css";

const BurgerConstructorItem = ({ id, idx, isLocked, text, thumbnail, price, draggable }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructor",
    item: { idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.idx;
      const hoverIndex = idx;

      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(actionItem(dragIndex, hoverIndex));
      // eslint-disable-next-line no-param-reassign
      item.idx = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0.5 : 1;
  const onDelete = () => dispatch(delItem(id));

  return (
    <div className={`${styles.burgerConstructorItem}`} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      {draggable && (
        <button type="button" className={`${styles.burgerConstructorItem__drag}`}>
          <DragIcon type="secondary" />
        </button>
      )}

      <ConstructorElement isLocked={isLocked} text={text} thumbnail={thumbnail} price={price} handleClose={onDelete} />
    </div>
  );
};

export default BurgerConstructorItem;

BurgerConstructorItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  draggable: PropTypes.bool,
};
