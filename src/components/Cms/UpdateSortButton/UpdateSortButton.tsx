"use client";

import React from "react";

import styles from "./UpdateSortButton.module.scss";
import CmsButton from "components/Cms/CmsButton/CmsButton";
import Api from "api";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { GeneralServerItem } from "utils/types/general";
import { createSortObject } from "utils/functions";
import useCMSTranslate from "utils/hooks/useCMSTranslate";

type Props = {
  text?: string;
  moduleName: string;
  list: Array<GeneralServerItem>;
  onSuccess?: (data: Array<Object>) => void;
};

function UpdateSortButton(props: Props) {
  const translate = useCMSTranslate();
  const {
    text = translate("update_table_sort"),
    list,
    moduleName,
    onSuccess = () => {},
  } = props;
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

    Api.cms.sort.POST({ payload, config: { onSuccess: onSuccessHandler } });
  }

  return (
    <div className={styles["sort-button-wrapper"]}>
      <CmsButton text={text} onClick={onClick} />
    </div>
  );
}

export default UpdateSortButton;
