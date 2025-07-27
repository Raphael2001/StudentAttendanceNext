"use client";

import Skeleton from "components/General/Skeleton/Skeleton";
import { useEffect, useRef, useState } from "react";

type Props = {
	alt?: string;
	src: string;
	className?: string;
	skeletonClassName?: string;
};

export default function BaseImage(props: Props) {
	const { src, alt = "no alt", className = "", skeletonClassName = "" } = props;
	const ref = useRef<HTMLImageElement>(null);

	const [isLoaded, setIsLoaded] = useState<boolean>(true);
	const [isFailed, setIsFailed] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		if (ref.current.complete && ref.current.naturalWidth > 0) {
			setIsLoaded(true);
		} else {
			setIsLoaded(false);
		}
	}, []);

	function onLoad() {
		setIsLoaded(true);
	}

	function onFail() {
		setIsFailed(true);
	}

	if (isFailed) {
		return (
			<Skeleton
				isLoaded={true}
				className={skeletonClassName}
			>
				<img
					ref={ref}
					src={"/assets/images/failed-image.jpg'"}
					alt={"no image"}
					className={className}
				/>
			</Skeleton>
		);
	}

	return (
		<Skeleton
			isLoaded={isLoaded}
			className={skeletonClassName}
		>
			<img
				ref={ref}
				src={src}
				alt={alt}
				className={className}
				onLoad={onLoad}
				onError={onFail}
			/>
		</Skeleton>
	);
}
