import { FC, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// eslint-disable-next-line import/no-cycle
import {
  Page404,
  PageFeedCard,
  PageFeedOrders,
  PageForgotPassword,
  PageLogin,
  PageMain,
  PageOrderHistory,
  PageProfile,
  PageRegister,
  PageResetPassword,
} from "../../pages";
import { getIngredients, getProfile } from "../../redux/actions";
import { useDispatch } from "../../utils/hooks";
import AppHeader from "../app-header/app-header";
import ProtectedRoute from "../protected-route/protected-route";
import SignRoute from "../sign-route/sign-route";
import styles from "./app.module.css";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.nav_panel}>
        <AppHeader />
      </header>
      <Switch>
        <Route exact path="/">
          <PageMain />
        </Route>
        <Route path="/feed/:id/:number">
          <PageFeedCard />
        </Route>
        <Route path="/feed/:id">
          <PageFeedCard />
        </Route>
        <Route exact path="/feed">
          <PageFeedOrders />
        </Route>
        <SignRoute path="/login">
          <PageLogin />
        </SignRoute>
        <SignRoute path="/register">
          <PageRegister />
        </SignRoute>
        <SignRoute path="/forgot-password">
          <PageForgotPassword />
        </SignRoute>
        <SignRoute path="/reset-password">
          <PageResetPassword />
        </SignRoute>
        <ProtectedRoute path="/profile/orders/:id/:number" exact>
          <PageOrderHistory />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <PageOrderHistory />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <PageProfile />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <PageMain />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
