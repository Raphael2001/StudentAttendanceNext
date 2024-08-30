"use client";
import Api from "api/requests";
import { useEffect } from "react";

import styles from "./cmslogin.module.scss";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import FormCreator from "components/FormCreator/FormCreator";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import LoginButton from "components/Cms/LoginButton/LoginButton";

import ThemeImage from "/public/assets/images/trees.webp";
import { useAppSelector } from "utils/hooks/useRedux";

export default function Login() {
  const tokens = useAppSelector((store) => store.tokens);
  const router = useRouter();

  useEffect(() => {
    if (tokens.accessToken) {
      router.push(Routes.cmsHome);
    }
  }, [tokens]);

  function onSubmit(payload) {
    Api.login({ payload });
  }

  const formData = {
    inputs: [
      {
        name: "username",
        rules: ["not_empty"],
        title: "שם משתמש",
        inputType: FORM_INPUTS_TYPES.BORDER_INPUT,
        label: "הזינו את שם המשתמש",
      },
      {
        name: "password",
        rules: ["not_empty"],
        title: "סיסמא",
        inputType: FORM_INPUTS_TYPES.BORDER_INPUT,
        type: "password",
        label: "הזינו את הסיסמא",
      },
    ],
  };

  return (
    <div className={styles["cms-login-wrapper"]}>
      <div className={styles["login-form-wrapper"]}>
        <div className={styles["theme-image"]}>
          <img src={ThemeImage.src} />
        </div>
        <div className={styles["inputs"]}>
          <FormCreator
            formData={formData}
            buttonText={"התחברות"}
            onSubmit={onSubmit}
            CustomButton={LoginButton}
          />
        </div>
      </div>
    </div>
  );
}
