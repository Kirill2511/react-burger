import {
  ArrowDownIcon,
  BurgerIcon,
  Button,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Dropdown from "../dropdown/dropdown";
import Logo from "../logo/logo";
import styles from "./app-header.module.css";

const users = (state) => state.user;

const AppHeader = () => {
  const { isLoggined } = useSelector(users);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} pt-4 pb-4 pl-5 pr-5`}>
        <div className={styles.header__logo}>
          <Logo />
        </div>
        <div className={styles.header__body}>
          <NavLink exact className="nav-link" activeClassName="nav-link--active" to="/">
            <BurgerIcon type="secondary" />
            <span className="ml-2">
              Конструктор
            </span>
          </NavLink>
          <NavLink exact className="nav-link" activeClassName="nav-link--active" to="/">
            <ListIcon type="secondary" />
            <span className="ml-2">Лента заказов</span>
          </NavLink>
          {!isLoggined ? (
            <NavLink exact className={`${styles.header__btn} ${styles.header__btnProfile} nav-link`} to="/login">
              <ListIcon type="secondary" />
              <span className="ml-2">Войти</span>
            </NavLink>
          ) : (
            <Dropdown newClasses={`${styles.header__btn} ${styles.header__btnProfile}`}>
              <Button type="secondary" size="medium">
                <ProfileIcon type="secondary" />
                <span className="ml-2">
                  <span>Личный кабинет</span>
                </span>
                <ArrowDownIcon type="secondary" />
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
