import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Input from "../../components/input/input";
import PasswordInput from "../../components/password-input/password-input";
import Spinner from "../../components/spinner/spinner";
import { createUserPassword } from "../../services/actions/userActions";

const user = (state) => state.user;

const PageResetPassword = () => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    password: "",
    token: "",
  });

  const userEmailForgotPassword = localStorage.getItem("userEmailForgotPassword");
  // eslint-disable-next-line no-unused-vars
  const { isLoading, isForgotPasswordRequest, isResetPasswordRequest } = useSelector(user);

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
    dispatch(createUserPassword(formValue));
  };

  if (isResetPasswordRequest && userEmailForgotPassword !== null) {
    return <Redirect to="/login" />;
  }

  return (
    <form className="form" action="#" method="POST" onSubmit={onSubmit}>
      <div className="form__head">
        <h1 className="form__title">Восстановление пароля</h1>
      </div>
      <div className="form__body">
        <PasswordInput
          type="password"
          name="password"
          value={formValue.password}
          placeholder="Введите новый пароль"
          onChange={onChange}
          required
        />

        <Input
          type="text"
          name="token"
          value={formValue.token}
          placeholder="Введите код из письма"
          onChange={onChange}
          required
        />
        <div className="form__submit">
          <Button type="primary" size="medium">
            Сохранить {isLoading ? <Spinner /> : null}
          </Button>
        </div>
      </div>
      <div className="form__foot">
        <p className="form__text">
          Вспомнили пароль?
          <Link to="/login" className="form__link">
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};

export default PageResetPassword;
