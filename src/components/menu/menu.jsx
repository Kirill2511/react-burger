import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { logoutUserRequest } from "../../services/actions/userActions";
import Spinner from "../spinner/spinner";
import styles from "./menu.module.css";

const user = (state) => state.user;

const Menu = () => {
  const dispatch = useDispatch();
  const { isLoading, isLogout } = useSelector(user);

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUserRequest());
  };

  return (
    <ul className={styles.menu}>
      <li className={styles.menu__item}>
        <NavLink exact className={styles.menu__link} activeClassName={styles.menu__linkActive} to="/profile">
          Профиль
        </NavLink>
      </li>
      <li className={styles.menu__item}>
        <NavLink
          exact
          className={styles.menu__link}
          activeClassName={styles.menu__linkActive}
          to="/profile/orders"
        >
          История заказов
        </NavLink>
      </li>
      <li className={styles.menu__item}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className={styles.menu__link} onClick={clickLogout}>
          Выход {isLoading && isLogout ? <Spinner /> : null}
        </a>
      </li>
    </ul>
  );
};
export default Menu;
