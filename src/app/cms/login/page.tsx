"use client";
import Api from "api";
import { useEffect } from "react";

import styles from "./login.module.scss";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import FormCreator from "components/General/FormCreator/FormCreator";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import LoginButton from "components/Cms/LoginButton/LoginButton";

import { useAppSelector } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";

export default function Login() {
	const tokens = useAppSelector((store) => store.tokens);
	const router = useRouter();

	const translate = useCMSTranslate();

	useEffect(() => {
		if (tokens.accessToken) {
			router.push(Routes.cmsHome);
		}
	}, [tokens]);

	function onSubmit(payload) {
		Api.auth.login.POST({ payload });

		return false;
	}

	const formData = {
		inputs: [
			{
				name: "username",
				schema: VALIDATION_SCHEMES.RequiredString,
				title: translate("username"),
				inputType: FORM_INPUTS_TYPES.BORDER_INPUT,
				label: translate("enter_username"),
			},
			{
				name: "password",
				schema: VALIDATION_SCHEMES.RequiredString,
				title: translate("password"),
				inputType: FORM_INPUTS_TYPES.BORDER_INPUT,
				type: "password",
				label: translate("enter_password"),
			},
		],
	};

	return (
		<div className={styles["cms-login-wrapper"]}>
			<div className={styles["login-form-wrapper"]}>
				<div className={styles["theme-image"]}>
					<img
						src={"/assets/images/trees.webp"}
						alt="trees"
					/>
				</div>
				<div className={styles["inputs"]}>
					<FormCreator
						formData={formData}
						buttonText={translate("login")}
						onSubmit={onSubmit}
						CustomButton={LoginButton}
					/>
				</div>
			</div>
		</div>
	);
}
