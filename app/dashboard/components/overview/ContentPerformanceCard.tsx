"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Gauge,
  BookOpen,
  Star,
  Tag,
  Heading,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUrlContext } from "@/app/context/UrlContext";

type ApiResponse = {
  wordCount?: number;
  qualityScore?: number; // 0..100
  metaPresent?: boolean;
  titlePresent?: boolean;
};

const WORDCOUNT_TARGET = 800;

export default function ContentPerformanceCard() {
  const router = useRouter();
  const { url: currentUrl } = useUrlContext();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const lastCheckedRef = useRef<Date | null>(null);

  // Prefetch only when visible (keeps page snappy)
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

  useEffect(() => {
    if (!inView || !currentUrl) return;
    setLoading(true);
    setError(null);

    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `/api/content-performance?url=${encodeURIComponent(
            currentUrl
          )}&fields=wordCount,qualityScore,metaPresent,titlePresent`,
          { signal: ac.signal, cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = await res.json();
        setData({
          wordCount: json.wordCount ?? 0,
          qualityScore: clamp(json.qualityScore ?? 0, 0, 100),
          metaPresent: !!json.metaPresent,
          titlePresent: !!json.titlePresent,
        });
        lastCheckedRef.current = new Date();
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError("Couldn’t load content performance.");
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [inView, currentUrl]);

  // Derived
  const nf = useMemo(() => new Intl.NumberFormat(), []);
  const wordOk: "good" | "warn" =
    (data?.wordCount ?? 0) >= WORDCOUNT_TARGET ? "good" : "warn";

  const healthScore = useMemo(() => {
    if (!data) return 0;
    const q = clamp(data.qualityScore ?? 0, 0, 100);
    const meta = data.metaPresent ? 15 : 0;
    const title = data.titlePresent ? 15 : 0;
    const words = Math.min(1, (data.wordCount ?? 0) / WORDCOUNT_TARGET) * 10;
    return Math.round(q * 0.6 + meta + title + words);
  }, [data]);

  // Pills (chips) used only inside SEO Readiness breakdown
  const chip = (tone: "good" | "warn" | "bad" | "neutral" = "neutral") =>
    ({
      good:
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-emerald-500/15 text-emerald-400",
      warn:
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-amber-500/15 text-amber-400",
      bad: "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-rose-500/15 text-rose-400",
      neutral:
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-muted/60 text-foreground/80",
    }[tone]);

  // Plain status color classes (right side text only)
  const status = (tone: "good" | "warn" | "bad") =>
    ({
      good: "text-emerald-400",
      warn: "text-amber-400",
      bad: "text-rose-400",
    }[tone]);

  const goImprove = () =>
    router.push(
      currentUrl
        ? `/dashboard/llm-content?action=blog&url=${encodeURIComponent(
            currentUrl
          )}#generate-blog`
        : `/dashboard/llm-content?action=blog&picker=topics#generate-blog`
    );
  const goFixMeta = () => router.push(`/dashboard/fixes?filter=metadata`);

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6"
      aria-busy={loading || undefined}
    >
      {/* Header — same scale as AI Suggestions */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-indigo-400" />
          Content Performance
        </h3>
        <div className="flex items-center gap-2">
          {data && !data.metaPresent && (
            <Button
              variant="outline"
              size="sm"
              onClick={goFixMeta}
              className="hidden sm:inline-flex"
              aria-label="Fix missing meta description"
            >
              Fix Meta
            </Button>
          )}
          <Button
            size="sm"
            className="bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={goImprove}
            aria-label="Improve content with AI"
          >
            Improve with AI
          </Button>
        </div>
      </div>

      {/* States */}
      {!currentUrl && (
        <p className="text-sm text-muted-foreground">
          Paste a URL above to see content performance for that page.
        </p>
      )}

      {currentUrl && loading && (
        <div role="status" aria-live="polite" className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-muted/40" />
          ))}
        </div>
      )}

      {currentUrl && !loading && error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Data */}
      {currentUrl && !loading && !error && data && (
        <>
          {/* SEO Readiness — pill row to match AI Suggestions list items */}
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
                      Blended score: <b>60%</b> Writing Quality + <b>15%</b> Meta +
                      <b> 15%</b> Title + <b>10%</b> Word target.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                {healthScore >= 80 && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                <span className="text-sm font-semibold tabular-nums">{healthScore}/100</span>
              </div>
            </div>

            {/* Breakdown chips (wrap on narrow screens) */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className={chip("neutral")}>Quality {data.qualityScore ?? 0}</span>
              <span className={chip(data.metaPresent ? "good" : "bad")}>
                Meta {data.metaPresent ? "✓" : "—"}
              </span>
              <span className={chip(data.titlePresent ? "good" : "bad")}>
                Title {data.titlePresent ? "✓" : "—"}
              </span>
              <span className={chip(wordOk === "good" ? "good" : "warn")}>
                Words {wordOk === "good" ? "✓" : `< ${WORDCOUNT_TARGET}`}
              </span>
            </div>
          </div>

          {/* Metrics — pill rows; right side is plain colored text (no badges) */}
          <div className="space-y-4">
            <Row
              icon={<BookOpen className="text-blue-400" />}
              label="Word Count"
              right={
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">
                    {nf.format(data.wordCount ?? 0)}
                  </span>
                  <span className={status(wordOk)}>
                    {wordOk === "good" ? "Meets target" : `Target ${WORDCOUNT_TARGET}+`}
                  </span>
                </div>
              }
            />

            <Row
              icon={<Star className="text-yellow-400" />}
              label="Writing Quality"
              right={
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">
                    {data.qualityScore ?? 0} / 100
                  </span>
                  <span
                    className={status(
                      (data.qualityScore ?? 0) >= 75
                        ? "good"
                        : (data.qualityScore ?? 0) >= 55
                        ? "warn"
                        : "bad"
                    )}
                  >
                    {(data.qualityScore ?? 0) >= 75
                      ? "Strong"
                      : (data.qualityScore ?? 0) >= 55
                      ? "Needs work"
                      : "Low"}
                  </span>
                </div>
              }
            />

            <Row
              icon={<Tag className="text-purple-400" />}
              label="Meta Description"
              right={
                <span className={status(data.metaPresent ? "good" : "bad")}>
                  {data.metaPresent ? "Found" : "Missing"}
                </span>
              }
            />

            <Row
              icon={<Heading className="text-cyan-400" />}
              label="Title Tag"
              right={
                <span className={status(data.titlePresent ? "good" : "bad")}>
                  {data.titlePresent ? "Found" : "Missing"}
                </span>
              }
            />
          </div>

          {/* Footer */}
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

function Row({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right: React.ReactNode;
}) {
  // Pill row with subtle hover; mirrors AI Suggestions item shape
  return (
    <div
    
      className="flex h-10 items-center justify-between rounded-xl bg-muted/40 px-3 hover:bg-muted/50 transition-colors"

      role="listitem"
    >
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="text-sm font-medium">{right}</div>
    </div>
  );
}

/* util */
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
