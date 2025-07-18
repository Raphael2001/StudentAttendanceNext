import React from "react";

import DYNAMIC_PAGE_COMPONENTS_ID from "constants/DynamicPageComponentsId";
import HtmlViewer from "components/App/DynamicPages/HtmlViewer/HtmlViewer";
import SmartMedia from "components/App/SmartMedia/SmartMedia";
import { DynamicPageComponentData } from "utils/types/dynamicPages";
import { Media } from "utils/types/media";
import StarRating from "components/App/DynamicPages/StarRating/StarRating";
import FullCardCarousel from "components/App/DynamicPages/Carousels/FullCardCarousel/FullCardCarousel";
import Slider from "components/App/DynamicPages/Carousels/Slider/Slider";

type Props = {
  component: DynamicPageComponentData;
};

export default function DP_Component(props: Props) {
  const { component } = props;
  const { type, value, _id } = component;

  switch (type) {
    case DYNAMIC_PAGE_COMPONENTS_ID.MEDIA:
      return <SmartMedia item={value as Media} />;
    case DYNAMIC_PAGE_COMPONENTS_ID.RATING:
      return <StarRating value={value as number} max={5} />;

    case DYNAMIC_PAGE_COMPONENTS_ID.MEDIA_CAROUSEL:
      return <Slider options={value as Array<Media>} id={_id} />;

    case DYNAMIC_PAGE_COMPONENTS_ID.MEDIA_SLIDER:
      return <FullCardCarousel options={value as Array<Media>} id={_id} />;

    case DYNAMIC_PAGE_COMPONENTS_ID.EDITOR:
    default:
      if (typeof value === "string") {
        return <HtmlViewer html={value as string} />;
      }
      return null;
  }
}
