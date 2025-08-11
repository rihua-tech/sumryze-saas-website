// app/api/keyword-growth/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { JWT } from "google-auth-library";
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // optional


type Period = "weekly" | "monthly";
type Point  = { day: string; count: number };

const LIVE_ENABLED = process.env.GOOGLE_KEYWORD_LIVE === "true";
const API_TIMEOUT_MS = 12000;

/* ---------------- Mock data (your existing) ---------------- */
const MOCK_WEEKLY: Point[] = [
  { day: "Mon", count: 120 }, { day: "Tue", count: 130 }, { day: "Wed", count: 160 },
  { day: "Thu", count: 155 }, { day: "Fri", count: 180 }, { day: "Sat", count: 200 }, { day: "Sun", count: 240 },
];
const MOCK_MONTHLY: Point[] = [
  { day: "Jan", count: 400 }, { day: "Feb", count: 450 }, { day: "Mar", count: 470 }, { day: "Apr", count: 500 },
  { day: "May", count: 550 }, { day: "Jun", count: 590 }, { day: "Jul", count: 650 }, { day: "Aug", count: 700 },
  { day: "Sep", count: 780 }, { day: "Oct", count: 820 }, { day: "Nov", count: 880 }, { day: "Dec", count: 900 },
];

/* ---------------- Utils ---------------- */
function withTimeout<T>(p: Promise<T>, ms = API_TIMEOUT_MS): Promise<T> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  // @ts-ignore attach signal if consumer wants it
  (p as any).signal = ac.signal;
  return p.finally(() => clearTimeout(t));
}
function labelDow(d: Date) {
  return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
}
function labelMonth(i: number) {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i];
}
function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}
function startOfDay(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

async function getAccessToken() {
  const email = process.env.GSC_CLIENT_EMAIL;
  const key = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) return null;
  const jwt = new JWT({ email, key, scopes: ["https://www.googleapis.com/auth/webmasters.readonly"] });
  const { access_token } = await jwt.authorize();
  return access_token ?? null;
}

/* ---------------- Live (GSC) ----------------
   Weekly: last 7 days, dimension ["date","query"]
   Monthly: last 12 months, query daily then aggregate by month
------------------------------------------------ */
async function fetchFromGoogle(targetUrl: string, period: Period): Promise<Point[]> {
  const token = await getAccessToken();
  if (!token) throw new Error("GSC credentials missing");

  const siteUrl = targetUrl.endsWith("/") ? targetUrl.slice(0, -1) : targetUrl;
  const today = startOfDay();

  if (period === "weekly") {
    const start = new Date(today); start.setDate(today.getDate() - 6); // 7 days inclusive
    const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
    const body = {
      startDate: iso(start),
      endDate: iso(today),
      dimensions: ["date", "query"],
      rowLimit: 25000,
    };

    const res = await withTimeout(fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    }));
    if (!res.ok) throw new Error(`GSC weekly HTTP ${res.status}`);

    const json = await res.json();
    const rows: { keys: string[]; impressions?: number }[] = Array.isArray(json?.rows) ? json.rows : [];

    // Distinct queries with impressions > 0 per day
    const byDate = new Map<string, Set<string>>();
    for (const r of rows) {
      const [date, query] = r.keys ?? [];
      if (!date || !query) continue;
      if ((r.impressions ?? 0) <= 0) continue;
      if (!byDate.has(date)) byDate.set(date, new Set());
      byDate.get(date)!.add(query);
    }

    const out: Point[] = [];
    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const key = iso(d);
      out.push({ day: labelDow(d), count: byDate.get(key)?.size ?? 0 });
    }
    return out;
  }

  // monthly → last 12 months
  const end = today;
  const start = new Date(end); start.setMonth(end.getMonth() - 11); start.setDate(1); // from first day 11 months ago
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const body = {
    startDate: iso(start),
    endDate: iso(end),
    dimensions: ["date", "query"],
    rowLimit: 25000,
  };

  const res = await withTimeout(fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  }));
  if (!res.ok) throw new Error(`GSC monthly HTTP ${res.status}`);

  const json = await res.json();
  const rows: { keys: string[]; impressions?: number }[] = Array.isArray(json?.rows) ? json.rows : [];

  // Aggregate by YYYY-MM: distinct queries with impressions > 0
  const byMonth = new Map<string, Set<string>>();
  for (const r of rows) {
    const [date, query] = r.keys ?? [];
    if (!date || !query) continue;
    if ((r.impressions ?? 0) <= 0) continue;
    const d = new Date(date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!byMonth.has(key)) byMonth.set(key, new Set());
    byMonth.get(key)!.add(query);
  }

  // Build 12 month series (oldest → latest)
  const points: Point[] = [];
  const cursor = new Date(start);
  for (let i = 0; i < 12; i++) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
    points.push({ day: labelMonth(cursor.getMonth()), count: byMonth.get(key)?.size ?? 0 });
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return points;
}

/* ---------------- Source selection ---------------- */
async function getKeywordGrowthData(targetUrl: string | null, period: Period): Promise<Point[]> {
  if (LIVE_ENABLED && targetUrl) {
    try {
      return await fetchFromGoogle(targetUrl, period);
    } catch (err) {
      console.warn("[keyword-growth] live fetch failed → fallback:", (err as Error)?.message);
    }
  }
  return period === "weekly" ? MOCK_WEEKLY : MOCK_MONTHLY;
}

/* ---------------- Route handler ---------------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const periodParam = (searchParams.get("period") || "weekly").toLowerCase() as Period;
    const rawUrl = searchParams.get("url") ?? null;

    if (periodParam !== "weekly" && periodParam !== "monthly") {
      return NextResponse.json({ error: "Invalid period. Use 'weekly' or 'monthly'." }, { status: 400 });
    }

    let targetUrl: string | null = null;
    if (rawUrl) {
      const normalized = normalizeUrl(rawUrl);
      if (!normalized) return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
      targetUrl = normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
    }

    const data = await getKeywordGrowthData(targetUrl, periodParam);
    return NextResponse.json({ data }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Keyword Growth API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
