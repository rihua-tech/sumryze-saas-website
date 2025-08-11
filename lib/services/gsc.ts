// /lib/services/gsc.ts
// Fetch daily Search Console metrics (clicks/impressions/ctr/position).
// Service account must be added as a USER on the GSC property.

import { google } from "googleapis";

/** One day of GSC metrics. ctr is 0..1 (not %) */
export type GscDaily = {
  date: string;          // "YYYY-MM-DD"
  clicks: number;
  impressions: number;
  ctr: number;           // 0..1
  position: number;      // avg position
};

function toIsoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Build the siteUrl for GSC, supporting URL-prefix or Domain properties. */
export function toGscSiteUrl(normalizedUrl: string): string {
  const mode = (process.env.GSC_SITE_MODE || "url").toLowerCase();
  if (mode === "domain") {
    const host = new URL(normalizedUrl).hostname;
    return `sc-domain:${host}`;
  }
  // URL-prefix: use the origin and trailing slash (https://example.com/)
  const u = new URL(normalizedUrl);
  return `${u.origin}/`;
}

/** Create an authenticated GSC client using service-account credentials. */
function getGscClient() {
  const email = process.env.GSC_CLIENT_EMAIL || "";
  let key = process.env.GSC_PRIVATE_KEY || "";
  if (!email || !key) throw new Error("Missing GSC_CLIENT_EMAIL or GSC_PRIVATE_KEY");
  // Handle \n encoded keys from env
  key = key.replace(/\\n/g, "\n");

  // ✅ modern, typed constructor
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  return google.webmasters({ version: "v3", auth });
}

/**
 * Fetch daily rows for the last `days` days. Gaps are filled with zeros.
 * Returns ctr in 0..1 range.
 */
export async function getDailySearchData(siteUrl: string, days = 180): Promise<GscDaily[]> {
  const webmasters = getGscClient();

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  const { data } = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: toIsoDate(start),
      endDate: toIsoDate(end),
      dimensions: ["date"],
      rowLimit: 25000,
    },
  } as any);

  const rows = data.rows || [];
  const byDate = new Map<string, GscDaily>();
  for (const r of rows) {
    const key = (r.keys?.[0] as string) || "";
    const clicks = Number(r.clicks || 0);
    const impressions = Number(r.impressions || 0);
    let ctr = Number(r.ctr || 0);          // API returns 0..1
    if (ctr > 1) ctr = ctr / 100;          // defensive: normalize if % slipped in
    const position = Number(r.position || 0);
    byDate.set(key, { date: key, clicks, impressions, ctr, position });
  }

  // Fill missing dates
  const out: GscDaily[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const key = toIsoDate(cursor);
    out.push(byDate.get(key) ?? { date: key, clicks: 0, impressions: 0, ctr: 0, position: 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/** Convenience helpers for series */
export function toSeries(rows: GscDaily[]) {
  return {
    clicks: rows.map(r => r.clicks),
    impressions: rows.map(r => r.impressions),
    ctr: rows.map(r => r.ctr),
    position: rows.map(r => r.position),
  };
}
