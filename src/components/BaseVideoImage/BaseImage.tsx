"use client";
import Skeleton from "components/Skeleton/Skeleton";
import { useEffect, useRef, useState } from "react";

import DefaultImage from "/public/assets/images/failed-image.jpg";

type Props = {
  alt?: string;
  src: string;
  className?: string;
  skeletonClassName?: string;
};

export default function BaseImage(props: Props) {
  const { src, alt = "no alt", className = "", skeletonClassName = "" } = props;
  const ref = useRef<HTMLImageElement>(null);

  const [isLoaded, setIsLoaded] = useState(ref?.current?.complete);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    if (ref.current) {
      if (ref.current.complete) {
        setIsLoaded(ref.current.complete);
      }
    }
  }, []);

  function onLoad() {
    setIsLoaded(true);
  }

  function onFail() {
    setIsFailed(true);
  }

  return (
    <Skeleton isLoaded={isFailed || isLoaded} className={skeletonClassName}>
      <img
        ref={ref}
        src={isFailed ? DefaultImage.src : src}
        alt={alt}
        className={className}
        onLoad={onLoad}
        onError={onFail}
      />
    </Skeleton>
  );
}
