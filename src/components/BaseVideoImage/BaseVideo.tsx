import Skeleton from "components/Skeleton/Skeleton";
import React, { useState } from "react";
import DefaultImage from "/public/assets/images/failed-image.jpg";

type Props = {
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  src: string;
  className?: string;
  skeletonClassName?: string;
};

function BaseVideo(props: Props) {
  const {
    controls = true,
    autoPlay = false,
    muted = false,
    loop = false,
    playsInline = false,
    src,
    className = "",
    skeletonClassName = "",
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  function onLoad() {
    setIsLoaded(true);
  }

  function onFail() {
    setIsFailed(true);
  }
  return (
    <Skeleton isLoaded={isFailed || isLoaded} className={skeletonClassName}>
      {isFailed ? (
        <img src={DefaultImage.src} alt={"no image"} className={className} />
      ) : (
        <video
          className={`media ${className}`}
          src={src}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoad={onLoad}
          onError={onFail}
        />
      )}
    </Skeleton>
  );
}

export default BaseVideo;
