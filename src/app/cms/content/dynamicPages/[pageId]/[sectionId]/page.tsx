import React from "react";

import DynamicPageComponentsForm from "components/App/DynamicPages/DynamicPageComponents/Form/DynamicPageComponentsForm";

export default async function DynamicPageComponentsUpdate({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = await params;

  return <DynamicPageComponentsForm sectionId={sectionId} />;
}
