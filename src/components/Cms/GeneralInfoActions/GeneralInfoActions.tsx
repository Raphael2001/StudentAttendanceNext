import CmsButton from "components/Cms/CmsButton/CmsButton";

import styles from "./GeneralInfoActions.module.scss";

import { copy } from "utils/functions";
import { GeneralInfo, GeneralInfoValue } from "utils/types/init";
import useCMSTranslate from "utils/hooks/useCMSTranslate";
import Api from "api";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";

type actionsProps = {
  item: GeneralInfo;
  inputValue: GeneralInfoValue;
  resetValue: () => void;
};

export default function GeneralInfoActions({
  item,
  inputValue,
  resetValue,
}: actionsProps) {
  const { _id, value } = item;
  const isMultiValues = Array.isArray(value);
  const translate = useCMSTranslate();
  const { onSuccessNotification } = useNotificationsHandler();

  function updateSingleValue() {
    Api.cms.generalInfo.PUT({
      payload: { _id, value: inputValue },
      config: { onSuccess: onSuccessNotification },
    });
  }

  function updateMultiValues() {
    const currentValue: Array<any> = copy(value);

    if (isMultiValues) {
      currentValue.push(inputValue);

      function onSuccess() {
        onSuccessNotification();
        resetValue();
      }

      Api.cms.generalInfo.PUT({
        payload: { _id, value: currentValue },
        config: { onSuccess },
      });
    }
  }

  return (
    <div className={styles["actions"]}>
      {isMultiValues ? (
        <CmsButton
          text={translate("add_action")}
          onClick={updateMultiValues}
          color="blue"
        />
      ) : (
        <CmsButton
          text={translate("update_action")}
          onClick={updateSingleValue}
          color="green"
        />
      )}
    </div>
  );
}
