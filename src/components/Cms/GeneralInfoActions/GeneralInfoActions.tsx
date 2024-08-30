import CmsButton from "components/CmsButton/CmsButton";

import styles from "./GeneralInfoActions.module.scss";
import useGeneralInfo from "utils/hooks/useGeneralInfo";
import { copy } from "utils/functions";
import { generalInfoValue } from "utils/types/init";

type actionsProps = {
  name: string;
  inputValue: generalInfoValue;
  resetValue: () => void;
};

export default function GeneralInfoActions({
  name = "",
  inputValue,
  resetValue,
}: actionsProps) {
  const { multiValues, value, upsertGeneralInfo } = useGeneralInfo(name);
  function updateSingleValue() {
    upsertGeneralInfo(inputValue);
  }

  function updateMultiValues() {
    const currentValue: Array<any> = copy(value);

    if (multiValues) {
      currentValue.push(inputValue);
      upsertGeneralInfo(currentValue, resetValue);
    }
  }

  return (
    <div className={styles["actions"]}>
      {multiValues ? (
        <CmsButton text={"הוספה"} onClick={updateMultiValues} color="blue" />
      ) : (
        <CmsButton text={"עדכון"} onClick={updateSingleValue} color="green" />
      )}
    </div>
  );
}
