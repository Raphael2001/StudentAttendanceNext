import AppWrapper from "components/AppWrapper/AppWrapper";
import CmsLoginWrapper from "components/CmsLoginWrapper/CmsLoginWrapper";
import ISR from "utils/ISR";

export default async function MainCMSLayout({ children }) {
  const apiValidationData = await ISR.serverValidation();

  return (
    <AppWrapper
      color="green"
      className="rtl"
      apiValidationData={apiValidationData}
    >
      <CmsLoginWrapper color={"green"}>{children}</CmsLoginWrapper>
    </AppWrapper>
  );
}
