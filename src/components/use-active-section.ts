"use client";

import * as React from "react";
import { NAV, type SectionId } from "@/content/site";

/**
 * The section crossing the middle of the screen, shared by the header and the bottom bar.
 *
 * When an in-page link is clicked, the smooth scroll passes over the sections in between.
 * To keep the highlight from flickering through them, the destination is selected at once
 * and scroll tracking is paused until the scrolling stops.
 */

const IDS = new Set<string>(NAV.map((n) => n.id));
/** Fallback only: a pause this long means the scroll was stopped before arriving. */
const SCROLL_IDLE_MS = 700;
const NO_SCROLL_MS = 1000;

let active: SectionId = "top";
let locked = false;
let cancelLock: (() => void) | null = null;
const listeners = new Set<() => void>();
let stopTracking: (() => void) | null = null;

function setActive(id: SectionId) {
  if (id === active) return;
  active = id;
  for (const listener of listeners) listener();
}

/** The tracked section under the middle band of the screen, if any. */
function sectionAtMiddle(): SectionId | null {
  const y = window.innerHeight * 0.475;
  for (const id of IDS) {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (rect && rect.top <= y && rect.bottom >= y) return id as SectionId;
  }
  return null;
}

/** True once a scroll to `id` is over: its top sits under the header, or the page cannot scroll further. */
function hasArrived(id: SectionId): boolean {
  const el = document.getElementById(id);
  if (!el) return true;
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const top = el.getBoundingClientRect().top;
  const atTop = window.scrollY <= 0 && top >= 0;
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  return Math.abs(top - offset) <= 3 || atTop || atBottom;
}

/** Selects `id` now and ignores scroll tracking until the page stops scrolling. */
function lockTo(id: SectionId) {
  cancelLock?.();
  locked = true;
  setActive(id);

  let timer: ReturnType<typeof setTimeout>;
  const release = (settled: boolean) => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(timer);
    locked = false;
    cancelLock = null;
    if (!settled) return;
    // The user may have stopped the scroll on the way (e.g. with a finger): if the destination
    // is not on screen, follow what is actually there instead.
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (rect && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
      const here = sectionAtMiddle();
      if (here) setActive(here);
    }
  };
  const onScroll = () => {
    clearTimeout(timer);
    if (hasArrived(id)) {
      // let the last scroll frame land before tracking resumes
      timer = setTimeout(() => release(true), 50);
      return;
    }
    timer = setTimeout(() => release(true), SCROLL_IDLE_MS);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  timer = setTimeout(() => release(true), NO_SCROLL_MS); // already there: no scroll will happen
  cancelLock = () => release(false);
}

function startTracking() {
  // The observer only says *when* to look; what is selected comes from the layout at that
  // moment, so a callback delivered late can never select a section that has already passed.
  const observer = new IntersectionObserver(
    () => {
      if (locked) return;
      const here = sectionAtMiddle();
      if (here) setActive(here);
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  for (const id of IDS) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }

  // Any link to a tracked section (menus, hero buttons, pricing buttons...) locks the highlight.
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
    const id = link?.getAttribute("href")?.slice(1);
    if (id && IDS.has(id)) lockTo(id as SectionId);
  };
  document.addEventListener("click", onClick, true);

  return () => {
    observer.disconnect();
    document.removeEventListener("click", onClick, true);
    cancelLock?.();
  };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  stopTracking ??= startTracking();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      stopTracking?.();
      stopTracking = null;
    }
  };
}

export function useActiveSection(): SectionId {
  return React.useSyncExternalStore(
    subscribe,
    () => active,
    () => "top",
  );
}
