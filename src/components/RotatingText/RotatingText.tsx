"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./RotatingText.module.scss";
import { RotatingTextItemOption } from "utils/types/rotatingText";
import { clsx } from "utils/functions";

type Props = {
  texts: Array<RotatingTextItemOption>;
  mainText: string;
  delay?: number;
};

function RotatingText(props: Props) {
  const { texts, mainText, delay = 3000 } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    if (!delay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, delay);

    return () => clearInterval(interval);
  }, [texts.length, delay]);

  return (
    <span className={styles["texts-wrapper"]}>
      {mainText}
      <div className={styles["rotating-text-wrapper"]}>
        <div
          className={styles["text-animation"]}
          style={{
            transform: `translateY(${-itemHeight * currentIndex}px)`,
          }}
        >
          {texts.map((item, index) => (
            <Item
              {...item}
              key={"item-" + index + item._id}
              setItemHeight={setItemHeight}
            />
          ))}
        </div>
      </div>
    </span>
  );
}

export default RotatingText;

type ItemProps = {
  color: string;
  text: string;

  setItemHeight: (height: number) => void;
};

function Item(props: ItemProps) {
  const { color, text, setItemHeight } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getItemHeight();
    window.addEventListener("resize", getItemHeight);
    return () => window.removeEventListener("resize", getItemHeight);
  }, []);

  function getItemHeight() {
    const height = ref.current?.clientHeight;

    if (height) {
      setItemHeight(height);
    }
  }

  return (
    <div ref={ref} className={clsx("text", color, styles["text-item"])}>
      {text}
    </div>
  );
}
