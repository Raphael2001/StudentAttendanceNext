"use client";

import { Routes } from "constants/routes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAppSelector } from "utils/hooks/useRedux";
import { moduleType } from "utils/types/init";

function usePermission(moduleId: string) {
  const permission = useAppSelector((store) => store.userData.permission);
  const modules: Array<moduleType> = useAppSelector(
    (store) => store.init.modules
  );
  const router = useRouter();

  const moduleData = useMemo(() => {
    if (modules) {
      return modules.find((m) => m._id === moduleId);
    }
    return undefined;
  }, [modules, moduleId]);

  useEffect(() => {
    if (moduleData) {
      if (!(moduleData.bitwise & permission)) {
        router.replace(Routes.cmsNoPermission);
      }
    }
  }, [moduleData, permission]);
}

export default usePermission;
