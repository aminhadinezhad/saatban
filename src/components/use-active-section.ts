"use client";

import * as React from "react";
import { NAV, type SectionId } from "@/content/site";

/**
 * The section you are reading, shared by the header and the bottom bar: the last menu
 * section whose top has passed the upper third of the screen (sections without a menu item,
 * like the FAQ, count as part of the one before them). At the very end of the page the last
 * section is selected even if it is too short to reach that line.
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

/** Where a section counts as "reached": a third of the way down the screen. */
const READ_LINE = 0.3;

function currentSection(): SectionId {
  const root = document.documentElement;
  if (window.scrollY + window.innerHeight >= root.scrollHeight - 4) return NAV[NAV.length - 1]!.id;
  const line = window.innerHeight * READ_LINE;
  let current: SectionId = NAV[0]!.id;
  for (const { id } of NAV) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
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
    // Normally this is the destination itself; if the user stopped the scroll on the way
    // (e.g. with a finger), it is wherever they actually are.
    if (settled) setActive(currentSection());
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
  // Read the layout once per frame while scrolling or resizing.
  let frame = 0;
  const update = () => {
    frame = 0;
    if (!locked) setActive(currentSection());
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();

  // Any link to a tracked section (menus, hero buttons, pricing buttons...) locks the highlight.
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
    const id = link?.getAttribute("href")?.slice(1);
    if (id && IDS.has(id)) lockTo(id as SectionId);
  };
  document.addEventListener("click", onClick, true);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
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
