"use client";

import React from "react";
import { Media, MediaTypes, MimeTypes, Src } from "utils/types/media";
import BaseImage from "components/General/Basic/BaseVideoImage/BaseImage";
import BaseVideo from "components/General/Basic/BaseVideoImage/BaseVideo";

import { useAppSelector } from "utils/hooks/useRedux";

type Props = {
  className?: string;
  item: Media;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  skeletonClassName?: string;
};

const SmartMedia = ({
  className = "",
  item,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  skeletonClassName = "",
}: Props) => {
  const { src, alt }: Media = item;
  const { type, mime, url }: Src = src;

  const cdn = useAppSelector((store) => store.apiValidation.project.cdn);

  const getUrl = (): string => {
    const urlParts = url.split("/");
    const videoId = urlParts[urlParts.length - 1];
    let baseUrl = url + `?`;
    const params: string[] = [
      `?controls=${controls ? 1 : 0}`,
      "playsinline=1",
      `playlist=${videoId}`,
      `showinfo=${controls ? 1 : 0}`,
      "rel=0",
    ];
    if (autoPlay) {
      params.push("autoplay=1");
    }
    if (loop) {
      params.push("loop=1");
    }
    if (muted) {
      params.push("mute=1");
    }
    return baseUrl + params.join("&");
  };

  if (mime === MimeTypes.VIDEO) {
    if (type === MediaTypes.INTERNAL) {
      const src = `${cdn}/${url}`;
      return (
        <BaseVideo
          className={`media ${className}`}
          src={src}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          skeletonClassName={skeletonClassName}
        />
      );
    } else if (type === MediaTypes.EXTERNAL) {
      const fullUrl = getUrl();
      return (
        <div className={`media ${className}`}>
          <iframe
            src={fullUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
            allowFullScreen
          />
        </div>
      );
    }
  } else if (mime === MimeTypes.IMAGE) {
    const isInternal = type === MediaTypes.INTERNAL;

    const src = isInternal ? `${cdn}/${url}` : url;
    return (
      <BaseImage
        className={`media ${className}`}
        src={src}
        alt={alt ?? ""}
        skeletonClassName={skeletonClassName}
      />
    );
  }
  return <></>;
};

export default SmartMedia;
