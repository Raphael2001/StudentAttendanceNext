import React from "react";

import { SwiperProps } from "swiper/react";
import { Media } from "utils/types/media";

import Carousel from "components/App/DynamicPages/Carousels/Carousel/Carousel";

type Props = {
  options: Array<Media>;
  delay?: number;
  id?: string;
};

export default function FullCardCarousel(props: Props) {
  const { options, delay = 5000, id = "" } = props;

  const settings: SwiperProps = {
    slidesPerView: 1,
    spaceBetween: 10,
  };

  return (
    <Carousel
      id={id}
      options={options}
      settings={settings}
      delay={delay}
      autoplay
      loop
      pagination
      navigation
    />
  );
}
