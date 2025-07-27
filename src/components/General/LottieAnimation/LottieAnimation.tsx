"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Player and disable SSR
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);
type Props = {
  animation: object | string;
  onComplete?: () => void;
  onLoop?: () => void;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  isPaused?: boolean;
  speed?: number;
};

function LottieAnimation(props: Props) {
  const [animationFinished, setAnimationFinished] = useState(false);
  const {
    animation,
    onComplete = false,
    onLoop = false,
    autoplay = true,
    loop = false,
    className = "",
    isPaused = false,
    speed,
  } = props;

  useEffect(() => {
    if (animationFinished) {
      typeof onComplete === "function" && onComplete();
    }
  }, [animationFinished]);

  useEffect(() => {
    setAnimationFinished(false);
  }, [animation]);

  const options = {
    src: animation,
    loop,
    autoplay: !isPaused || autoplay,
    className,
    keepLastFrame: true,
    speed,
  };

  const eventHandler = (event: string) => {
    if (event === "complete") {
      if (!animationFinished) {
        setAnimationFinished(true);
      }
    } else if (event === "loop") {
      typeof onLoop === "function" && onLoop();
    }
  };

  return <Player {...options} onEvent={eventHandler} />;
}

export default LottieAnimation;
