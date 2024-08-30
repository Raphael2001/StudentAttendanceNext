"use client";

import {
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import React, { PropsWithChildren, useMemo } from "react";

interface Props {}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

function Overlay({ children }: PropsWithChildren<Props>) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  );
}

export default Overlay;
