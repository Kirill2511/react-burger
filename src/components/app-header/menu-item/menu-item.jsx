import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./menu-item.module.css";

const componentsIcon = {
  burgerIcon: BurgerIcon,
  listIcon: ListIcon,
  profileIcon: ProfileIcon,
};

const MenuItem = ({ item }) => {
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
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
          {isAuthorized ? (item.icon === "profileIcon" ? user.email : item.name) : item.name}
        </span>
      </NavLink>
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};
export default MenuItem;
