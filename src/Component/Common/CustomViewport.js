import React, { useState, useCallback } from "react";
const browser = typeof window !== "undefined";

export const CustomViewport = () => {
  const [widthPort, setWidth] = useState(browser ? window.innerHeight : 0);
  const setSize = useCallback(() => {
    setWidth(window.innerWidth || 0);
  }, []);
  window.addEventListener("resize", setSize, { passive: true });
  window.addEventListener("orientationchange", setSize, { passive: true });
  return widthPort;
};

