import { Logo as LogoComponent } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import logoMobile from "../../images/logoMobile.svg";
import styles from "./logo.module.css";

const Logo = () => (
    <Link to="/" className={`logo ${styles.logo}`}>
      <LogoComponent />
      <img loading="lazy" src={logoMobile} alt="Stellar Burgers" />
    </Link>
  );

export default Logo;