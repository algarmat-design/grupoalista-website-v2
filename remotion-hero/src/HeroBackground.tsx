import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// ── Brand tokens ────────────────────────────────────────────────────────────
const C = {
  base:       "#09141c",
  copperDark: "rgba(157,76,42,",
  copper:     "#BA6A45",
  slate:      "#3E5662",
  slateLight: "#A5BCC6",
};

// ── Grid config ─────────────────────────────────────────────────────────────
const VP_X       = 0.5;   // vanishing point (center)
const VP_Y       = 0.5;
const FOCAL      = 0.9;   // perspective compression (lower = more dramatic)
const VERT_COUNT = 15;    // converging lines
const HORIZ_COUNT = 14;   // horizontal parallels in the loop
const GRID_DEPTH = 5;     // world-space depth range
const GRID_SPEED = GRID_DEPTH / 20; // full traversal in 20 s → seamless loop

// ── Ring config ─────────────────────────────────────────────────────────────
const RING_COUNT     = 4;
const RING_PERIOD_S  = 5;  // 5 s per ring → 4 complete cycles in 20 s (seamless)

// ── Perspective: world-Z → screen-Y ─────────────────────────────────────────
const zToY = (z: number, h: number): number => {
  if (z <= 0) return h * 1.02;
  return h * (VP_Y + (1 - VP_Y) * (FOCAL / (z + FOCAL)));
};

export const HeroBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const t = frame / fps;

  // ── Scroll offset (seamless: 0 → GRID_DEPTH over 20 s) ──────────────────
  const scroll = (t * GRID_SPEED) % GRID_DEPTH;

  // ── Horizontal grid lines ─────────────────────────────────────────────────
  type HorizLine = { y: number; opacity: number };
  const horizLines: HorizLine[] = [];
  for (let i = 0; i < HORIZ_COUNT; i++) {
    const baseZ = (i / HORIZ_COUNT) * GRID_DEPTH;
    const z     = ((baseZ - scroll) % GRID_DEPTH + GRID_DEPTH) % GRID_DEPTH;
    const y     = zToY(z, height);
    if (y <= height * VP_Y || y > height * 1.01) continue;
    const nearness = 1 - z / GRID_DEPTH;
    horizLines.push({ y, opacity: 0.05 + nearness * 0.18 });
  }

  // ── Converging vertical lines (static) ───────────────────────────────────
  const vertLines = Array.from({ length: VERT_COUNT }, (_, i) => {
    const xFrac = i / (VERT_COUNT - 1);
    const distCenter = Math.abs(xFrac - 0.5) * 2;
    return { xFrac, opacity: 0.05 + distCenter * 0.12 };
  });

  // ── Copper center glow (5 s period — 4 cycles in 20 s) ───────────────────
  const glowPulse   = Math.sin((t / 5) * Math.PI * 2);
  const glowOpacity = 0.18 + glowPulse * 0.08;
  const glowW       = 80 + glowPulse * 10;
  const glowH       = 60 + glowPulse * 8;

  // ── Pulsing rings ─────────────────────────────────────────────────────────
  const diagonal = Math.sqrt(width ** 2 + height ** 2);
  const rings = Array.from({ length: RING_COUNT }, (_, i) => {
    const phaseOffset = (i / RING_COUNT) * RING_PERIOD_S;
    const progress    = ((t + phaseOffset) % RING_PERIOD_S) / RING_PERIOD_S;
    return {
      r:           progress * diagonal * 0.82,
      opacity:     (1 - progress) * 0.38,
      strokeWidth: 0.8 + (1 - progress) * 1.6,
    };
  });

  // ── Center dot (2.5 s pulse — 8 cycles in 20 s) ──────────────────────────
  const dotPulse = 1 + 0.35 * Math.sin((t / 2.5) * Math.PI * 2);

  const cx = VP_X * width;
  const cy = VP_Y * height;

  return (
    <AbsoluteFill style={{ background: C.base, overflow: "hidden" }}>

      {/* ── Copper center glow ── */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${glowW}% ${glowH}% at 50% 50%, ${C.copperDark}${glowOpacity.toFixed(3)}) 0%, transparent 70%)`,
        }}
      />

      {/* ── Grid + rings SVG ── */}
      <AbsoluteFill>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ display: "block" }}
        >
          {/* Converging lines */}
          {vertLines.map(({ xFrac, opacity }, i) => (
            <line
              key={`v${i}`}
              x1={xFrac * width}
              y1={height}
              x2={cx}
              y2={cy}
              stroke={C.slate}
              strokeWidth={0.7}
              opacity={opacity}
            />
          ))}

          {/* Horizontal parallels */}
          {horizLines.map(({ y, opacity }, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              stroke={C.slateLight}
              strokeWidth={0.5}
              opacity={opacity}
            />
          ))}

          {/* Copper rings */}
          {rings.map(({ r, opacity, strokeWidth }, i) => (
            <circle
              key={`ring${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={C.copper}
              strokeWidth={strokeWidth}
              opacity={opacity}
            />
          ))}

          {/* Center dot */}
          <circle
            cx={cx}
            cy={cy}
            r={3 * dotPulse}
            fill={C.copper}
            opacity={0.95}
          />
          {/* Soft halo around dot */}
          <circle
            cx={cx}
            cy={cy}
            r={10 * dotPulse}
            fill={C.copper}
            opacity={0.08}
          />
        </svg>
      </AbsoluteFill>

      {/* ── Edge vignette ── */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(9,20,28,0.80) 100%)",
        }}
      />

      {/* ── Bottom fade (so hero text stays readable) ── */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(9,20,28,0.90) 0%, rgba(9,20,28,0.30) 25%, transparent 50%)",
        }}
      />

    </AbsoluteFill>
  );
};
