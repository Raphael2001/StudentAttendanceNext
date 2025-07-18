import styles from "./Pagination.module.scss";
import { clsx } from "utils/functions";
import Chevron from "components/General/Svg/Chevron";

type Props = {
	numberOfPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	className?: string;
};

function getFixedPageNumbers(current: number, total: number): (number | string)[] {
	const maxVisible = 7;
	if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

	const pages: (number | string)[] = [];
	let middle: number[];

	if (current <= 4) {
		middle = [2, 3, 4, 5];
	} else if (current >= total - 3) {
		middle = [total - 4, total - 3, total - 2, total - 1];
	} else {
		middle = [current - 1, current, current + 1];
	}

	pages.push(1);
	if (middle[0] > 2) pages.push("...");
	pages.push(...middle.filter((p) => p > 1 && p < total));
	if (middle[middle.length - 1] < total - 1) pages.push("...");
	pages.push(total);

	while (pages.length < maxVisible) {
		const i = pages.findIndex((p) => p === "...");
		if (i !== -1) pages.splice(i, 1);
		else break;
	}

	return pages.slice(0, maxVisible);
}

export default function Pagination({ numberOfPages, currentPage, onPageChange, className }: Props) {
	const hasNext = currentPage < numberOfPages;
	const hasPrevious = currentPage > 1;

	const pageList = getFixedPageNumbers(currentPage, numberOfPages);

	return (
		<div className={clsx(styles["pagination-wrapper"], className)}>
			<button
				className={clsx(styles["arrow"], !hasPrevious && styles["disabled"])}
				onClick={() => hasPrevious && onPageChange(currentPage - 1)}
				disabled={!hasPrevious}
			>
				<Chevron className={styles["icon"]} />
			</button>

			<div className={styles["page-numbers"]}>
				{pageList.map((page, i) =>
					page === "..." ? (
						<span
							key={`ellipsis-${i}`}
							className={clsx(styles["page-number-box"], styles["ellipsis"])}
						>
							...
						</span>
					) : (
						<button
							key={`page-${page}`}
							onClick={() => onPageChange(Number(page))}
							className={clsx(styles["page-number-box"], page === currentPage && styles["current"])}
						>
							<span className={styles["page-number"]}>{page}</span>
						</button>
					),
				)}
			</div>

			<button
				className={clsx(styles["arrow"], styles["arrow-right"], !hasNext && styles["disabled"])}
				onClick={() => hasNext && onPageChange(currentPage + 1)}
				disabled={!hasNext}
			>
				<Chevron className={styles["icon"]} />
			</button>
		</div>
	);
}
