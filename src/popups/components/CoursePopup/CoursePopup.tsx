"use client";

import React, { useMemo } from "react";

import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";

import Api from "api/requests";
import GeneralFormPopup from "components/GeneralFormPopup/GeneralFormPopup";
import { Course } from "utils/types/course";

import styles from "./CoursePopup.module.scss";
import { convertStringToDate, formatDate } from "utils/functions";

type Payload = {
  dataItem?: Course;
};

type Props = {
  payload: Payload;
};

function CoursePopup(props: Props) {
  const { payload = {} } = props;
  const { dataItem } = payload;

  const instructors = useAppSelector((store) => store.init.instructors);

  function onSubmit(formPayload, onSuccess) {
    const payload = formatPayload(formPayload);
    if (dataItem) {
      return Api.updateCourse({ payload, onSuccess });
    }

    Api.addCourse({ payload, onSuccess });
  }

  function transformInitialData(initialData?: Course) {
    if (initialData) {
      const data = JSON.parse(JSON.stringify(initialData));
      data.endDate = convertStringToDate(initialData.endDate);
      data.startDate = convertStringToDate(initialData.startDate);
      const [hour, minute] = initialData.time.split(":");
      data.time = { hour, minute };
      return data;
    }
    return undefined;
  }

  function formatPayload(formPayload) {
    const payload = { ...formPayload };
    payload.endDate = formatDate(formPayload.endDate);
    payload.startDate = formatDate(formPayload.startDate);
    payload.time = `${formPayload.time.hour}:${formPayload.time.minute}`;
    return payload;
  }

  const initialData = useMemo(() => transformInitialData(dataItem), [dataItem]);

  const formData: FormDataType = {
    inputs: [
      {
        name: "_id",
        label: "מזהה קורס",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
        isDisabled: !!dataItem,
      },
      {
        name: "name",
        label: "שם קורס",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "startDate",
        label: "תאריך התחלה",
        inputType: FORM_INPUTS_TYPES.DATE_PICKER,
        rules: ["not_empty"],
      },
      {
        name: "endDate",
        label: "תאריך סיום",
        inputType: FORM_INPUTS_TYPES.DATE_PICKER,
        rules: ["not_empty"],
      },
      {
        name: "time",
        label: "שעת הקורס",
        inputType: FORM_INPUTS_TYPES.TIME_PICKER,
        rules: ["not_empty"],
      },
      {
        name: "days",
        label: "ימי הקורס",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },

      {
        name: "instructorId",
        label: "מדריך",
        inputType: FORM_INPUTS_TYPES.AUTO_COMPLETE,
        rules: ["not_empty"],
        options: instructors,
        field: "name",
      },
    ],
    initialData: initialData,
  };

  return (
    <GeneralFormPopup
      hasDataItem={!!dataItem}
      formData={formData}
      onSubmit={onSubmit}
      formClassName={styles["form"]}
      className={styles["course-popup"]}
    />
  );
}

export default CoursePopup;
