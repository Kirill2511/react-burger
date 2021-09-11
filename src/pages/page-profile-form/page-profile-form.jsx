import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/spinner/spinner";
import { getUserInfo, updateUserInfo } from "../../services/actions/userActions";
import styles from "./page-profile-form.module.css";

const users = (state) => state.user;

const PageProfileForm = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(users);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userName = userData.name;
  const userEmail = userData.email;
  const [isFocusName, setFocusName] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line babel/no-unused-expressions
    (user || userEmail !== null) &&
      setFormValue((state) => ({
        ...state,
        name: user?.name || userName,
        email: user?.email || userEmail,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const cancelClick = (e) => {
    e.preventDefault();

    setFormValue({
      name: user?.name,
      email: user?.email,
      password: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(formValue));
  };

  return (
    <div className={styles.right}>
      <form className={styles.form} action="#" method="POST" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          onFocus={() => setFocusName(true)}
          onBlur={() => setFocusName(false)}
          icon={isFocusName ? "CloseIcon" : "EditIcon"}
          value={formValue.name}
          name="name"
          error={false}
          errorText="Ошибка"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={onChange}
          onFocus={() => setFocusEmail(true)}
          onBlur={() => setFocusEmail(false)}
          icon={isFocusEmail ? "CloseIcon" : "EditIcon"}
          value={formValue.email}
          name="email"
          error={false}
          errorText="Ошибка"
          required
        />
        <Input
          type="text"
          placeholder="Пароль"
          onChange={onChange}
          onFocus={() => setFocusPassword(true)}
          onBlur={() => setFocusPassword(false)}
          icon={isFocusPassword ? "CloseIcon" : "EditIcon"}
          value={formValue.password}
          name="password"
          error={false}
          errorText="Ошибка"
          required
        />

        <div className={styles.formFoot}>
          <Button type="secondary" size="medium" onClick={cancelClick}>
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить {isLoading ? <Spinner /> : null}
          </Button>
        </div>
      </form>
      <div className={styles.info}>
        В этом разделе вы можете
        <br />
        изменить свои персональные данные
      </div>
    </div>
  );
};

export default PageProfileForm;
