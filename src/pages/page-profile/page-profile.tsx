import { FC, useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import Orders from "../../components/orders/orders";
import SignProfile from "../../components/sign-profile/sign-profile";
import ProfileNav from "../../components/sign-profile-nav/sign-profile-nav";
import { getLogout, getProfile } from "../../redux/actions";
import { PROFILE_NAV_TEXT } from "../../utils/constants";
import { useDispatch, useSelector } from "../../utils/hooks";
import { getRefreshToken } from "../../utils/token";
import styles from "./page-profile.module.css";

const PageProfile: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isAuthorized } = useSelector((store) => store.sign);
  const [navText, setNavText] = useState(PROFILE_NAV_TEXT.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (location.pathname) {
      case "/profile/logout": {
        const token = getRefreshToken();
        if (token) {
          dispatch(getLogout(token));
          history.push("/login");
        }
        break;
      }

      case "/profile/orders": {
        setNavText(PROFILE_NAV_TEXT.orders);
        break;
      }

      case "/profile": {
        setNavText(PROFILE_NAV_TEXT.profile);
        break;
      }
    }
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
