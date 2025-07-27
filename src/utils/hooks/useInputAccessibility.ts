import useCMSTranslate from "./useCMSTranslate";

type Props = {
  showError: boolean;
  required: boolean;
  placeholder: string;
  ariaLabel: string;
  name: string;
};

function useInputAccessibility(props: Props) {
  const translate = useCMSTranslate();
  const { showError, required, placeholder, name, ariaLabel } = props;

  const REQUIRED_INPUT_SUFFIX = translate("required_input_suffix");

  const requiredSuffix =
    required && placeholder !== "" ? ` ${REQUIRED_INPUT_SUFFIX}` : "";

  return {
    ariaInvalid: showError,
    ariaRequired: required,
    ariaLabel: ariaLabel || placeholder + requiredSuffix,
    ariaLabelledBy: `${showError ? name + "-input-error" : ""}`,
  };
}

export default useInputAccessibility;
