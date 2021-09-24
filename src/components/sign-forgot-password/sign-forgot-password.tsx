import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { getForgotPassword } from "../../redux/actions";
import { TSignDataForgoutPassword } from "../../redux/types";
import { INITIAL_FORM_FORGOT_PASSWD } from "../../utils/constants";
import { useDispatch } from "../../utils/hooks";
import styles from "./sign-forgot-password.module.css";

const SignForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState<TSignDataForgoutPassword>(INITIAL_FORM_FORGOT_PASSWD);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onReset = () => {
    setForm(INITIAL_FORM_FORGOT_PASSWD);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(getForgotPassword(form, history));
    e.preventDefault();
    onReset();
  };

  return (
    <div className={styles.login}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.input_container}>
          <Input onChange={onFieldChange} value={form.email} name="email" size="default" placeholder="Укажите e-mail" />
          <div className={styles.button_container}>
            <Button type="primary" size="medium">
              Восстановить
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.link_container}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вспомнили пароль?</p>
        <Link to="/login" className={`${styles.link} text text_type_main-default`}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default SignForgotPassword;
