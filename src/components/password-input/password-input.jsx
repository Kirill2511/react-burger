import { HideIcon, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import Input from "../input/input";

const EyeOff = (props) => {
  const { onClick } = props;

  return (
    <button type="button" className="form__icon" onClick={onClick}>
      <ShowIcon type="primary" />
    </button>
  );
};
const Eye = (props) => {
  const { onClick } = props;

  return (
    <button type="button" className="form__icon" onClick={onClick}>
      <HideIcon type="primary" />
    </button>
  );
};

const PasswordInput = ({ type, ...props }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={isVisible ? "text" : "password"}
      icon={isVisible ? EyeOff : Eye}
      onIconClick={() => setVisible(!isVisible)}
    />
  );
};

export default PasswordInput;
