// lib/ga4.ts
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type TrafficChannelRow = { channel: string; sessions: number };
export type TrafficChannelResult = { labels: string[]; series: number[]; sample?: boolean };

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const GA4_CLIENT_EMAIL = process.env.GA4_CLIENT_EMAIL;
const GA4_PRIVATE_KEY = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");

// Create a single client instance for the process
let _client: BetaAnalyticsDataClient | null = null;
function client(): BetaAnalyticsDataClient {
  if (_client) return _client;
  if (!GA4_CLIENT_EMAIL || !GA4_PRIVATE_KEY) {
    // No credentials -> we will fall back to sample data in callers
    throw new Error("GA4 credentials missing");
  }
  _client = new BetaAnalyticsDataClient({
    credentials: { client_email: GA4_CLIENT_EMAIL, private_key: GA4_PRIVATE_KEY },
  });
  return _client;
}

export function hostnameFromUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function normalizeChannelName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("organic search")) return "Organic";
  if (n === "direct") return "Direct";
  if (n === "referral") return "Referral";
  if (n.includes("email")) return "Email";
  if (n.includes("social")) return "Social";
  return name; // keep GA4 naming for others (Paid Search, Display, etc.)
}

export async function fetchTrafficByChannel(opts: {
  propertyId: string;
  host?: string | null;
  days?: number; // default 28
}): Promise<TrafficChannelResult> {
  const propertyId = opts.propertyId;
  if (!propertyId) throw new Error("GA4 propertyId is required");

  const days = Math.min(Math.max(Number(opts.days || 28), 1), 180); // clamp 1..180
  const host = (opts.host || "").trim();
  const useHost = Boolean(host);

  const dimensionFilter = useHost
    ? {
        filter: {
          fieldName: "hostName",
          inListFilter: {
            values: [host, `www.${host}`], // accept both host and www.host
            caseSensitive: false,
          },
        },
      }
    : undefined;

  // Query GA4
  const [resp] = await client().runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "yesterday" }],
    dimensions: [{ name: "sessionDefaultChannelGrouping" }, ...(useHost ? [{ name: "hostName" }] : [])],
    metrics: [{ name: "sessions" }],
    dimensionFilter,
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 100,
  });

  const rows: TrafficChannelRow[] =
    (resp.rows || []).map((r) => ({
      channel: r.dimensionValues?.[0]?.value || "Unassigned",
      sessions: Number(r.metricValues?.[0]?.value || 0),
    })) || [];

  // Sort & Top-5 with "Other"
  rows.sort((a, b) => b.sessions - a.sessions);
  let sliced = rows.slice(0, 5);
  const other = rows.slice(5).reduce((acc, r) => acc + r.sessions, 0);
  if (other > 0) {
    sliced = [...sliced, { channel: "Other", sessions: other }];
  }

  const labels = sliced.map((r) => normalizeChannelName(r.channel));
  const series = sliced.map((r) => r.sessions);

  return { labels, series };
}

// Fallback if GA4 is not configured (keeps UI working)
export function sampleTrafficByChannel(): TrafficChannelResult {
  return {
    labels: ["Organic", "Direct", "Referral", "Social", "Email"],
    series: [236, 198, 142, 99, 65],
    sample: true,
  };
}
