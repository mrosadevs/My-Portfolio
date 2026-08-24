"use client";

import { useEffect, useRef } from "react";

/** Elements that should grow the ring when hovered. */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, .magnetic-btn, .glass-card, .tab-btn";

const RING_SIZE = 32;
const DOT_SIZE = 5;
const RING_HOVER_SCALE = 1.55;

/** Ring easing per frame. Higher = snappier and less "trailing". */
const RING_EASE = 0.22;

/**
 * Custom cursor driven by a single rAF loop that writes transforms
 * directly to the DOM.
 *
 * Deliberately avoids: React state per frame, framer-motion springs,
 * animating width/height (layout on every frame), and mix-blend-difference
 * (which forces the whole page to re-composite under the cursor and was
 * the main source of the smeared trail).
 */
export default function CursorFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only devices with a real pointer get a custom cursor. `pointer: fine`
    // is a better test than `ontouchstart`, which is true on touch laptops
    // that still have a mouse.
    const finePointer = window.matchMedia("(pointer: fine)");
    const wideEnough = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || !wideEnough.matches || reducedMotion.matches) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");

    // Target = raw pointer. Ring lerps toward it; dot is pinned to it.
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;

    let hoverScale = 1;
    let currentScale = 1;
    let visible = false;
    let frame = 0;
    let running = true;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      ring.style.opacity = next ? "1" : "0";
      dot.style.opacity = next ? "1" : "0";
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        // Jump rather than sweep in from the last known position,
        // otherwise re-entering the window drags a long streak across it.
        ringX = targetX;
        ringY = targetY;
        setVisible(true);
      }
    };

    const handleLeave = (event: PointerEvent) => {
      // relatedTarget is null only when the pointer truly exits the window.
      if (!event.relatedTarget) setVisible(false);
    };

    const handleEnter = () => setVisible(true);

    // Event delegation instead of attaching listeners to every element and
    // re-querying the DOM through a MutationObserver. Works for nodes added
    // later for free, and costs one listener total.
    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest?.(INTERACTIVE_SELECTOR)) hoverScale = RING_HOVER_SCALE;
    };

    const handleOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest?.(INTERACTIVE_SELECTOR)) return;

      const next = event.relatedTarget as Element | null;
      // Moving between children of the same interactive element still counts
      // as hovering it — don't shrink on every internal boundary crossing.
      if (next?.closest?.(INTERACTIVE_SELECTOR)) return;
      hoverScale = 1;
    };

    const handleDown = () => {
      dot.style.setProperty("--press", "0.7");
    };
    const handleUp = () => {
      dot.style.setProperty("--press", "1");
    };

    const render = () => {
      if (!running) return;

      ringX += (targetX - ringX) * RING_EASE;
      ringY += (targetY - ringY) * RING_EASE;
      currentScale += (hoverScale - currentScale) * 0.18;

      // translate3d keeps this on the compositor; scale() replaces the
      // old width/height animation so no layout is triggered.
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(var(--press, 1))`;

      frame = requestAnimationFrame(render);
    };

    // A background tab shouldn't burn frames.
    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });
    document.addEventListener("pointerout", handleOut, { passive: true });
    document.addEventListener("pointerenter", handleEnter, { passive: true });
    document.addEventListener("pointerleave", handleLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    frame = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
      document.removeEventListener("pointerenter", handleEnter);
      document.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border border-accent-primary/50 opacity-0 md:block"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          transform: "translate3d(-100px, -100px, 0)",
          transition: "opacity 200ms ease, border-color 300ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full bg-accent-primary opacity-0 md:block"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          transform: "translate3d(-100px, -100px, 0)",
          transition: "opacity 150ms ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
