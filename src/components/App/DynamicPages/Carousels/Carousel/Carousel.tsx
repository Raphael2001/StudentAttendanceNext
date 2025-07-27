import React from "react";

import styles from "./Carousel.module.scss";
import { Media } from "utils/types/media";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import SmartMedia from "components/App/SmartMedia/SmartMedia";
import { clsx } from "utils/functions";
import NavigationButtons from "components/App/DynamicPages/Carousels/NavigationButtons/NavigationButtons";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

type Props = {
	options: Array<Media>;
	settings: SwiperProps;
	className?: string;
	slideClassName?: string;
	navigation?: boolean;
	loop?: boolean;
	pagination?: boolean;
	autoplay?: boolean;
	delay?: number;
	id?: string;
};

export default function Carousel(props: Props) {
	const {
		navigation = false,
		options,
		settings,
		className = "",
		slideClassName = "",
		loop = false,
		pagination = false,
		autoplay = false,
		delay = 5000,
		id = "",
	} = props;

	function transformSettings(settings: SwiperProps) {
		const transformedSettings = { ...settings };

		if (navigation) {
			transformedSettings.navigation = {
				nextEl: ".slider-button-next",
				prevEl: ".slider-button-prev",
			};
			transformedSettings.modules = [...(transformedSettings.modules ?? []), Navigation];
		}
		if (autoplay) {
			transformedSettings.autoplay = {
				delay,
				disableOnInteraction: false,
			};
			transformedSettings.modules = [...(transformedSettings.modules ?? []), Autoplay];
		}
		if (pagination) {
			transformedSettings.modules = [...(transformedSettings.modules ?? []), Pagination];
			transformedSettings.pagination = {
				clickable: true,
			};
		}
		transformedSettings.loop = loop;

		return transformedSettings;
	}

	const transformedSettings = transformSettings(settings);

	return (
		<Swiper
			className={clsx(styles["carousel"], className)}
			{...transformedSettings}
		>
			{options.map((option) => {
				return (
					<SwiperSlide
						className={clsx(styles["carousel-slide"], slideClassName)}
						key={"slide" + id + option._id}
					>
						<SmartMedia
							item={option}
							skeletonClassName={styles["media"]}
						/>
					</SwiperSlide>
				);
			})}
			{navigation && (
				<NavigationButtons
					prevClassName={"slider-button-prev"}
					nextClassName={"slider-button-next"}
				/>
			)}
		</Swiper>
	);
}
