import React, { useMemo, useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active } from "@dnd-kit/core";
import Overlay from "../Overlay/Overlay";

import styles from "./Drop.module.scss";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

interface Props {
  items: Array<any>;
  renderOverlayItem(id: string): ReactNode;
  onChange(activeIndex: number, overIndex: number): void;
}

export function DropWrapper({
  children,
  onChange,
  renderOverlayItem,
  items,
}: PropsWithChildren<Props>) {
  const [active, setActive] = useState<Active | null>(null);

  const activeItem = useMemo(
    () => items.find((item) => item._id === active?.id),
    [active, items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ _id }) => _id === active.id);
          const overIndex = items.findIndex(({ _id }) => _id === over.id);
          onChange(activeIndex, overIndex);
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul className={styles["list-wrapper"]} role="application">
          {children}
        </ul>
      </SortableContext>
      <Overlay>{activeItem ? renderOverlayItem(activeItem) : null}</Overlay>
    </DndContext>
  );
}

type DroppableProps = {
  id: string;
};

export function Droppable({ id, children }: PropsWithChildren<DroppableProps>) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    opacity: isOver ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles["test"]}>
      {children}
    </div>
  );
}
