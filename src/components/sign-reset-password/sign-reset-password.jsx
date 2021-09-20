import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import { getResetPassword } from "../../redux/actions";
import { INITIAL_FORM_RESET_PASSWD } from "../../utils/constants";

const SignResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [form, setForm] = useState(INITIAL_FORM_RESET_PASSWD);

  const onFieldChange = (e) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onReset = () => {
    setForm(INITIAL_FORM_RESET_PASSWD);
  };

  const onSubmit = (e) => {
    dispatch(getResetPassword(form, history));
    e.preventDefault();
    onReset();
  };

  if (history.action === "PUSH" && location.state?.resetPassword) {
    return (
      <form className="form" action="#" method="POST" onSubmit={onSubmit}>
        <div className="form__head">
          <h1 className="form__title">Восстановление пароля</h1>
        </div>
        <div className="form__body">
          <PasswordInput
            type="password"
            name="password"
            value={form.password}
            placeholder="Введите новый пароль"
            onChange={onFieldChange}
            required
          />

          <Input
            type="text"
            name="token"
            value={form.token}
            placeholder="Введите код из письма"
            onChange={onFieldChange}
            required
          />
          <div className="form__submit">
            <Button type="primary" size="medium">
              Сохранить
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
  }
  return <Redirect to="/login" />;
};

export default SignResetPassword;
