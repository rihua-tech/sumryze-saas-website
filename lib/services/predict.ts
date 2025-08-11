// /lib/services/predict.ts
// 7-day MA + linear trend + weekday factors + uncertainty band,
// plus small bounded nudges (CTR / TopPages / CWV).

export type ForecastResult = {
  forecast: number[];      // next 30
  baseline: number[];      // last 30 (smoothed)
  growthPct: number;       // (sum(forecast)-sum(baseline))/sum(baseline)
  bandLow: number[];       // same length as forecast
  bandHigh: number[];      // same length as forecast
};

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

function movingAvg7(xs: number[]) {
  const out: number[] = [];
  for (let i = 0; i < xs.length; i++) {
    const s = Math.max(0, i - 6);
    const slice = xs.slice(s, i + 1);
    out.push(slice.reduce((a, b) => a + b, 0) / slice.length);
  }
  return out;
}

function weekdayFactors(xs: number[], recentDays = 56) {
  const win = xs.slice(-recentDays);
  if (win.length < 14) return Array(7).fill(1);
  const means = Array(7).fill(0);
  const counts = Array(7).fill(0);
  const startIdx = xs.length - win.length;
  for (let i = 0; i < win.length; i++) {
    const dow = (startIdx + i) % 7; // rough weekday cycle; only relative factors matter
    means[dow] += win[i];
    counts[dow] += 1;
  }
  for (let d = 0; d < 7; d++) means[d] = counts[d] ? means[d] / counts[d] : 1;
  const overall = sum(means) / 7 || 1;
  return means.map(m => (overall ? m / overall : 1)); // normalize to avg=1
}

function linearTrend(xs: number[], lastN = 56) {
  const win = xs.slice(-lastN);
  const n = win.length;
  if (n < 8) return { a: 0, b: win[n - 1] || 0 }; // y = a*x + b
  let sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sx += i; sy += win[i]; sxy += i * win[i]; sxx += i * i; }
  const a = (n * sxy - sx * sy) / Math.max(1, (n * sxx - sx * sx));
  const b = (sy - a * sx) / n;
  return { a, b };
}

function rmse(actual: number[], predicted: number[]) {
  const n = Math.min(actual.length, predicted.length);
  if (n === 0) return 0;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const e = actual[i] - predicted[i];
    s += e * e;
  }
  return Math.sqrt(s / n);
}

/** Core forecaster. `series` should be daily clicks. */
export function forecast30(series: number[]): ForecastResult {
  const xs = series.map(v => (Number.isFinite(v) ? Math.max(0, v) : 0));
  if (xs.length < 45) {
    return {
      forecast: Array(30).fill(0),
      baseline: Array(30).fill(0),
      growthPct: 0,
      bandLow: Array(30).fill(0),
      bandHigh: Array(30).fill(0),
    };
  }

  const ma = movingAvg7(xs);
  const { a, b } = linearTrend(ma, 56);
  const wdf = weekdayFactors(xs, 56);
  const last = ma[ma.length - 1];

  // Build a simple linear projection from the last level
  const proj = Array.from({ length: 30 }, (_, t) => Math.max(0, last + a * (t + 1)));

  // Re-apply weekday factors (cycle Mon..Sun)
  const startDow = xs.length % 7;
  const forecast = proj.map((v, i) => Math.max(0, v * wdf[(startDow + i + 1) % 7]));

  const baseline = ma.slice(-30);

  // Uncertainty band: combine relative RMSE on recent window with a floor ±15%
  // Build backcast predictions for RMSE on last 56 days
  const winLen = Math.min(ma.length, 56);
  const idx0 = ma.length - winLen;
  const backcast: number[] = [];
  for (let i = 0; i < winLen; i++) backcast.push(Math.max(0, b + a * i));
  const sigma = rmse(ma.slice(idx0), backcast);
  const meanWin = (sum(ma.slice(idx0)) / Math.max(1, winLen)) || 1;
  const rel = Math.max(0.15, sigma / meanWin); // at least ±15%

  const bandLow = forecast.map(v => Math.max(0, v * (1 - rel)));
  const bandHigh = forecast.map(v => Math.max(0, v * (1 + rel)));

  const growthPct = (() => {
    const sF = sum(forecast);
    const sB = sum(baseline);
    return sB ? (sF - sB) / sB : 0;
  })();

  return { forecast, baseline, growthPct, bandLow, bandHigh };
}

/** Optional: apply small bounded nudges (total clamp ±20%). */
export function applyNudges(
  forecast: number[],
  opts: {
    ctrSeries?: number[];     // 0..1 daily CTR from GSC (for last ~60 days)
    topPagesDelta?: number;   // fractional delta, e.g. +0.12 for +12%
    cwvDelta?: number;        // fractional delta in "good CWV %" (0..1)
  } = {}
) {
  let nudge = 0;
  const details: Record<string, number> = {};

  // CTR trend: last 14d vs prev 14d → 50% weight, clamp ±10%
  if (opts.ctrSeries && opts.ctrSeries.length >= 30) {
    const cs = opts.ctrSeries.slice(-28);
    const last = cs.slice(-14).reduce((a,b)=>a+b,0) / 14;
    const prev = cs.slice(0,14).reduce((a,b)=>a+b,0) / 14 || 1e-6;
    const delta = last / prev - 1;
    const apply = clamp(delta * 0.5, -0.10, 0.10);
    nudge += apply;
    details.ctr = apply;
  }

  // Top Pages growth (optional): 40% weight, clamp ±8%
  if (typeof opts.topPagesDelta === "number") {
    const apply = clamp(opts.topPagesDelta * 0.4, -0.08, 0.08);
    nudge += apply;
    details.topPages = apply;
  }

  // CWV improvement (optional): clamp ±3%
  if (typeof opts.cwvDelta === "number") {
    const apply = clamp(opts.cwvDelta, -0.03, 0.03);
    nudge += apply;
    details.cwv = apply;
  }

  nudge = clamp(nudge, -0.20, 0.20);

  const adjusted = forecast.map(v => Math.max(0, v * (1 + nudge)));
  return { adjusted, totalNudge: nudge, details };
}
