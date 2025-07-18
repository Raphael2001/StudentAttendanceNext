import CheckBox from "components/General/Forms/CheckBox/CheckBox";
import { InputEvent } from "utils/types/inputs";

type Props = {
  field: string;
  name: string;
  data: any;
  onChange: (e: InputEvent) => void;
  values: Array<string>;
};

function CheckBoxCell({ field, name, data, onChange, values }: Props) {
  const id = data[field] ?? "";
  const value = values.includes(id.toString());
  return <CheckBox value={value} name={name} id={id} onChange={onChange} />;
}

export default CheckBoxCell;
