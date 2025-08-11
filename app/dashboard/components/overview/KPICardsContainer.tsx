"use client";

import { useEffect, useState } from "react";
import SEOScoreCard from "./KPI/SEOScoreCard";
import TopPagesCard from "./KPI/TopPagesCard";
import { useUrlContext } from "@/app/context/UrlContext";

type KPI = {
  title: string;
  value: number | string;
  delta?: string;
  down?: boolean;
  series?: number[];
};

// Initial placeholders so both cards render immediately (no layout shift)
const INITIAL: Record<string, KPI> = {
  "SEO Score": { title: "SEO Score", value: 0, delta: "+0", down: false },
  "Top Pages": { title: "Top Pages", value: 0, delta: "+0", down: false, series: [0, 0] },
};

const API_TIMEOUT_MS = 8000;

function isKPIArray(x: unknown): x is KPI[] {
  return Array.isArray(x) && x.every(i =>
    i && typeof i === "object" &&
    typeof (i as any).title === "string" &&
    ("value" in (i as any))
  );
}

export default function KPICardsContainer() {
  const { url } = useUrlContext();
  const [data, setData] = useState<Record<string, KPI>>(INITIAL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!url) {
      setData(INITIAL);
      setLoaded(false);
      return;
    }

    const ac = new AbortController();
    const t = setTimeout(() => ac.abort("timeout"), API_TIMEOUT_MS);

    setLoaded(false);

    (async () => {
      try {
        const res = await fetch(`/api/kpis?url=${encodeURIComponent(url)}`, {
          method: "GET",
          signal: ac.signal,
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        if (!res.ok) throw new Error(`KPI fetch failed: ${res.status}`);

        const raw = await res.json();
        const list: KPI[] = isKPIArray(raw) ? raw : [];
        const map = list.reduce<Record<string, KPI>>((acc, k) => {
          acc[k.title] = k;
          return acc;
        }, {});

        // Merge over INITIAL so shape stays stable
        setData(prev => ({ ...prev, ...map }));
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("[KPIs] fetch error:", err);
        }
      } finally {
        clearTimeout(t);
        setLoaded(true);
      }
    })();

    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [url]);

  const seo = data["SEO Score"];
  const pages = data["Top Pages"];

  // Gate on a *real* SEO score (prevents red flash + 0→90 sweep)
  const seoNum = Number(seo?.value);
  const seoReady = loaded && Number.isFinite(seoNum) && seoNum > 0; // switch to >= 0 if 0 is valid in your domain

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SEOScoreCard
        key={seoReady ? `seo-ready-${seoNum}` : "seo-loading"} // remount only when ready
        value={seoReady ? seoNum : 0}
        delta={seoReady ? seo.delta : undefined}
        down={seoReady ? seo.down : undefined}
        note="vs last week"
        loading={!seoReady}
      />

      <TopPagesCard
        key={`pages-${url ?? "none"}`}
        value={loaded ? Number(pages.value) || 0 : 0}
        delta={loaded ? pages.delta : undefined}
        down={loaded ? pages.down : undefined}
        series={Array.isArray(pages.series) ? pages.series : undefined}
        // If TopPagesCard supports it, also pass: loading={!loaded}
      />
    </div>
  );
}
