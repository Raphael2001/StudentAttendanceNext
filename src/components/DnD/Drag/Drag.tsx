import { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";

import { CSS } from "@dnd-kit/utilities";

import { type DraggableSyntheticListeners } from "@dnd-kit/core";

import styles from "./Drag.module.scss";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  id: string;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const DragableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function DragableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <DragableItemContext.Provider value={context}>
      <li className={styles["dragable-item"]} ref={setNodeRef} style={style}>
        {children}
      </li>
    </DragableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(DragableItemContext);

  return (
    <button
      className={styles["drag-handle"]}
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </button>
  );
}
