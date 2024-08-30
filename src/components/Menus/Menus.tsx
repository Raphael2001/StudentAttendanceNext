"use client";

import MenuSection from "components/MenuSection/MenuSection";
import React from "react";
import { useAppSelector } from "utils/hooks/useRedux";

function Menus() {
  const menus = useAppSelector((store) => store.initApp.menus);

  return menus.map((menu) => {
    return <MenuSection key={menu._id} {...menu} />;
  });
}

export default Menus;
