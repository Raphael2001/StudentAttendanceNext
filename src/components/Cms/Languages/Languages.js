import Api from "api/requests";
import CmsButton from "components/CmsButton/CmsButton";
import React, { useState } from "react";

import styles from "./Languages.module.scss";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { useAppSelector } from "utils/hooks/useRedux";

export default function Languages(props) {
  const { onSuccessNotification } = useNotificationsHandler();

  const languages = useAppSelector((store) => store.init?.languages);
  const [form, setForm] = useState({
    langId: "",
    langName: "",
  });

  const [tableInputs, setTabletInputs] = useState({});

  function addNewLanguage() {
    function onSuccess(data) {
      const newState = { ...form };
      newState.langId = "";
      newState.langName = "";
      setForm(newState);
    }
    const payload = { langId: form.langId, lang: form.langName };
    Api.upsertLanguage({ payload, onSuccess });
  }

  function onChangeForm(e) {
    const { value, name } = e.target;

    const newState = { ...form };
    newState[name] = value;
    setForm(newState);
  }

  function onDelete(item) {
    const payload = { langId: item._id };
    Api.deleteLanguage({ payload });
  }

  function onUpdate(item) {
    const langId = item._id;
    const langInput = tableInputs[langId];

    if (langInput) {
      const payload = { langId: langId, lang: langInput };
      Api.upsertLanguage({ payload, onSuccess: onSuccessNotification });
    }
  }

  const deleteAction = {
    color: TABLE_COLORS.RED,
    text: "מחיקה",
    onClick: onDelete,
  };
  const updateAction = {
    color: TABLE_COLORS.GREEN,
    text: "עדכון",
    onClick: onUpdate,
  };

  function onCellInputChange({ value, id }) {
    setTabletInputs((prevState) => {
      return { ...prevState, [id]: value };
    });
  }

  const header = {
    _id: {
      title: "מזהה",
      type: TABLE_CELL_TYPES.TEXT,
    },
    lang: {
      title: "ערך",
      type: TABLE_CELL_TYPES.INPUT,
      onChangeInput: onCellInputChange,
      uniqueField: "_id",
    },
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["cms-languages-wrapper"]}>
      <h3 className={styles["general-info-title language-title"]}>שפות</h3>
      <div className={styles["add-new-lang"]}>
        <div className={styles["languages-header-titles"]}>
          <span className={styles["header-title"]}>מזהה</span>
          <span className={styles["header-title"]}>ערך</span>
          <span className={styles["header-title"]}>פעולות</span>
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
            <CmsButton text={"הוסף"} onClick={addNewLanguage} color="blue" />
          </div>
        </div>
      </div>
      <div className={styles["lang-table"]}>
        {languages && <TableCreator data={languages} header={header} />}
      </div>
    </div>
  );
}
