import "styles/globals.scss";
import MenuWrapper from "components/Cms/CmsMenu/MenuWrapper/MenuWrapper";

export default function RootLayout({ children }) {
  return <MenuWrapper>{children}</MenuWrapper>;
}
