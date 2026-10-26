"use client";

import * as React from "react";

export type GlassTone = "light" | "dark";

/** "dark" while the middle of `ref` floats over a section marked `data-surface="dark"`. */
export function useGlassTone(ref: React.RefObject<HTMLElement | null>): GlassTone {
  const [tone, setTone] = React.useState<GlassTone>("light");

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const y = box.top + box.height / 2;
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-surface="dark"]')).some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= y && rect.bottom >= y;
      });
      setTone(dark ? "dark" : "light");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return tone;
}
