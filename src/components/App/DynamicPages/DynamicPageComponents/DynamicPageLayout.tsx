"use client";
import Api from "api";
import CMS_MODULES from "constants/CMSModules";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import usePermission from "utils/hooks/usePermission";

import { useAppSelector } from "utils/hooks/useRedux";

type Props = {
  pageId: string;
  children: React.ReactNode;
};

export default function DynamicPageLayout({ pageId, children }: Props) {
  const router = useRouter();

  usePermission(CMS_MODULES.DYNAMIC_PAGES);

  const dynamicPages = useAppSelector((store) => store.init.dynamicPages);

  useEffect(() => {
    const currentPage = dynamicPages.find((page) => page._id === pageId);

    if (currentPage) {
      const payload = {
        _id: currentPage._id,
      };

      Api.cms.dynamicPages.GET({ payload });
    }
    if (dynamicPages.length && !currentPage) {
      router.replace("/404");
    }
  }, [dynamicPages]);

  return children;
}
