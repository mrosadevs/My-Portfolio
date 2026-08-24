"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  targetAlpha: number;
  colorIndex: number;
}

/** Module scope: a new array each render used to invalidate the whole effect. */
const DARK_COLORS = ["#00ff88", "#06b6d4", "#6366f1"];
const LIGHT_COLORS = ["#047857", "#0e7490", "#4f46e5"];

const CONNECTION_DIST = 120;
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
const MOUSE_RADIUS = 150;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MAX_PARTICLES = 90;
const TARGET_FPS = 60;
const FRAME_BUDGET = 1000 / TARGET_FPS;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // `alpha` is already true by default, but `desynchronized` lets the
    // canvas present independently of the main document compositing.
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      canvas.style.display = "none";
      return;
    }

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let colors = DARK_COLORS;

    let mouseX = -9999;
    let mouseY = -9999;

    let frame = 0;
    let running = true;
    let lastTime = 0;

    // ---- Spatial hash -------------------------------------------------
    // Connection lines are the expensive part: comparing every pair is
    // O(n^2) (~4000 pairs at 90 particles) and ran a sqrt on each one.
    // Bucketing by a CONNECTION_DIST grid means each particle only tests
    // its own cell and the four already-visited neighbours, which keeps
    // every pair considered exactly once without the full sweep.
    const grid = new Map<number, number[]>();
    let cols = 0;

    const cellKey = (cx: number, cy: number) => cy * cols + cx;

    const readThemeColors = () => {
      colors =
        document.documentElement.getAttribute("data-theme") === "light"
          ? LIGHT_COLORS
          : DARK_COLORS;
    };

    const initParticles = () => {
      // Scale count with viewport area but hard-cap it, so an ultrawide
      // display doesn't quietly get 3x the work.
      const count = Math.min(Math.floor((width * height) / 16000), MAX_PARTICLES);
      particles = new Array(count);

      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.4 + 0.12;
        particles[i] = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.8 + 0.5,
          alpha: 0,
          baseAlpha,
          targetAlpha: baseAlpha,
          colorIndex: Math.floor(Math.random() * colors.length),
        };
      }
    };

    const resize = () => {
      // Cap DPR at 1.5: particles are soft dots, and rendering an ultrawide
      // 4K canvas at 3x costs far more than it shows.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // setTransform (not scale) — scale() compounds on every resize.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(1, Math.ceil(width / CONNECTION_DIST));
      initParticles();
    };

    let resizeTimer = 0;
    const handleResize = () => {
      // Reinitialising particles on every resize event makes dragging a
      // window feel like a stutter; settle first.
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const draw = (time: number) => {
      if (!running) return;
      frame = requestAnimationFrame(draw);

      // Frame-rate cap: on a 120Hz display this halves the work for
      // motion nobody can distinguish.
      if (time - lastTime < FRAME_BUDGET) return;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      grid.clear();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.alpha += (p.targetAlpha - p.alpha) * 0.04;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < MOUSE_RADIUS_SQ && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          // Guarded against distSq ~ 0: dividing by a near-zero distance
          // used to fling velocity to Infinity and blank the particle.
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
          p.targetAlpha = Math.min(0.85, p.baseAlpha + force * 0.6);
        } else {
          // Decay back toward the resting value. The original only ever
          // raised targetAlpha, so every particle the pointer touched
          // stayed at max brightness for the rest of the session.
          p.targetAlpha += (p.baseAlpha - p.targetAlpha) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        // Bucket for the connection pass
        const cx = Math.min(cols - 1, Math.max(0, (p.x / CONNECTION_DIST) | 0));
        const cy = Math.max(0, (p.y / CONNECTION_DIST) | 0);
        const key = cellKey(cx, cy);
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }

      // ---- Dots ----
      // Grouped by colour so fillStyle is assigned once per colour rather
      // than once per particle. Alpha still varies per particle, so each
      // dot needs its own fill.
      for (let c = 0; c < colors.length; c++) {
        ctx.fillStyle = colors[c];
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.colorIndex !== c) continue;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ---- Connections via the spatial hash ----
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = colors[0];
      ctx.beginPath();

      let hasLine = false;
      let lineAlphaAccum = 0;
      let lineCount = 0;

      grid.forEach((bucket, key) => {
        const cx = key % cols;
        const cy = (key - cx) / cols;

        // Half-neighbourhood: self, right, and the three below. Each pair
        // is therefore visited exactly once.
        // Column bounds are checked because cellKey is a flat row-major
        // index: cx - 1 at column 0 would wrap onto the previous row's
        // last cell and link particles across opposite screen edges.
        const neighbours = [
          bucket,
          cx + 1 < cols ? grid.get(cellKey(cx + 1, cy)) : undefined,
          cx - 1 >= 0 ? grid.get(cellKey(cx - 1, cy + 1)) : undefined,
          grid.get(cellKey(cx, cy + 1)),
          cx + 1 < cols ? grid.get(cellKey(cx + 1, cy + 1)) : undefined,
        ];

        for (let n = 0; n < neighbours.length; n++) {
          const other = neighbours[n];
          if (!other) continue;
          const sameCell = n === 0;

          for (let a = 0; a < bucket.length; a++) {
            const p1 = particles[bucket[a]];
            // Within one cell, start at a+1 to avoid self and duplicates.
            for (let b = sameCell ? a + 1 : 0; b < other.length; b++) {
              const p2 = particles[other[b]];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dSq = dx * dx + dy * dy;
              if (dSq >= CONNECTION_DIST_SQ) continue;

              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              hasLine = true;
              lineAlphaAccum +=
                (1 - Math.sqrt(dSq) / CONNECTION_DIST) *
                0.15 *
                ((p1.alpha + p2.alpha) * 0.5);
              lineCount++;
            }
          }
        }
      });

      if (hasLine) {
        // One stroke for the whole web. Per-line alpha would mean one
        // stroke call each; the averaged alpha is visually equivalent
        // for a field of faint hairlines.
        ctx.globalAlpha = Math.min(0.2, lineAlphaAccum / lineCount);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        lastTime = 0;
        frame = requestAnimationFrame(draw);
      }
    };

    // Repaint in the new palette when the theme flips.
    const themeObserver = new MutationObserver(() => {
      readThemeColors();
      for (const p of particles) {
        p.colorIndex = Math.min(p.colorIndex, colors.length - 1);
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        running = false;
        cancelAnimationFrame(frame);
        ctx.clearRect(0, 0, width, height);
        canvas.style.display = "none";
      } else {
        canvas.style.display = "";
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    readThemeColors();
    resize();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionPreference);

    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      themeObserver.disconnect();
    };
    // Empty deps on purpose: this effect owns the canvas for the lifetime
    // of the component. The previous version depended on a `colors` array
    // rebuilt every render, so the whole canvas was torn down and
    // reinitialised on each parent re-render.
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
