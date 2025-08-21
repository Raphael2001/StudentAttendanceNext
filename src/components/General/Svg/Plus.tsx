import { SVGProps } from "utils/types/svg";

export default function Plus(props: SVGProps) {
	return (
		<svg
			width="800px"
			height="800px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			stroke="#000000"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 6V18" />
			<path d="M6 12H18" />
		</svg>
	);
}
