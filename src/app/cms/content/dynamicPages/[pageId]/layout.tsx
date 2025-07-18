import DynamicPageLayout from "components/App/DynamicPages/DynamicPageComponents/DynamicPageLayout";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ pageId: string }>;
  children: React.ReactNode;
}) {
  const { pageId } = await params;

  return <DynamicPageLayout pageId={pageId}>{children}</DynamicPageLayout>;
}
