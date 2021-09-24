import React, { FC,useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";

// eslint-disable-next-line import/no-cycle
import {
  BurgerConstructor,
  BurgerIngredients,
  IngredientDetails,
  Modal,
  OrderDetails,
  OrderFailed,
} from "../../components";
import { getOrderNumber, resetViewItem,setOrderError } from "../../redux/actions";
import { useDispatch,useSelector } from '../../utils/hooks';
import IngredientPage from "../page-ingredient/page-ingredient";
import styles from "./page-main.module.css";

const HomePage: FC = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector(state => state.ingredients);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const cart = useSelector(state => state.cart);
  const [visibleOrderDetails, setVisibleOrderDetails] = useState(false);
  const [visibleOrderFailed, setVisibleOrderFailed] = useState(false);
  const [visibleIngredientDetails, setVisibleIngredientDetails] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { isAuthorized } = useSelector((store) => store.sign);

  const openModalOrderDetails = () => {
    if (isAuthorized) {
      if (cart.sortedData.fillers.length > 0 && Object.keys(cart.sortedData.bun).length > 0) {
        const idsCard = cart.sortedData.fillers.map((item) => item._id);
        dispatch(getOrderNumber(idsCard));
        setVisibleOrderDetails(true);
      } else {
        dispatch(setOrderError("Пустой заказ"));
        setVisibleOrderFailed(true);
      }
    } else {
      history.push(`/login`, { from: location });
    }
  };
  const openModalIngredientDetails = () => {
    setVisibleIngredientDetails(true);
  };

  const closeModal = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    visibleOrderDetails && setVisibleOrderDetails(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    visibleIngredientDetails && dispatch(resetViewItem());
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    visibleIngredientDetails && setVisibleIngredientDetails(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    visibleOrderFailed && setVisibleOrderFailed(false);
  };

  const match = useRouteMatch("/ingredients/:id");
  if (history.action === "POP" && match && match.isExact) {
    return (
      <Switch>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
      </Switch>
    );
  }

  return (
    <div className={styles.wrapper}>
      {state.data && state.data.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients openModal={openModalIngredientDetails} />
            {cart.data.length > 0 && <BurgerConstructor openModal={openModalOrderDetails} />}
          </main>
        </DndProvider>
      )}
      {visibleOrderDetails && (
        <Modal modalTitle={null} closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      {visibleOrderFailed && (
        <Modal modalTitle={null} closeModal={closeModal}>
          <OrderFailed />
        </Modal>
      )}
      {visibleIngredientDetails && (
        <Modal modalTitle="Детали ингредиента" closeModal={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
