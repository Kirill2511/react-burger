import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Input from "../../components/input/input";
import PasswordInput from "../../components/password-input/password-input";
import Spinner from "../../components/spinner/spinner";
import { registerUserRequest } from "../../services/actions/userActions";

const user = (state) => state.user;

const PageRegister = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(user);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserRequest(formValue));
  };

  return (
    <form className="form" action="#" method="POST" onSubmit={onSubmit}>
      <div className="form__head">
        <h1 className="form__title">Регистрация</h1>
      </div>
      <div className="form__body">
        <Input type="text" name="name" value={formValue.name} placeholder="Имя" onChange={onChange} required />

        <Input type="email" name="email" value={formValue.email} placeholder="Email" onChange={onChange} required />

        <PasswordInput
          type="password"
          name="password"
          value={formValue.password}
          placeholder="Пароль"
          onChange={onChange}
          required
        />

        <div className="form__submit">
          <Button type="primary" size="medium">
            Зарегистрироваться {isLoading ? <Spinner /> : null}
          </Button>
        </div>
      </div>
      <div className="form__foot">
        <p className="form__text">
          Уже зарегистрированы?
          <Link to="/login" className="form__link">
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};

export default PageRegister;
