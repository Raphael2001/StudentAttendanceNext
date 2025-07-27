import MetaTagsForm from "components/Cms/MetaTagsForm/MetaTagsForm";
import React from "react";

export default async function MetaTagsUpdate({
  params,
}: {
  params: Promise<{ metaTagId: string }>;
}) {
  const { metaTagId } = await params;

  return <MetaTagsForm metaTagId={metaTagId} />;
}
