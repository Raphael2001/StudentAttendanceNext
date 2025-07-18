"use client";

import { RefObject, useEffect } from "react";

function useResizeObserver(
  ref: RefObject<HTMLElement | null>,
  onSizeChange: () => void,
) {
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      onSizeChange();
    });

    if (ref && ref.current) {
      ro.observe(ref.current);
      return () => ro.disconnect();
    }
  }, [ref?.current]);
}

export default useResizeObserver;
