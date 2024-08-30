"use client";

import React, { useMemo } from "react";

import ItemIngredientsMenuForm from "components/IngredientsMenuForm/IngredientsMenuForm";

import { useAppSelector } from "utils/hooks/useRedux";

function MenuPage(props) {
  const { params } = props;
  const { id } = params;

  const ingredientsMenus = useAppSelector(
    (store) => store.init.ingredientsMenus
  );

  const menu = useMemo(() => {
    if (Array.isArray(ingredientsMenus)) {
      return ingredientsMenus.find((m) => m._id === id);
    }
    return undefined;
  }, [id, ingredientsMenus]);

  return <ItemIngredientsMenuForm menu={menu} />;
}

export default MenuPage;
