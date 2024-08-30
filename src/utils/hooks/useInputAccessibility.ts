type Props = {
  showError: boolean;
  required: boolean;
  placeholder: string;
  ariaLabel: string;
  name: string;
};
const REQUIRED_INPUT_SUFFIX = "(חובה)";

function useInputAccessibility(props: Props) {
  const { showError, required, placeholder, name, ariaLabel } = props;

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
