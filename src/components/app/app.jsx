// eslint-disable-next-line simple-import-sort/imports
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import {
  PageForgotPassword,
  PageLogin,
  PageProfile,
  PageProfileForm,
  PageRegister,
  PageResetPassword,
  Page404,
} from "../../pages";

import { getData } from "../../services/actions/dataActions";
import { closeDataModal } from "../../services/actions/modalDataActions";
import { getUserInfo } from "../../services/actions/userActions";
import { getCookie } from "../../services/helpers";

import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Title from "../title/title";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Error from "../error/error";
import Loader from "../loader/loader";

import ProtectedRouteAuth from "../protected-route-auth/protected-route-auth";
import ProtectedRoutePasswordReset from "../protected-route-password-reset/protected-route-password-reset";
import ProtectedRouteProfile from "../protected-route-profile/protected-route-profile";

import styles from "./app.module.css";

const data = (state) => state.data;

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const accessToken = getCookie("accessToken");
  const { hasError, isLoading } = useSelector(data);
  const background = history.action === "PUSH" && location.state && location.state.background;

  const onCloseDataModal = () => {
    dispatch(closeDataModal());
    history.goBack();
  };

  useEffect(() => {
    dispatch(getData());
    // eslint-disable-next-line babel/no-unused-expressions
    accessToken && dispatch(getUserInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main>
        <Switch location={background || location}>
          <Route path="/" exact>
            {isLoading ? (
              <Loader />
            ) : hasError ? (
              <Error />
            ) : (
              <DndProvider backend={HTML5Backend}>
                <div className="content">
                  <Title text="Соберите бургер" />
                  <div className="content__body">
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </div>
                </div>
              </DndProvider>
            )}
          </Route>
          <ProtectedRouteAuth path="/register">
            <PageRegister />
          </ProtectedRouteAuth>
          <ProtectedRouteAuth path="/login">
            <PageLogin />
          </ProtectedRouteAuth>
          <ProtectedRouteAuth path="/forgot-password">
            <PageForgotPassword />
          </ProtectedRouteAuth>
          <ProtectedRoutePasswordReset path="/reset-password">
            <PageResetPassword />
          </ProtectedRoutePasswordReset>
          <ProtectedRouteProfile path="/profile">
            <PageProfile>
              <PageProfileForm />
            </PageProfile>
          </ProtectedRouteProfile>
          <Route path="/ingredients/:id">
            <IngredientDetails />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
        {background && (
          <>
            <Route
              path="/ingredients/:id"
              exact
              /* eslint-disable-next-line react/no-children-prop */
              children={
                <Modal modalHeader="Детали ингредиента" handleClose={onCloseDataModal}>
                  {isLoading ? <Loader /> : hasError ? <Error /> : <IngredientDetails />}
                </Modal>
              }
            />
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
