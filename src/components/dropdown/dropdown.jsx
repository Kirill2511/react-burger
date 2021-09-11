import { useState } from "react";

import Menu from "../menu/menu";
import styles from "./dropdown.module.css";

const Dropdown = ({ newClasses, children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const classDropdownToggle = isDropdownOpen ? `${styles.dropdown} ${styles.dropdownActive}` : `${styles.dropdown}`;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div role="button" tabIndex={0} className={`${classDropdownToggle} ${newClasses}`} onClick={toggleDropdown}>
      {children}
      <div className={`${styles.dropdown__inner}`}>
        <Menu />
      </div>
    </div>
  );
};

export default Dropdown;
