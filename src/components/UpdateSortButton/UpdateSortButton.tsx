"use client";

import React from "react";

import styles from "./UpdateSortButton.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import Api from "api/requests";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { generalServerItem } from "utils/types/general";
import { createSortObject } from "utils/functions";

type Props = {
  text?: string;
  moduleName: string;
  list: Array<generalServerItem>;
  onSuccess?: (data: Array<Object>) => void;
};

function UpdateSortButton(props: Props) {
  const { text = "עדכון טבלה", list, moduleName, onSuccess = () => {} } = props;
  const { onSuccessNotification } = useNotificationsHandler();

  function onClick() {
    const data = createSortObject(list);
    const payload = {
      data,
      moduleName: moduleName,
    };
    function onSuccessHandler(body) {
      onSuccessNotification();
      typeof onSuccess === "function" && onSuccess(body);
    }

    Api.sort({ payload, onSuccess: onSuccessHandler });
  }

  return (
    <div className={styles["sort-button-wrapper"]}>
      <CmsButton text={text} onClick={onClick} />
    </div>
  );
}

export default UpdateSortButton;
