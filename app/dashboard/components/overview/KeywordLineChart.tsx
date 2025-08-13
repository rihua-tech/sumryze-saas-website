"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

type DataPoint = { day: string; count: number };
type Period = "weekly" | "monthly";

const WEEK_LABELS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ------- nice, evenly spaced ticks (no weird last gap) ------- */
function makeNiceTicks(min: number, max: number, maxTicks = 5): number[] {
  if (!(isFinite(min) && isFinite(max))) return [0, 1];
  if (min === max) { min = Math.max(0, min - 1); max = max + 1; }
  if (min > max) [min, max] = [max, min];

  const range = max - min;
  const rough = range / Math.max(2, maxTicks - 1);
  const pow10 = Math.pow(10, Math.floor(Math.log10(rough)));
  const mults = [1, 2, 2.5, 5, 10];

  let step = mults[0] * pow10;
  for (const m of mults) {
    const s = m * pow10;
    if (s >= rough) { step = s; break; }
  }

  // expand to nice bounds
  let niceMin = Math.floor(min / step) * step;
  let niceMax = Math.ceil(max / step) * step;

  // if we got too many ticks, bump the step once
  let count = Math.round((niceMax - niceMin) / step) + 1;
  if (count > maxTicks + 2) {
    const nextIndex = Math.min(mults.length - 1, mults.findIndex(m => m * pow10 === step) + 1);
    step = mults[nextIndex] * pow10;
    niceMin = Math.floor(min / step) * step;
    niceMax = Math.ceil(max / step) * step;
    count = Math.round((niceMax - niceMin) / step) + 1;
  }

  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax + 1e-9; v += step) ticks.push(Math.round(v));
  return ticks;
}

export default function KeywordLineChart({
  data,
  period,
}: { data: DataPoint[]; period: Period }) {
  // sanitize + add stable index for X scale
  const clean = useMemo<DataPoint[]>(
    () => (Array.isArray(data) ? data.map(d => ({ day: String(d.day), count: Number(d.count) || 0 })) : []),
    [data]
  );
  const indexed = useMemo(() => clean.map((d, idx) => ({ ...d, idx })), [clean]);

  // fixed labels by index — no flicker when data swaps
  const labels = period === "weekly" ? WEEK_LABELS : MONTH_LABELS;
  const tickFormatterX = (_: any, idx: number) => labels[idx % labels.length];

  // compute even numeric ticks & domain from data
  const { ticks, domain } = useMemo(() => {
    if (indexed.length === 0) return { ticks: [0, 1], domain: [0, 1] as [number, number] };
    let min = Infinity, max = -Infinity;
    for (const p of indexed) {
      const v = p.count;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    const ts = makeNiceTicks(min, max, 5);         // 4–6 ticks typically
    const d: [number, number] = [ts[0], ts[ts.length - 1]];
    return { ticks: ts, domain: d };
  }, [indexed]);

  if (indexed.length < 2) {
    return <div className="w-full h-full rounded-xl bg-[color:var(--kw-grid,rgba(0,0,0,0.06))]/20" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* key forces clean mount when period/length changes to avoid morphing */}
      <LineChart key={`${period}-${indexed.length}`} data={indexed} margin={{ top: 8, right: 16, left: 6, bottom: 6 }}>
        <CartesianGrid stroke="var(--kw-grid, rgba(0,0,0,0.06))" strokeDasharray="3 3" />
        <XAxis
          dataKey="idx"
          stroke="var(--kw-axis, #334155)"
          tick={{ fontSize: 12, fill: "var(--kw-axis, #334155)" }}
          minTickGap={12}
          tickMargin={6}
          tickFormatter={tickFormatterX}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke="var(--kw-axis, #334155)"
          tick={{ fontSize: 12, fill: "var(--kw-axis, #334155)" }}
          allowDecimals={false}
          width={40}
          domain={domain}        // use our even domain
          ticks={ticks}          // evenly spaced numeric ticks
        />
       <Tooltip
  formatter={(v: any) => [Number(v).toLocaleString(), "Keywords"]}
  labelFormatter={(label) =>
    labels[(typeof label === "number" ? label : Number(label) || 0) % labels.length]
  }
  contentStyle={{
    backgroundColor: "var(--kw-tooltip-bg, #ffffff)",
    borderColor: "var(--kw-tooltip-border, #e5e7eb)",
    color: "var(--kw-tooltip-fg, #0f172a)",
    borderRadius: 8,
  }}
/>

        <Line
          type="monotoneX"
          dataKey="count"
          stroke="var(--kw-line, #22c55e)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--kw-line, #22c55e)" }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
