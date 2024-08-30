import CheckBox from "components/forms/CheckBox/CheckBox";
import { inputEvent } from "utils/types/inputs";

type Props = {
  field: string;
  name: string;
  data: any;
  onChange: (e: inputEvent) => void;
  values: Array<string>;
};

function CheckBoxCell({ field, name, data, onChange, values }: Props) {
  const id = data[field] ?? "";
  const value = values.includes(id.toString());
  return <CheckBox value={value} name={name} id={id} onChange={onChange} />;
}

export default CheckBoxCell;
