"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText, Gauge, BookOpen, Star, Tag, Heading, CheckCircle2, AlertCircle, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUrlContext } from "@/app/context/UrlContext";

/* ------------------------------- Types ------------------------------- */
type ApiResponse = {
  wordCount?: number;
  qualityScore?: number; // 0..100
  metaPresent?: boolean;
  titlePresent?: boolean;
  isMock?: boolean;
};
type Stored = { data: Required<ApiResponse>; ts: number };

/* ------------------------------ Consts ------------------------------ */
const WORDCOUNT_TARGET = 800;
const SOFT_TIMEOUT_MS = 1000;
const HARD_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 10 * 60 * 1000;
const cacheKey = (k: string) => `kwcache:content:${k}`; // same prefix style as Keyword

/* --------------------------- Demo generator ------------------------- */
function hash32(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeDemoContent(key: string): Required<ApiResponse> {
  const r = mulberry32(hash32(`content-demo|${key}`));
  const wordCount = Math.round(650 + r() * 650);   // 650–1300
  const qualityScore = Math.round(72 + r() * 23);  // 72–95
  const metaPresent = r() > 0.30;
  const titlePresent = r() > 0.15;
  return { wordCount, qualityScore, metaPresent, titlePresent, isMock: true };
}

/* ------------------------------- Utils ------------------------------ */
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
function readCache(key: string): Stored | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(key));
    if (!raw) return null;
    const obj = JSON.parse(raw) as Stored;
    if (!obj?.data) return null;
    if (Date.now() - obj.ts > CACHE_TTL_MS) return null;
    return obj;
  } catch { return null; }
}
function writeCache(key: string, data: Required<ApiResponse>) {
  try { sessionStorage.setItem(cacheKey(key), JSON.stringify({ data, ts: Date.now() })); } catch {}
}

/* ------------------------------ Component --------------------------- */
export default function ContentPerformanceCard() {
  const router = useRouter();
  const { url: ctxUrl } = useUrlContext();

  const rawUrl = (ctxUrl || "").trim();
  const hasUrl = rawUrl.length > 0;
  const key = hasUrl ? rawUrl : "demo://blank";

  // --- Synchronous initial state (this removes the “empty header” flash) ---
  const cached = typeof window !== "undefined" ? readCache(key) : null;
  const initialData: Required<ApiResponse> | null =
    !hasUrl ? makeDemoContent(key) : (cached?.data ?? null);

  const [data, setData] = useState<Required<ApiResponse> | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false); // true only when fetching live and no cache
  const [error, setError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const lastCheckedRef = useRef<Date | null>(null);

  const isSample = !hasUrl || Boolean(data?.isMock);

  // Prefetch when close to viewport (earlier than before)
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setInView(true); io.disconnect(); } },
      { rootMargin: "600px" } // start fetch earlier so it’s ready when user gets here
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Live fetch (only when a real URL exists). Keeps demo/cache on screen.
  useEffect(() => {
    if (!inView || !hasUrl) return;

    const hasWarmCache = Boolean(cached);
    setError(null);
    setLoading(!hasWarmCache); // show skeleton only if we had no cache

    const ac = new AbortController();
    let softTimer: any = null;
    let hardTimer: any = null;

    if (!hasWarmCache) {
      softTimer = setTimeout(() => {
        // soft fallback (rare when network is slow)
        setData((prev) => prev ?? makeDemoContent(key));
      }, SOFT_TIMEOUT_MS);
    }
    hardTimer = setTimeout(() => ac.abort(), HARD_TIMEOUT_MS);

    (async () => {
      try {
        const res = await fetch(
          `/api/content-performance?url=${encodeURIComponent(rawUrl)}&fields=wordCount,qualityScore,metaPresent,titlePresent,isMock`,
          { signal: ac.signal, cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = await res.json();

        clearTimeout(softTimer);
        clearTimeout(hardTimer);

        const merged: Required<ApiResponse> = {
          wordCount: json.wordCount ?? 0,
          qualityScore: clamp(json.qualityScore ?? 0, 0, 100),
          metaPresent: !!json.metaPresent,
          titlePresent: !!json.titlePresent,
          isMock: !!json.isMock,
        };

        setData(merged);
        writeCache(key, merged);
        lastCheckedRef.current = new Date();
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError(null);
          const sample = makeDemoContent(key);
          setData(sample);
          writeCache(key, sample);
        }
      } finally {
        clearTimeout(softTimer);
        clearTimeout(hardTimer);
        setLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasUrl, rawUrl, key]); // (cached) intentionally not in deps

  // ====== Derived UI values ======
  const nf = useMemo(() => new Intl.NumberFormat(), []);
  const wordOk: "good" | "warn" = (data?.wordCount ?? 0) >= WORDCOUNT_TARGET ? "good" : "warn";
  const healthScore = useMemo(() => {
    if (!data) return 0;
    const q = clamp(data.qualityScore ?? 0, 0, 100);
    const meta = data.metaPresent ? 15 : 0;
    const title = data.titlePresent ? 15 : 0;
    const words = Math.min(1, (data.wordCount ?? 0) / WORDCOUNT_TARGET) * 10;
    return Math.round(q * 0.6 + meta + title + words);
  }, [data]);

  const chip = (tone: "good" | "warn" | "bad" | "neutral" = "neutral") =>
    ({
      good: "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-emerald-500/15 text-emerald-400",
      warn: "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-amber-500/15 text-amber-400",
      bad:  "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-rose-500/15 text-rose-400",
      neutral: "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-muted/60 text-foreground/80",
    }[tone]);
  const status = (tone: "good" | "warn" | "bad") =>
    ({ good: "text-emerald-400", warn: "text-amber-400", bad: "text-rose-400" }[tone]);

  const goImprove = () =>
    router.push(
      hasUrl
        ? `/dashboard/llm-content?action=blog&url=${encodeURIComponent(rawUrl)}#generate-blog`
        : `/dashboard/llm-content?action=blog&picker=topics#generate-blog`
    );

  // ====== Render ======
  return (
    <div
      ref={cardRef}
      className="group relative bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 transition-colors"
      aria-busy={loading || undefined}
    >
      {/* header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground leading-tight">
            <FileText className="h-5 w-5 text-indigo-400" />
            Content Performance
          </h3>
          {isSample && (
            <TooltipProvider delayDuration={120}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="ml-1 inline-flex items-center rounded-full px-2 py-1 text-[10px] leading-none font-semibold tracking-wide shrink-0
                               border bg-slate-100 text-slate-700 border-slate-300/80
                               dark:bg-white/10 dark:text-slate-300 dark:border-white/15"
                    aria-label="Sample data"
                  >
                    Sample
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[260px]">
                  <p className="text-xs leading-snug">
                    Showing sample data. Paste a URL to analyze your real page.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <Button
          size="sm"
          className="bg-indigo-500 text-white hover:bg-indigo-600"
          onClick={goImprove}
          aria-label="Improve content with AI"
        >
          Improve with AI
        </Button>
      </div>

      {/* skeleton only for live w/o cache */}
      {loading && hasUrl && !cached && (
        <div role="status" aria-live="polite" className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-muted/40" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Data (demo, cache, or fresh live) */}
      {data && (
        <>
          <div className="mb-5 mt-5 rounded-xl bg-muted/40 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-muted-foreground">SEO Readiness</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="text-muted-foreground/70 hover:text-foreground transition"
                        aria-label="How this score is calculated"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="start" className="max-w-[260px] text-xs">
                      Blended score: <b>60%</b> Writing Quality + <b>15%</b> Meta + <b>15%</b> Title + <b>10%</b> Word target.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                {healthScore >= 80 && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                <span className="text-sm font-semibold tabular-nums">{healthScore}/100</span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className={chip("neutral")}>Quality {data.qualityScore ?? 0}</span>
              <span className={chip(data.metaPresent ? "good" : "bad")}>Meta {data.metaPresent ? "✓" : "—"}</span>
              <span className={chip(data.titlePresent ? "good" : "bad")}>Title {data.titlePresent ? "✓" : "—"}</span>
              <span className={chip((data.wordCount ?? 0) >= WORDCOUNT_TARGET ? "good" : "warn")}>
                Words {(data.wordCount ?? 0) >= WORDCOUNT_TARGET ? "✓" : `Target ≥ ${WORDCOUNT_TARGET}`}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Row
              icon={<BookOpen className="text-blue-400" />}
              label="Word Count"
              right={
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">{nf.format(data.wordCount ?? 0)}</span>
                  <span className={status((data.wordCount ?? 0) >= WORDCOUNT_TARGET ? "good" : "warn")}>
                    {(data.wordCount ?? 0) >= WORDCOUNT_TARGET ? "Meets target" : `Target ${WORDCOUNT_TARGET}+`}
                  </span>
                </div>
              }
            />
            <Row
              icon={<Star className="text-yellow-400" />}
              label="Writing Quality"
              right={
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">{data.qualityScore ?? 0} / 100</span>
                  <span className={status((data.qualityScore ?? 0) >= 75 ? "good" : (data.qualityScore ?? 0) >= 55 ? "warn" : "bad")}>
                    {(data.qualityScore ?? 0) >= 75 ? "Strong" : (data.qualityScore ?? 0) >= 55 ? "Needs work" : "Low"}
                  </span>
                </div>
              }
            />
            <Row
              icon={<Tag className="text-purple-400" />}
              label="Meta Description"
              right={<span className={status(data.metaPresent ? "good" : "bad")}>{data.metaPresent ? "Found" : "Missing"}</span>}
            />
            <Row
              icon={<Heading className="text-cyan-400" />}
              label="Title Tag"
              right={<span className={status(data.titlePresent ? "good" : "bad")}>{data.titlePresent ? "Found" : "Missing"}</span>}
            />
          </div>

          <div className="mt-4 text-[10px] text-muted-foreground flex items-center justify-between">
            <span>Targets: Word ≥ {WORDCOUNT_TARGET} • Quality ≥ 75</span>
            {lastCheckedRef.current && (
              <span className="italic">Checked: {lastCheckedRef.current.toLocaleTimeString()}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Row({ icon, label, right }: { icon: React.ReactNode; label: string; right: React.ReactNode }) {
  return (
    <div className="flex h-10 items-center justify-between rounded-xl bg-muted/40 px-3 hover:bg-muted/50 transition-colors" role="listitem">
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="text-sm font-medium">{right}</div>
    </div>
  );
}
