import React from "react";

import styles from "./Slider.module.scss";
import { Media } from "utils/types/media";
import { SwiperProps } from "swiper/react";

import Carousel from "components/App/DynamicPages/Carousels/Carousel/Carousel";

type Props = {
	options: Array<Media>;
	delay?: number;
	id?: string;
};

export default function Slider(props: Props) {
	const { options, delay = 5000, id = "" } = props;

	const settings: SwiperProps = {
		breakpoints: {
			320: {
				slidesPerView: 1.15,
				spaceBetween: -3,
			},
			768: {
				slidesPerView: 1.6,
				spaceBetween: -6,
			},

			1200: {
				slidesPerView: 1.3,
				spaceBetween: -10,
			},
		},

		centeredSlides: true,
	};

	return (
		<Carousel
			id={id}
			delay={delay}
			autoplay
			navigation
			pagination
			loop
			className={styles["slider-carousel"]}
			options={options}
			settings={settings}
			slideClassName={styles["slider-carousel-slide"]}
		></Carousel>
	);
}
