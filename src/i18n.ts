import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { LOACLES } from "constants/GlobalParams";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!LOACLES.includes(locale as any)) notFound();

  return {
    messages: {},
  };
});
