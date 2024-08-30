import { DEFAULT_LOCALE, LOACLES } from "constants/GlobalParams";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: LOACLES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(he|en)/:path*"],
};
