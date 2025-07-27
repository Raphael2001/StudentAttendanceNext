"use client";

import React, { ComponentType, createRef, useCallback, useEffect, useState } from "react";

import styles from "./FormCreator.module.scss";
import InputsCreator from "components/General/FormCreator/InputsCreator/InputsCreator";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import { Form, FormData, FormInputData, OnChangeValue } from "utils/types/form";

import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { clsx } from "utils/functions";
import { TextType } from "utils/types/initApp";
import { getText } from "utils/functions/textFunctions";
import { useFieldValidator } from "utils/hooks/useFieldValidator";

type Props = {
	formData: FormData;
	children?: React.ReactNode;
	CustomButton?: ComponentType<any>;
	onSubmit: (payload: Object) => boolean;
	buttonText: string | TextType;
	className?: string;
	onDeleteInput?: (form: FormData) => void;
};

const FormCreator = (props: Props) => {
	const { formData, children, CustomButton, buttonText, onSubmit, className = "", onDeleteInput = () => {} } = props;
	const { inputs, initialData } = formData;

	const [firstTry, setFirstTry] = useState(true);

	const [form, setForm] = useState<Form>({});
	const validate = useFieldValidator();

	function defaultValue(input: FormInputData) {
		if (input.initialValue) {
			return input.initialValue;
		}

		switch (input.inputType) {
			case FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE:
			case FORM_INPUTS_TYPES.CHECKBOXES:
				return [];
			case FORM_INPUTS_TYPES.CHECKBOX:
				return false;
			default:
				return "";
		}
	}

	function getRef(input: FormInputData) {
		switch (input.inputType) {
			case FORM_INPUTS_TYPES.AUTO_GROW_TEXT_AREA:
			case FORM_INPUTS_TYPES.ANIMATED_TEXT_AREA:
			case FORM_INPUTS_TYPES.TEXT_AREA:
			case FORM_INPUTS_TYPES.ANIMATED_AUTO_GROW_TEXT_AREA:
				return createRef<HTMLInputElement>();

			case FORM_INPUTS_TYPES.SELECT:
			case FORM_INPUTS_TYPES.MULTI_SELECT:
			case FORM_INPUTS_TYPES.MULTI_SELECT_AUTO_COMPLETE:
			case FORM_INPUTS_TYPES.LANGUAGE_SELECT:
			case FORM_INPUTS_TYPES.MEDIA_MULTI_SELECT:
				return createRef<HTMLButtonElement>();

			default:
				return createRef<HTMLInputElement>();
		}
	}

	function initializeInput(input: FormInputData, reset: boolean) {
		const name = input.name;

		if (!form[name] || reset) {
			let initialValue: OnChangeValue = "";
			if (!reset) {
				if (initialData && initialData.hasOwnProperty(name)) {
					initialValue = initialData[name];
				} else {
					initialValue = defaultValue(input);
				}
			}

			const inputData = {
				value: initialValue,
				valid: false,
				errorMessage: "",
				schema: input.schema,
				ref: getRef(input),
			};

			return { inputData, name };
		} else {
			return { inputData: form[name], name };
		}
	}

	const initializeForm = useCallback(
		(reset = false) => {
			const formData = {};

			if (Array.isArray(inputs)) {
				inputs.forEach((item: FormInputData | Array<FormInputData>) => {
					if (Array.isArray(item)) {
						item.forEach((input) => {
							const { inputData, name } = initializeInput(input, reset);
							formData[name] = inputData;
						});
					} else {
						const { inputData, name } = initializeInput(item, reset);
						formData[name] = inputData;
					}
				});
			}

			setForm(formData);
		},
		[inputs, initialData],
	);

	useEffect(() => {
		initializeForm();
	}, [initializeForm]);

	function onChange(name: string, value: OnChangeValue) {
		if (!form[name]) {
			return;
		}

		const { valid, msg } = validate(form[name].schema, value, name);

		setForm((prevState) => {
			return {
				...prevState,
				[name]: {
					...prevState[name],
					value,
					valid,
					errorMessage: msg,
				},
			};
		});
	}

	function showError(name: string) {
		return !form?.[name]?.valid && !firstTry;
	}

	function onSubmitHandler(e) {
		e.preventDefault();
		setFirstTry(false);

		let formValid = true;
		const payload = {};
		const newState = { ...form };

		let firstErrorInputName = "";

		for (const name in form) {
			const { valid, msg } = validate(form[name].schema, form[name].value, name);

			newState[name].valid = valid;
			newState[name].errorMessage = msg;

			payload[name] = form[name].value;

			if (!valid) {
				if (!firstErrorInputName) {
					firstErrorInputName = name;
				}

				formValid = false;
			}
		}

		if (firstErrorInputName) {
			form[firstErrorInputName]?.ref?.current?.focus();
		}

		setForm(newState);

		if (formValid) {
			const shouldInitializeForm = onSubmit(payload);
			if (shouldInitializeForm) {
				initializeForm(true);
				setFirstTry(true);
			}
		}
		return false;
	}

	function deleteInput(name: string) {
		const newInputs = inputs.filter((i) => {
			if (Array.isArray(i)) {
				return i.filter((item) => item.name !== name);
			}
			return i.name !== name;
		});
		onDeleteInput({ ...formData, inputs: newInputs });
	}

	const btnText = getText(buttonText);

	function inputHandler(input: FormInputData) {
		const value = form?.[input.name]?.value ?? "";
		const errorMessage = form?.[input.name]?.errorMessage ?? "";
		const ref = form?.[input.name]?.ref;

		return (
			<InputsCreator
				input={input}
				key={"input" + input.name}
				onChange={onChange}
				showError={showError}
				value={value}
				errorMessage={errorMessage}
				deleteInput={deleteInput}
				ref={ref}
			/>
		);
	}

	return (
		<form className={clsx(styles["cms-form"], className)}>
			{inputs.map((item: FormInputData | Array<FormInputData>, index: number) => {
				if (Array.isArray(item)) {
					return (
						<div
							className={styles["cms-form-row"]}
							key={"form-row" + index}
						>
							{item.map((i) => inputHandler(i))}
						</div>
					);
				} else {
					return inputHandler(item);
				}
			})}
			{children && children}
			<div className={styles["actions"]}>
				{CustomButton ? (
					<CustomButton
						text={buttonText}
						onClick={onSubmitHandler}
					/>
				) : (
					<CmsButton
						text={btnText}
						onClick={onSubmitHandler}
					/>
				)}
			</div>
		</form>
	);
};

export default FormCreator;
