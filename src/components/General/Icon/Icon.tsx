import { SVGIcon } from "utils/types/svg";

type Props = {
	className?: string;
	src?: string | SVGIcon;
};

export default function Icon(props: Props) {
	const { src, className = "" } = props;
	if (!src) return null;

	if (typeof src === "string") {
		return (
			<img
				src={src}
				className={className}
			/>
		);
	} else {
		const SvgComponent = src;
		return <SvgComponent className={className} />;
	}
}
