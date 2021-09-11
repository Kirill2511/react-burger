import PropTypes from "prop-types";

import styles from "./title.module.css";

const Title = ({ text }) => <h1 className={`${styles.title} text text_type_main-large mt-5 mb-5`}>{text}</h1>;

export default Title;

Title.propTypes = {
  // eslint-disable-next-line react/require-default-props
  text: PropTypes.string,
};
