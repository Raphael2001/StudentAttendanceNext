"use client";

import React, { useEffect, useState } from "react";

import useCMSTranslate from "utils/hooks/useCMSTranslate";

import CmsButton from "components/Cms/CmsButton/CmsButton";
import styles from "./DynamicPageComponentsForm.module.scss";
import Select from "components/General/Forms/Select/Select";
import DYNAMIC_PAGE_COMPONENTS_ID from "constants/DynamicPageComponentsId";
import { GeneralOptionItem } from "utils/types/inputs";
import { generateUniqueId } from "utils/functions";
import FormCreator from "components/General/FormCreator/FormCreator";
import { FormData, FormInputData, Inputs } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/FormInputsTypes";
import { DynamicPageComponent } from "utils/types/dynamicPages";
import Api from "api";
import { useAppSelector } from "utils/hooks/useRedux";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import VALIDATION_SCHEMES from "constants/PredefinedValidationScheme";
type Props = {
	sectionId?: string;
};

export default function DynamicPageComponentsForm(props: Props) {
	const { sectionId = "" } = props;

	const translate = useCMSTranslate();

	const router = useRouter();

	const pageData = useAppSelector((store) => store.dynamicPage);
	const dynamicPagesComponentsTypes = useAppSelector((store) => store.init.dynamicPagesComponentsTypes);
	const options = Object.values(dynamicPagesComponentsTypes);
	const pageId = pageData._id;

	const nameInput = {
		inputType: FORM_INPUTS_TYPES.INPUT,
		name: "name",
		schema: VALIDATION_SCHEMES.RequiredString,
		label: translate("component_name"),
	};

	const initialInputs = sectionId ? [] : [nameInput];

	const [inputs, setInputs] = useState<Inputs>(initialInputs);

	const [componentChooser, setComponentChooser] = useState("");

	useEffect(() => {
		if (pageData) {
			const sectionData = pageData.sections.find((section) => section._id === sectionId);
			if (sectionData) {
				nameInput["initialValue"] = sectionData.name;
				const dynamicInputs = [nameInput, ...revertPayload(sectionData)];

				setInputs(dynamicInputs);
			}
		}
	}, [pageData]);

	function onAddClick() {
		const id = generateUniqueId(16);
		const name = `${id}-${componentChooser}`;
		const inputData = convertTypeToInput(componentChooser);
		const item: FormInputData = {
			...inputData,
			id,
			name,
		};
		setInputs([...inputs, item]);
		setComponentChooser("");
	}

	function convertTypeToInput(componentType: string) {
		switch (componentType) {
			case DYNAMIC_PAGE_COMPONENTS_ID.MEDIA:
				return {
					inputType: FORM_INPUTS_TYPES.MEDIA,
					schema: VALIDATION_SCHEMES.RequiredString,
					label: translate("media"),
					showDeleteInputButton: true,
				};
			case DYNAMIC_PAGE_COMPONENTS_ID.MEDIA_CAROUSEL:
			case DYNAMIC_PAGE_COMPONENTS_ID.MEDIA_SLIDER:
				return {
					inputType: FORM_INPUTS_TYPES.MEDIA_MULTI_SELECT,
					schema: VALIDATION_SCHEMES.RequiredArray,
					label: translate("media"),
					showDeleteInputButton: true,
				};
			case DYNAMIC_PAGE_COMPONENTS_ID.RATING:
				return {
					inputType: FORM_INPUTS_TYPES.RATING_INPUT,
					schema: VALIDATION_SCHEMES.RequiredString,
					label: translate("dynamic_page_rating"),
					showDeleteInputButton: true,
				};

			case DYNAMIC_PAGE_COMPONENTS_ID.EDITOR:
			default:
				return {
					inputType: FORM_INPUTS_TYPES.EDITOR,
					schema: VALIDATION_SCHEMES.RequiredString,
					label: translate("dynamic_page_editor"),
					showDeleteInputButton: true,
				};
		}
	}

	function onChangeSelect(name: string, option: GeneralOptionItem) {
		setComponentChooser(option._id);
	}

	function onSubmit(formPayload) {
		const payload = transformForm(formPayload);
		if (sectionId) {
			payload["_id"] = sectionId;
			Api.cms.dynamicPagesSections.PUT({ payload, config: { onSuccess } });
		} else {
			Api.cms.dynamicPagesSections.POST({ payload, config: { onSuccess } });
		}

		function onSuccess() {
			router.push(Routes.cmsDynamicPage + "/" + pageId);
		}

		return false;
	}

	const formData: FormData = {
		inputs,
	};

	function onDeleteInput(newForm: FormData) {
		setInputs(newForm.inputs);
	}

	function transformForm(form) {
		const payload: {
			pageId: string;
			name: string;
			components: DynamicPageComponent[];
		} = {
			pageId,
			name: form.name,
			components: [],
		};

		for (const key in form) {
			if (key.includes("-")) {
				const value = form[key];
				const [componentId, componentType] = key.split("-");

				const component: DynamicPageComponent = {
					_id: componentId,
					type: componentType,
					value,
				};
				payload.components.push(component);
			}
		}

		return payload;
	}

	function revertPayload(payload) {
		const components: DynamicPageComponent[] = payload.components;
		const inputs: FormInputData[] = [];
		for (const component of components) {
			const inputData = convertTypeToInput(component.type);
			const item: FormInputData = {
				...inputData,
				initialValue: component.value,
				name: `${component._id}-${component.type}`,
			};
			inputs.push(item);
		}
		return inputs;
	}

	return (
		<div className={styles["dynamic-page-components-form"]}>
			<FormCreator
				buttonText={sectionId ? translate("update_action") : translate("add_action")}
				onSubmit={onSubmit}
				formData={formData}
				onDeleteInput={onDeleteInput}
			>
				<div className={styles["add-component-wrapper"]}>
					<Select
						placeholder={translate("select_component")}
						options={options}
						onChange={onChangeSelect}
						value={componentChooser}
						className={styles["add-component-select"]}
					/>
					<CmsButton
						isDisabled={!componentChooser}
						text={translate("add_component")}
						onClick={onAddClick}
					/>
				</div>
			</FormCreator>
		</div>
	);
}
