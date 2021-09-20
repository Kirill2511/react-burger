import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import {getRegister} from "../../redux/actions";
import {INITIAL_FORM_REGISTER} from "../../utils/constants";
import styles from "./sign-register.module.css"

const SignRegister = () => {

  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_FORM_REGISTER);

  const onFieldChange = (e) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    setForm(prev => ({ ...prev, [fieldName]: value }));
  };

  const onReset = () => {
    setForm(INITIAL_FORM_REGISTER);
  }

  const onSubmit = (e) => {
    dispatch(getRegister(form));
    e.preventDefault();

    onReset();
  };

  return (
    <div className={styles.login}>
      <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
      <form className={styles.form} onSubmit={onSubmit} >
        <div className={styles.input_container}>
          <Input onChange={onFieldChange} value={form.name} name="name" size="default" placeholder="Имя" />
          <Input onChange={onFieldChange} value={form.email} name="email" size="default" placeholder="E-mail" />
          <PasswordInput onChange={onFieldChange} value={form.password} name="password" size="default" />
          <div className={styles.button_container}>
            <Button type="primary" size="medium">Зарегистрироваться</Button>
          </div>
        </div>
      </form>
      <div className={styles.link_container}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Уже зарегитрированы?
        </p>
        <Link to="/login" className={`${styles.link} text text_type_main-default`}>
          Войти
        </Link>
      </div>

    </div>
  );
}

export default SignRegister;