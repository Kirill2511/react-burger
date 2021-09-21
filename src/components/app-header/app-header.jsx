import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

import dataMenu from "../../utils/data/data-menu";
import styles from "./app-header.module.css";
import MenuItem from "./menu-item/menu-item";


const  AppHeader = () => (
    <div className={`${styles.container} pt-4 pb-4 p`}>
      <nav>
        <ul className={styles.menu}>
          {dataMenu.left.map((item) => (
            <MenuItem item={item} key={item.id} />
          ))}
        </ul>
      </nav>

      <NavLink to="/" title="Stellar burgers" className={styles.logo}>
        <Logo />
      </NavLink>
      <nav>
        <ul className={styles.menu_right}>
          {dataMenu.right.map((item) => (
            <MenuItem item={item} key={item.id} />
          ))}
        </ul>
      </nav>
    </div>
  )

export default AppHeader;
