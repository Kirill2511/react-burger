import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";

import { updateProfile } from "../../redux/actions";
import { INITIAL_FORM_PROFILE } from "../../utils/constants";
import styles from "./sign-profile.module.css";

const SignProfile: FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_FORM_PROFILE);
  const { isAuthorized, user, lastUpdated, isFetching } = useSelector((store) => store.sign);

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...user }));
  }, [isAuthorized, lastUpdated]);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(updateProfile(form));
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        onChange={onFieldChange}
        value={form.name}
        icon="EditIcon"
        name="name"
        size="default"
      />
      <EmailInput onChange={onFieldChange} value={form.email} name="email" />

      <PasswordInput onChange={onFieldChange} value={form.password} name="password" />
      <div className={styles.button_container}>
        <Button type="primary" size="medium">
          {isFetching ? "Идет сохранение" : "Сохранить"}
        </Button>
      </div>
    </form>
  );
};

export default SignProfile;
