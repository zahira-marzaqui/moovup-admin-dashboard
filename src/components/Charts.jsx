import React from "react";

export function BarChart({ values = [], altEvery = 0, height = 160 }) {
  const max = Math.max(1, ...values);
  return (
    <div className="card">
      <div className="bar-chart" style={{ height }}>
        {values.map((v, i) => (
          <div
            key={i}
            className={[
              "bar",
              altEvery && (i + 1) % altEvery === 0 ? "alt" : "",
            ].join(" ")}
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function LineChart({ points = [], height = 220 }) {
  const max = Math.max(1, ...points);
  const min = Math.min(0, ...points);
  const range = max - min || 1;
  const padding = 6; // percent units to avoid touching edges
  const xAt = (i) =>
    (i / Math.max(1, points.length - 1)) * (100 - 2 * padding) + padding;
  const yAt = (p) =>
    100 - (((p - min) / range) * (100 - 2 * padding) + padding);

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)},${yAt(p)}`)
    .join(" ");

  const area = `${path} L ${xAt(points.length - 1)},${100 - padding} L ${xAt(
    0
  )},${100 - padding} Z`;
  return (
    <div className="card line-chart" style={{ height }}>
      <div className="grid-y" />
      <svg
        className="line-path"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#lineFill)" stroke="none" />
        <path
          d={path}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={xAt(i)} cy={yAt(p)} r={1.6} fill="#93c5fd" />
        ))}
      </svg>
    </div>
  );
}

export function DonutChart({ segments = [], size = 160, thickness = 18 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const R = 50;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <g transform="translate(10,10)">
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="#1f2636"
            strokeWidth={thickness}
          />
          {segments.map((s, i) => {
            const frac = s.value / total;
            const dash = C * frac;
            const dasharray = `${dash} ${C - dash}`;
            const circle = (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={
                  s.color || ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"][i % 4]
                }
                strokeWidth={thickness}
                strokeDasharray={dasharray}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += dash;
            return circle;
          })}
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#e5e7eb"
            fontSize="12"
            fontWeight="600"
          >
            {Math.round(((segments[0]?.value || 0) / total) * 100)}%
          </text>
        </g>
      </svg>
    </div>
  );
}

export function Histogram({ values = [], buckets = [], height = 160 }) {
  const max = Math.max(1, ...values);
  return (
    <div className="card">
      <div className="bar-chart" style={{ height }}>
        {values.map((v, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div className="bar" style={{ height: `${(v / max) * 100}%` }} />
            </div>
            {buckets[i] && (
              <span className="muted" style={{ fontSize: 10, marginTop: 6 }}>
                {buckets[i]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// New styles of charts
export function StackedAreaChart({ series = [], height = 260 }) {
  // series: array of arrays of equal length
  const length = series[0]?.length || 0;
  const sums = Array.from({ length }, (_, i) =>
    series.reduce((s, arr) => s + (arr[i] || 0), 0)
  );
  const max = Math.max(1, ...sums);
  const padding = 6;
  const xAt = (i) =>
    (i / Math.max(1, length - 1)) * (100 - 2 * padding) + padding;
  function pathFor(arr, below) {
    const toY = (v) => 100 - ((v / max) * (100 - 2 * padding) + padding);
    const accum = [];
    for (let i = 0; i < length; i++) {
      const base = below?.[i] || 0;
      accum[i] = base + (arr[i] || 0);
    }
    const up = accum
      .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)},${toY(v)}`)
      .join(" ");
    const down = (below || [])
      .slice()
      .reverse()
      .map((v, rIndex) => {
        const i = length - 1 - rIndex;
        return `L ${xAt(i)},${toY(v || 0)}`;
      })
      .join(" ");
    const close = `L ${xAt(0)},${toY(below?.[0] || 0)} Z`;
    return `${up} ${down || ""} ${down ? close : "L 100,100 L 0,100 Z"}`;
  }
  // Build cumulative layers
  const layers = [];
  let below = new Array(length).fill(0);
  for (let s of series) {
    layers.push({ path: pathFor(s, below), below: below.slice() });
    for (let i = 0; i < length; i++) below[i] += s[i] || 0;
  }
  const colors = ["#60a5fa", "#34d399", "#f59e0b", "#ef4444"]; // strokes/fills
  return (
    <div className="card line-chart" style={{ height }}>
      <div className="grid-y" />
      <svg
        className="line-path"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {layers.map((l, i) => (
          <path
            key={i}
            d={l.path}
            fill={colors[i % colors.length]}
            opacity={0.25}
            stroke={colors[i % colors.length]}
            strokeWidth="1.2"
          />
        ))}
      </svg>
    </div>
  );
}

export function GroupedBarChart({ groups = [], height = 260 }) {
  const flat = groups.flatMap((g) => [g.a || 0, g.b || 0]);
  const max = Math.max(1, ...flat);
  const barWidth = 10;
  const gap = 8;
  const groupWidth = barWidth * 2 + gap;
  const totalWidth = groups.length * (groupWidth + gap);
  return (
    <div className="card" style={{ height }}>
      <svg
        viewBox={`0 0 ${totalWidth} 100`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        {groups.map((g, i) => {
          const x = i * (groupWidth + gap);
          const hA = ((g.a || 0) / max) * 100;
          const hB = ((g.b || 0) / max) * 100;
          return (
            <g key={i}>
              <rect
                x={x}
                y={100 - hA}
                width={barWidth}
                height={hA}
                rx="3"
                fill="#4b52ff"
              />
              <rect
                x={x + barWidth + gap}
                y={100 - hB}
                width={barWidth}
                height={hB}
                rx="3"
                fill="#22c55e"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function RadialGauge({ value = 65, size = 220 }) {
  const R = 48,
    CX = 60,
    CY = 60;
  const C = 2 * Math.PI * R;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * C;
  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <g transform="translate(0,0)">
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#1f2636"
            strokeWidth="14"
          />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#22c55e"
            strokeWidth="14"
            strokeDasharray={`${dash} ${C - dash}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${CX} ${CY})`}
          />
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#e5e7eb"
            fontSize="16"
            fontWeight="700"
          >
            {pct}%
          </text>
        </g>
      </svg>
    </div>
  );
}

export function Heatmap({ matrix = [], height = 260 }) {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;
  const flat = matrix.flat();
  const max = Math.max(1, ...flat);
  return (
    <div className="card heatmap" style={{ height }}>
      {matrix.map((row, r) => (
        <div key={r} className="heat-row">
          {row.map((v, c) => {
            const intensity = v / max; // 0..1
            const bg = `rgba(99,102,241,${0.15 + intensity * 0.7})`;
            return (
              <div key={c} className="heat-cell" style={{ background: bg }} />
            );
          })}
        </div>
      ))}
    </div>
  );
}
