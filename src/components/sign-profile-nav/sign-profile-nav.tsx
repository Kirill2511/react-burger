import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./sign-profile-nav.module.css";

const ProfileNav: FC = () => (
  <nav className={styles.nav__list}>
    <NavLink
      to="/profile"
      exact
      className={`${styles.menu_link} text text_type_main-medium `}
      activeClassName={styles.menu_link_active}
    >
      Профиль
    </NavLink>
    <NavLink
      to="/profile/orders"
      className={`${styles.menu_link} text text_type_main-medium `}
      activeClassName={styles.menu_link_active}
    >
      История заказов
    </NavLink>
    <NavLink
      to="/profile/logout"
      className={`${styles.menu_link} text text_type_main-medium `}
      activeClassName={styles.menu_link_active}
    >
      Выход
    </NavLink>
  </nav>
);

export default ProfileNav;
