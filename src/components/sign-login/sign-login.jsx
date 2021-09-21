import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getLogin } from "../../redux/actions";
import { INITIAL_FORM_LOGIN } from "../../utils/constants";
import styles from "./sign-login.module.css";

const SignLogin = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_FORM_LOGIN);
  const onFieldChange = (e) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onReset = () => {
    setForm(INITIAL_FORM_LOGIN);
  };

  const onSubmit = (e) => {
    dispatch(getLogin(form));
    e.preventDefault();
    onReset();
  };

  return (
    <div className={styles.login}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Вход</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input_container}>
          <Input onChange={onFieldChange} value={form.email} name="email" size="default" placeholder="E-mail" />
          <PasswordInput onChange={onFieldChange} value={form.password} name="password" size="default" />
          <div className={styles.button_container}>
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.link_container}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вы — новый пользователь?</p>
        <Link to="/register" className={`${styles.link} text text_type_main-default`}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.link_container}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Забыли пароль?</p>
        <Link to="/forgot-password" className={`${styles.link} text text_type_main-default`}>
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default SignLogin;
