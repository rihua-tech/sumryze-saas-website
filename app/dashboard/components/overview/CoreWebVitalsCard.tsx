"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Info } from "lucide-react";
import { useUrlContext } from "@/app/context/UrlContext";
import CoreWebVitalsChart, { type CoreVital } from "./CoreWebVitalsChart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/* ------------------------------ API shape ------------------------------ */
type ApiResponse = { vitals: CoreVital[] };

/* ------------------------------ Knobs ---------------------------------- */
const HARD_TIMEOUT_MS = 8_000;

/* ------------------------------ Neutral rings --------------------------- */
/** Fixed placeholders so the donuts are always visible */
function makeNeutralVitals(): CoreVital[] {
  return [
    { name: "LCP", value: Number.NaN, target: 2.5, unit: "s",  thresholds: [2.5, 4.0], color: "#10b981" }, // emerald
    { name: "INP", value: Number.NaN, target: 200, unit: "ms", thresholds: [200, 500], color: "#3b82f6" }, // blue
    { name: "CLS", value: Number.NaN, target: 0.1, unit: "",  thresholds: [0.1, 0.25], color: "#f59e0b" }, // amber
  ];
}




/* ------------------------------ Component ------------------------------ */
export default function CoreWebVitalsCard() {
  const { url: ctxUrl } = useUrlContext();
  const url = (ctxUrl || "").trim();
  const hasUrl = Boolean(url);

  const [vitals, setVitals] = useState<CoreVital[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Visibility gate (avoid work when offscreen)
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fetch live CrUX when visible + URL provided
  useEffect(() => {
    if (!inView || !hasUrl) return;

    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), HARD_TIMEOUT_MS);

    (async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/web-vitals?url=${encodeURIComponent(url)}`, {
          signal: ac.signal,
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        const json = (await res.json()) as ApiResponse & { error?: string };

        if (!res.ok || !Array.isArray(json?.vitals)) {
          throw new Error(json?.error || `HTTP ${res.status}`);
        }
        setVitals(json.vitals);
      } catch (e: any) {
        // Quiet: keep neutral rings, don’t show error text
        if (e?.name !== "AbortError") {
          // eslint-disable-next-line no-console
          console.warn("[CWV] fetch failed:", e?.message || e);
        }
      } finally {
        clearTimeout(timer);
        setIsLoading(false);
      }
    })();

    return () => {
      clearTimeout(timer);
      ac.abort();
    };
  }, [inView, hasUrl, url]);

  // Always show the three donuts: use live data if we have it, else neutral placeholders
  const displayVitals = useMemo<CoreVital[]>(() => {
    return vitals && vitals.length ? vitals : makeNeutralVitals();
  }, [vitals]);

  return (
    <TooltipProvider delayDuration={120}>
      <div
        ref={cardRef}
        className="rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1423] p-5 sm:p-6 shadow-sm"
        aria-busy={isLoading || undefined}
        aria-live="polite"
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              Core Web Vitals
            </h3>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="inline-flex items-center justify-center rounded-full p-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label="About Core Web Vitals"
                >
                  <Info size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[280px]">
                <p className="text-xs leading-snug">
                  LCP (largest contentful paint), INP (interaction latency), and CLS (layout shift).
                  Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.10 (p75 over last 28 days, field data).
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Body – donuts are ALWAYS rendered */}
        <div className="min-h-[220px]">
          <CoreWebVitalsChart vitals={displayVitals} />
        </div>

        {/* No error UI rendered on purpose */}
      </div>
    </TooltipProvider>
  );
}
