"use client";

import {
  flipCmsSideBarOpen,
  flipCmsSideBarTextVisible,
} from "redux-store/features/cmsSideBarSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useEffect, useState } from "react";

const BASE_TIMEOUT = 300;

export default function useCmsSideBar() {
  const dispatch = useAppDispatch();

  const { isOpen: isSideBarOpen, showText } = useAppSelector(
    (state) => state.cmsSideBar,
  );

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  useEffect(() => {
    if (!isSideBarOpen) {
      setIsCollapseOpen(false);
    }
  }, [isSideBarOpen]);

  const toggleSideBar = () => {
    const willOpen = !isSideBarOpen;

    if (willOpen) {
      dispatch(flipCmsSideBarOpen());
      setTimeout(() => {
        dispatch(flipCmsSideBarTextVisible());
      }, BASE_TIMEOUT);
    } else {
      if (isCollapseOpen) {
        setIsCollapseOpen((prev) => !prev);
      }
      dispatch(flipCmsSideBarTextVisible());
      setTimeout(() => {
        dispatch(flipCmsSideBarOpen());
      }, BASE_TIMEOUT);
    }
  };

  const toggleCollapse = () => {
    const willOpenCollapse = !isCollapseOpen;

    if (!isSideBarOpen && willOpenCollapse) {
      // Sidebar is closed, open it first, then collapse
      toggleSideBar();
      setTimeout(() => {
        setIsCollapseOpen(true);
      }, BASE_TIMEOUT * 2);
    } else {
      setIsCollapseOpen((prev) => !prev);
    }
  };

  return {
    isSideBarOpen,
    showText,
    isCollapseOpen,
    toggleSideBar,
    toggleCollapse,
  };
}
