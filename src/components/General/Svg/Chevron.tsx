import { SVGProps } from "utils/types/svg";

export default function Chevron(props: SVGProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={800}
			height={800}
			fill="none"
			viewBox="0 0 24 24"
			{...props}
			stroke="#000"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m14.5 17-5-5 5-5"
			/>
		</svg>
	);
}
