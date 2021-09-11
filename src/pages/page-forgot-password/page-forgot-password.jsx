import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import Input from "../../components/input/input";
import Spinner from "../../components/spinner/spinner";
import { resetUserPassword } from "../../services/actions/userActions";

const user = (state) => state.user;

const PageForgotPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
  });

  const { isLoading, isForgotPasswordRequest } = useSelector(user);

  const onChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userEmailForgotPassword", form.email);
    dispatch(resetUserPassword(form));
  };

  if (isForgotPasswordRequest) {
    return <Redirect to={{ pathname: "/reset-password", state: { from: location.pathname } }} />;
  }

  return (
    <form className="form" action="#" method="POST" onSubmit={onSubmit}>
      <div className="form__head">
        <h1 className="form__title">Восстановление пароля</h1>
      </div>
      <div className="form__body">
        <Input type="email" name="email" value={form.email} placeholder="Email" onChange={onChange} required />

        <div className="form__submit">
          <Button type="primary" size="medium">
            Восстановить {isLoading ? <Spinner /> : null}
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

export default PageForgotPassword;
