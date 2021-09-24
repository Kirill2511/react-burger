import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import { EItemIcon, IItem } from "../../../redux/types/menu";
import { useSelector } from "../../../utils/hooks";
import styles from "./menu-item.module.css";

const componentsIcon = {
  burgerIcon: BurgerIcon,
  listIcon: ListIcon,
  profileIcon: ProfileIcon,
};

interface IPropsMenuItem {
  item: IItem;
}

const MenuItem: FC<IPropsMenuItem> = ({ item }) => {
  const { isAuthorized, user } = useSelector((store) => store.sign);
  const MenuIcon = componentsIcon[item.icon];
  return (
    <li>
      <NavLink
        to={item.href}
        className={`${styles.menu_link} pr-5 pl-5`}
        activeClassName={styles.menu_link_active}
        exact={item.exact}
      >
        <MenuIcon type="secondary" />
        <span className="text text_type_main-default pl-2">
          {/* eslint-disable-next-line no-nested-ternary */}
          { isAuthorized ? (item.icon === EItemIcon.profileIcon ? (user.email) : (item.name)) : (item.name)}
        </span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
