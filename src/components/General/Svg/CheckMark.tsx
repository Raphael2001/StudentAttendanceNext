import { SVGProps } from "utils/types/svg";

export default function CheckMark(props: SVGProps) {
	return (
		<svg
			width="800px"
			height="800px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			stroke="#000000"
		>
			<path
				d="M4 12.6111L8.92308 17.5L20 6.5"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
