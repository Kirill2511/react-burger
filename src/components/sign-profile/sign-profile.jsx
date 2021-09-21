import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "../../redux/actions";
import { getSing } from "../../redux/selectors";
import { INITIAL_FORM_PROFILE } from "../../utils/constants";
import styles from "./sign-profile.module.css";

const SignProfile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_FORM_PROFILE);
  const { isAuthorized, user, lastUpdated, isFetching } = useSelector(getSing);

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...user }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, lastUpdated]);
  const onFieldChange = (e) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (e) => {
    dispatch(updateProfile(form));
    e.preventDefault();
  };

  return (
    <div className={styles.right}>
      <form className={styles.form} action="#" method="POST" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onFieldChange}
          value={form.name}
          name="name"
          error={false}
          errorText="Ошибка"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={onFieldChange}
          value={form.email}
          name="email"
          error={false}
          errorText="Ошибка"
          required
        />
        <Input
          type="text"
          placeholder="Пароль"
          onChange={onFieldChange}
          value={form.password}
          name="password"
          error={false}
          errorText="Ошибка"
          required
        />

        <div className={styles.formFoot}>
          <Button type="primary" size="medium">
            {isFetching ? "Идет сохранение" : "Сохранить"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignProfile;
