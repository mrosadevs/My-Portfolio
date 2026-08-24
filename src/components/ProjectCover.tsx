"use client";

import type { CSSProperties } from "react";

/**
 * Vector cover art for project cards.
 *
 * Replaces the scraped GitHub OG banners, which were inconsistently
 * cropped (most carried a white band where the source page's hero ended)
 * and cost ~1.7MB of PNGs. These are a few hundred bytes of inline SVG,
 * stay sharp at any size, and follow the active theme.
 */

export type CoverPattern =
  | "grid"
  | "bars"
  | "nodes"
  | "kanban"
  | "cards"
  | "blocks"
  | "palette"
  | "terminal"
  | "wave"
  | "orbit"
  | "calendar"
  | "skyline"
  | "stack";

export type CoverTone = "primary" | "secondary" | "tertiary";

const TONE_VAR: Record<CoverTone, string> = {
  primary: "var(--accent-primary)",
  secondary: "var(--accent-secondary)",
  tertiary: "var(--accent-tertiary)",
};

interface ProjectCoverProps {
  pattern: CoverPattern;
  tone: CoverTone;
  /** Short uppercase label, e.g. "WEB APP". */
  tag: string;
  /** Project title — used to derive the watermark monogram. */
  title: string;
  className?: string;
}

/** "Phantom Command Center" -> "PC" (first letters, max 2). */
function monogramOf(title: string): string {
  const words = title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    // Skip leading articles so "The Dodo NFT" reads DN, not TD.
    .filter((word, index) => !(index === 0 && /^(the|a|an)$/i.test(word)));

  if (words.length === 0) return "MR";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/* ------------------------------------------------------------------
   Patterns. All drawn in an 800x420 (40:21) viewBox.
   `currentColor` resolves to the card's tone; `.cover-ink` is the
   theme's neutral hairline.
   ------------------------------------------------------------------ */

function Grid() {
  const rows = [0, 1, 2, 3, 4];
  return (
    <g>
      <rect
        x={70}
        y={96}
        width={470}
        height={34}
        rx={4}
        fill="currentColor"
        opacity={0.16}
      />
      {rows.map((row) => (
        <g key={row}>
          <rect
            x={70}
            y={144 + row * 38}
            width={126}
            height={12}
            rx={3}
            fill="currentColor"
            opacity={row === 1 ? 0.5 : 0.24}
          />
          <rect
            x={216}
            y={144 + row * 38}
            width={172}
            height={12}
            rx={3}
            className="cover-ink-fill"
          />
          <rect
            x={408}
            y={144 + row * 38}
            width={132 - row * 14}
            height={12}
            rx={3}
            className="cover-ink-fill"
          />
        </g>
      ))}
      <line
        x1={70}
        y1={130}
        x2={540}
        y2={130}
        className="cover-ink"
        strokeWidth={1.5}
      />
    </g>
  );
}

function Bars() {
  const heights = [58, 96, 74, 132, 108, 168, 146];
  return (
    <g>
      {heights.map((height, index) => {
        const x = 76 + index * 62;
        return (
          <rect
            key={index}
            x={x}
            y={324 - height}
            width={34}
            height={height}
            rx={5}
            fill="currentColor"
            opacity={index === heights.length - 2 ? 0.72 : 0.26}
          />
        );
      })}
      <polyline
        points={heights
          .map((height, index) => `${93 + index * 62},${318 - height}`)
          .join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />
      <line
        x1={70}
        y1={326}
        x2={540}
        y2={326}
        className="cover-ink"
        strokeWidth={1.5}
      />
    </g>
  );
}

function Nodes() {
  const points = [
    [110, 120],
    [252, 90],
    [196, 214],
    [340, 176],
    [128, 296],
    [286, 322],
    [430, 268],
  ];
  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [4, 5],
    [3, 5],
    [3, 6],
    [5, 6],
  ];
  return (
    <g>
      {edges.map(([from, to], index) => (
        <line
          key={index}
          x1={points[from][0]}
          y1={points[from][1]}
          x2={points[to][0]}
          y2={points[to][1]}
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.3}
        />
      ))}
      {points.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={index === 3 ? 17 : 10}
          fill="currentColor"
          opacity={index === 3 ? 0.85 : 0.42}
        />
      ))}
      <circle
        cx={points[3][0]}
        cy={points[3][1]}
        r={30}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.35}
      />
    </g>
  );
}

function Kanban() {
  // Heights are tuned so the tallest column clears the bottom-left tag.
  const columns = [
    [58, 46, 64],
    [40, 62],
    [54, 38, 50],
  ];
  return (
    <g>
      {columns.map((cards, columnIndex) => {
        const x = 76 + columnIndex * 156;
        let y = 136;
        return (
          <g key={columnIndex}>
            <rect
              x={x}
              y={104}
              width={128}
              height={10}
              rx={3}
              fill="currentColor"
              opacity={0.45}
            />
            {cards.map((height, cardIndex) => {
              const cardY = y;
              y += height + 12;
              return (
                <rect
                  key={cardIndex}
                  x={x}
                  y={cardY}
                  width={128}
                  height={height}
                  rx={7}
                  fill="currentColor"
                  opacity={columnIndex === 1 && cardIndex === 0 ? 0.5 : 0.16}
                  stroke="currentColor"
                  strokeOpacity={0.22}
                  strokeWidth={1}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

function Cards() {
  const sheets = [
    { x: 96, y: 150, rotate: -11, opacity: 0.16 },
    { x: 140, y: 128, rotate: -4, opacity: 0.26 },
    { x: 188, y: 108, rotate: 5, opacity: 0.6 },
  ];
  return (
    <g>
      {sheets.map((sheet, index) => (
        <g key={index} transform={`rotate(${sheet.rotate} ${sheet.x + 105} ${sheet.y + 76})`}>
          <rect
            x={sheet.x}
            y={sheet.y}
            width={210}
            height={152}
            rx={12}
            fill="currentColor"
            opacity={sheet.opacity}
            stroke="currentColor"
            strokeOpacity={0.3}
            strokeWidth={1.5}
          />
          {index === sheets.length - 1 && (
            <>
              <rect
                x={sheet.x + 26}
                y={sheet.y + 46}
                width={120}
                height={11}
                rx={3}
                className="cover-ink-fill"
              />
              <rect
                x={sheet.x + 26}
                y={sheet.y + 74}
                width={158}
                height={11}
                rx={3}
                className="cover-ink-fill"
              />
              <rect
                x={sheet.x + 26}
                y={sheet.y + 102}
                width={78}
                height={11}
                rx={3}
                className="cover-ink-fill"
              />
            </>
          )}
        </g>
      ))}
    </g>
  );
}

function Blocks() {
  /** One isometric cube: top face light, left mid, right dark. */
  const cube = (cx: number, cy: number, size: number, key: number, emphasis: number) => {
    const w = size;
    const h = size * 0.5;
    return (
      <g key={key}>
        <polygon
          points={`${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`}
          fill="currentColor"
          opacity={0.62 * emphasis}
        />
        <polygon
          points={`${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + size * 0.75} ${cx - w},${cy + size * 0.75}`}
          fill="currentColor"
          opacity={0.3 * emphasis}
        />
        <polygon
          points={`${cx + w},${cy} ${cx},${cy + h} ${cx},${cy + h + size * 0.75} ${cx + w},${cy + size * 0.75}`}
          fill="currentColor"
          opacity={0.16 * emphasis}
        />
      </g>
    );
  };

  return (
    <g>
      {cube(180, 236, 72, 0, 0.7)}
      {cube(300, 176, 72, 1, 1)}
      {cube(420, 236, 72, 2, 0.7)}
      {cube(300, 300, 72, 3, 0.5)}
    </g>
  );
}

function Palette() {
  const swatches = [0.9, 0.62, 0.42, 0.28, 0.18, 0.1];
  return (
    <g>
      {swatches.map((opacity, index) => {
        const x = 76 + index * 78;
        const height = 150 + (index % 2 === 0 ? 34 : 0);
        return (
          <rect
            key={index}
            x={x}
            y={210 - height / 2}
            width={58}
            height={height}
            rx={9}
            fill="currentColor"
            opacity={opacity}
          />
        );
      })}
      <rect
        x={70}
        y={128}
        width={70}
        height={164}
        rx={12}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        opacity={0.55}
      />
    </g>
  );
}

function Terminal() {
  const lines = [
    { indent: 0, width: 168, accent: true },
    { indent: 26, width: 232, accent: false },
    { indent: 26, width: 186, accent: false },
    { indent: 52, width: 142, accent: false },
    { indent: 26, width: 208, accent: false },
    { indent: 0, width: 124, accent: true },
  ];
  return (
    <g>
      <path
        d="M74 120 L102 140 L74 160"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
      {lines.map((line, index) => (
        <rect
          key={index}
          x={118 + line.indent}
          y={132 + index * 32}
          width={line.width}
          height={12}
          rx={3}
          fill="currentColor"
          opacity={line.accent ? 0.55 : 0.2}
        />
      ))}
      <rect
        x={118}
        y={132 + lines.length * 32}
        width={16}
        height={12}
        rx={2}
        fill="currentColor"
        opacity={0.8}
      />
    </g>
  );
}

function Wave() {
  const PERIOD = 150;

  const wave = (
    amplitude: number,
    offsetY: number,
    opacity: number,
    width: number,
    phase: number
  ) => {
    // One full sine period per iteration: crest, then trough. The step must
    // match the width consumed, or successive periods overlap and the wave
    // collapses into a coil.
    const half = PERIOD / 2;
    const quarter = PERIOD / 4;
    let path = `M${-PERIOD + phase} ${offsetY}`;

    for (let x = -PERIOD + phase; x < 820; x += PERIOD) {
      path += ` Q${x + quarter} ${offsetY - amplitude} ${x + half} ${offsetY}`;
      path += ` Q${x + half + quarter} ${offsetY + amplitude} ${x + PERIOD} ${offsetY}`;
    }

    return (
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  };

  return (
    <g>
      {wave(30, 286, 0.18, 2, 0)}
      {wave(34, 240, 0.32, 2.5, 42)}
      {wave(38, 190, 0.85, 3, 84)}
      {wave(26, 146, 0.22, 2, 26)}
    </g>
  );
}

function Orbit() {
  return (
    <g transform="translate(300 210)">
      {[
        { rx: 170, ry: 62, rotate: -22, opacity: 0.22 },
        { rx: 132, ry: 48, rotate: 26, opacity: 0.3 },
        { rx: 96, ry: 96, rotate: 0, opacity: 0.18 },
      ].map((ring, index) => (
        <ellipse
          key={index}
          rx={ring.rx}
          ry={ring.ry}
          transform={`rotate(${ring.rotate})`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          opacity={ring.opacity}
        />
      ))}
      <circle r={30} fill="currentColor" opacity={0.85} />
      <circle r={46} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.35} />
      <circle cx={158} cy={-64} r={9} fill="currentColor" opacity={0.7} />
      <circle cx={-118} cy={58} r={7} fill="currentColor" opacity={0.5} />
      <circle cx={22} cy={-95} r={6} fill="currentColor" opacity={0.45} />
    </g>
  );
}

function Calendar() {
  const filled = new Set([3, 4, 9, 11, 12, 17, 20, 23, 24]);
  const highlight = new Set([11, 23]);
  const cells = Array.from({ length: 28 }, (_, index) => index);
  return (
    <g>
      <rect
        x={70}
        y={92}
        width={430}
        height={26}
        rx={6}
        fill="currentColor"
        opacity={0.2}
      />
      {cells.map((index) => {
        const column = index % 7;
        const row = Math.floor(index / 7);
        const isHighlight = highlight.has(index);
        return (
          <rect
            key={index}
            x={70 + column * 62}
            y={136 + row * 52}
            width={48}
            height={38}
            rx={6}
            fill="currentColor"
            opacity={isHighlight ? 0.8 : filled.has(index) ? 0.34 : 0.1}
          />
        );
      })}
    </g>
  );
}

function Skyline() {
  const buildings = [
    { x: 70, w: 68, h: 128 },
    { x: 150, w: 54, h: 196 },
    { x: 216, w: 78, h: 158 },
    { x: 306, w: 60, h: 232 },
    { x: 378, w: 72, h: 178 },
    { x: 462, w: 56, h: 138 },
  ];
  return (
    <g>
      {buildings.map((building, index) => {
        const y = 330 - building.h;
        const windowRows = Math.floor((building.h - 24) / 26);
        const windowCols = Math.floor((building.w - 14) / 20);
        return (
          <g key={index}>
            <rect
              x={building.x}
              y={y}
              width={building.w}
              height={building.h}
              rx={4}
              fill="currentColor"
              opacity={index === 3 ? 0.42 : 0.18}
            />
            {Array.from({ length: windowRows }, (_, row) =>
              Array.from({ length: windowCols }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={building.x + 10 + col * 20}
                  y={y + 14 + row * 26}
                  width={9}
                  height={12}
                  rx={1.5}
                  fill="currentColor"
                  opacity={(row * 3 + col * 5 + index) % 4 === 0 ? 0.75 : 0.22}
                />
              ))
            )}
          </g>
        );
      })}
      <line
        x1={54}
        y1={330}
        x2={556}
        y2={330}
        stroke="currentColor"
        strokeWidth={2}
        opacity={0.5}
      />
    </g>
  );
}

function Stack() {
  const slabs = [0, 1, 2, 3, 4];
  return (
    <g>
      {slabs.map((index) => {
        const y = 300 - index * 44;
        const inset = index * 16;
        return (
          <g key={index}>
            <rect
              x={90 + inset}
              y={y}
              width={380 - inset * 2}
              height={34}
              rx={8}
              fill="currentColor"
              opacity={0.1 + index * 0.16}
            />
            <rect
              x={106 + inset}
              y={y + 12}
              width={64}
              height={10}
              rx={3}
              className="cover-ink-fill"
            />
          </g>
        );
      })}
    </g>
  );
}

const PATTERNS: Record<CoverPattern, () => JSX.Element> = {
  grid: Grid,
  bars: Bars,
  nodes: Nodes,
  kanban: Kanban,
  cards: Cards,
  blocks: Blocks,
  palette: Palette,
  terminal: Terminal,
  wave: Wave,
  orbit: Orbit,
  calendar: Calendar,
  skyline: Skyline,
  stack: Stack,
};

export default function ProjectCover({
  pattern,
  tone,
  tag,
  title,
  className = "",
}: ProjectCoverProps) {
  const Pattern = PATTERNS[pattern];

  return (
    <div
      className={`project-cover ${className}`}
      style={{ "--tone": TONE_VAR[tone] } as CSSProperties}
      aria-hidden="true"
    >
      <svg
        className="cover-art"
        viewBox="0 0 800 420"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
        focusable="false"
      >
        <Pattern />
      </svg>
      <span className="cover-monogram">{monogramOf(title)}</span>
      <span className="cover-tag">{tag}</span>
    </div>
  );
}
