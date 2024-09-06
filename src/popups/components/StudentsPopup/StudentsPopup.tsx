"use client";

import React, { useRef } from "react";

import styles from "./StudentsPopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";

import Api from "api/requests";
import { StudentType } from "utils/types/student";

type Payload = {
  dataItem?: StudentType;
};

type Props = {
  payload: Payload;
};

function StudentPopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const teachers = useAppSelector((store) => store.init.teachers);

  const ref = useRef<SlidePopupRef>();

  function onSubmit(payload) {
    if (dataItem) {
      return Api.updateStudent({ payload, onSuccess });
    }

    Api.addStudent({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "_id",
        label: "תעודת זהות",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "name",
        label: "שם תלמיד",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "className",
        label: "שם כיתה",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },

      {
        name: "teacherId",
        label: "מורה",
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        rules: ["not_empty"],
        options: teachers,
        field: "name",
      },
    ],
    initialData: dataItem,
  };

  return (
    <SlidePopup className={styles["student-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={!dataItem ? "הוסף" : "עדכן"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default StudentPopup;
