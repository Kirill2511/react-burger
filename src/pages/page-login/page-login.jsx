import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import Input from "../../components/input/input";
import PasswordInput from "../../components/password-input/password-input";
import Spinner from "../../components/spinner/spinner";
import { loginUserRequest } from "../../services/actions/userActions";

const user = (state) => state.user;

const PageLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, name } = useSelector(user);

  const [formValue, setFormValue] = useState({
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
    dispatch(loginUserRequest(formValue));
  };

  if (name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Redirect to={from} />
    );
  }

  return (
    <form className="form" action="#" method="POST" onSubmit={onSubmit}>
      <div className="form__head">
        <h1 className="form__title">Вход</h1>
      </div>
      <div className="form__body">
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
            Войти {isLoading ? <Spinner /> : null}
          </Button>
        </div>
      </div>
      <div className="form__foot">
        <p className="form__text">
          Вы — новый пользователь?
          <Link to="/register" className="form__link">
            Зарегистрироваться
          </Link>
        </p>
        <p className="form__text">
          Забыли пароль?
          <Link to="/forgot-password" className="form__link">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  );
};

export default PageLogin;
