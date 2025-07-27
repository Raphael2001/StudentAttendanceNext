import Api from "api";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import React, { useState } from "react";

import styles from "./Languages.module.scss";
import TableCreator from "components/General/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { useAppSelector } from "utils/hooks/useRedux";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import EditPencil from "components/General/Svg/EditPencil";
import Trash from "components/General/Svg/Trash";

export default function Languages(props) {
	const { onSuccessNotification } = useNotificationsHandler();

	const languages = useAppSelector((store) => store.init?.languages);
	const translate = useCMSTranslate();

	const [form, setForm] = useState({
		langId: "",
		langName: "",
	});

	const [tableInputs, setTabletInputs] = useState({});

	function addNewLanguage() {
		function onSuccess() {
			const newState = { ...form };
			newState.langId = "";
			newState.langName = "";
			setForm(newState);
		}
		const payload = { langId: form.langId, lang: form.langName };
		Api.cms.languages.POST({ payload, config: { onSuccess } });
	}

	function onChangeForm(e) {
		const { value, name } = e.target;

		const newState = { ...form };
		newState[name] = value;
		setForm(newState);
	}

	function onDelete(item) {
		const payload = { _id: item._id };
		Api.cms.languages.DELETE({ payload });
	}

	function onUpdate(item) {
		const id = item._id;
		const langInput = tableInputs[id];
		const langId = item.langId;

		if (langInput) {
			const payload = { _id: id, langId, lang: langInput };
			Api.cms.languages.PUT({
				payload,
				config: { onSuccess: onSuccessNotification },
			});
		}
	}

	const deleteAction = {
		color: TABLE_COLORS.RED,
		icon: Trash,
		onClick: onDelete,
	};
	const updateAction = {
		color: TABLE_COLORS.GREEN,
		icon: EditPencil,
		onClick: onUpdate,
	};

	function onCellInputChange({ value, id }) {
		setTabletInputs((prevState) => {
			return { ...prevState, [id]: value };
		});
	}

	const header = {
		langId: {
			title: translate("lang_id"),
			type: TABLE_CELL_TYPES.TEXT,
		},
		lang: {
			title: translate("lang_name"),
			type: TABLE_CELL_TYPES.INPUT,
			onChangeInput: onCellInputChange,
			uniqueField: "_id",
		},
		actions: {
			title: translate("actions"),
			type: TABLE_CELL_TYPES.ACTION_BUTTONS,
			actions: [updateAction, deleteAction],
		},
	};

	return (
		<div className={styles["cms-languages-wrapper"]}>
			<h3 className={styles["general-info-title language-title"]}>{translate("languages")}</h3>
			<div className={styles["add-new-lang"]}>
				<div className={styles["languages-header-titles"]}>
					<span className={styles["header-title"]}>{translate("lang_id")}</span>
					<span className={styles["header-title"]}>{translate("lang_name")}</span>
					<span className={styles["header-title"]}>{translate("actions")}</span>
				</div>

				<div className={styles["new-language-row"]}>
					<div className={styles["input-wrapper"]}>
						<input
							className={styles["input"]}
							name={"langId"}
							value={form.langId}
							onChange={onChangeForm}
						/>
					</div>
					<div className={styles["input-wrapper"]}>
						<input
							className={styles["input"]}
							name={"langName"}
							value={form.langName}
							onChange={onChangeForm}
						/>
					</div>
					<div className={styles["button-wrapper"]}>
						<CmsButton
							text={translate("add_new")}
							onClick={addNewLanguage}
							color="blue"
						/>
					</div>
				</div>
			</div>
			<div className={styles["lang-table"]}>
				{languages && (
					<TableCreator
						data={languages}
						header={header}
					/>
				)}
			</div>
		</div>
	);
}
