import React, { useMemo, useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import type { Active } from "@dnd-kit/core";
import Overlay from "components/General/DnD/Overlay/Overlay";

import styles from "./Drop.module.scss";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { clsx } from "utils/functions";

interface Props {
	items: Array<any>;
	renderOverlayItem(id: string): ReactNode;
	onChange(activeIndex: number, overIndex: number): void;
	className?: string;
}

export function DropWrapper({ children, onChange, renderOverlayItem, items = [], className = "" }: PropsWithChildren<Props>) {
	const [active, setActive] = useState<Active | null>(null);

	const activeItem = useMemo(() => items.find((item) => item._id === active?.id), [active, items]);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
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
				<ul
					className={clsx(styles["list-wrapper"], className)}
					role="application"
				>
					{children}
				</ul>
			</SortableContext>
			<Overlay>{activeItem ? renderOverlayItem(activeItem) : null}</Overlay>
		</DndContext>
	);
}
