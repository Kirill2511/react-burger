import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import Orders from "../../components/orders/orders";
import SignProfile from "../../components/sign-profile/sign-profile";
import ProfileNav from "../../components/sign-profile-nav/sign-profile-nav";
import { getLogout, getProfile } from "../../redux/actions";
import { getSing } from "../../redux/selectors";
import { PROFILE_NAV_TEXT } from "../../utils/constants";
import { getRefreshToken } from "../../utils/token";
import styles from "./page-profile.module.css";

const PageProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isAuthorized } = useSelector(getSing);
  const [navText, setNavText] = useState(PROFILE_NAV_TEXT.profile);
  useEffect(() => {
    dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (location.pathname) {
      // eslint-disable-next-line switch-case/no-case-curly
      case "/profile/logout": {
        const token = getRefreshToken();
        if (token) {
          dispatch(getLogout(token));
          history.push("/login");
        }

        break;
      }

      // eslint-disable-next-line switch-case/no-case-curly
      case "/profile/orders": {
        setNavText(PROFILE_NAV_TEXT.orders);

        break;
      }

      // eslint-disable-next-line switch-case/no-case-curly
      case "/profile": {
        setNavText(PROFILE_NAV_TEXT.profile);

        break;
      }
      // No default
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.nav_container}>
          <ProfileNav />
          <p className={`${styles.nav__text} text text_type_main-default text_color_inactive`}>{navText}</p>
        </div>
        <Switch>
          <Route path="/profile/orders">
            <Orders />
          </Route>
          <Route path="/profile">
            <SignProfile />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default PageProfile;
