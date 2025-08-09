"use client";

import { useState } from "react";

type ConnectGAPlaceholderProps = {
  onOpenPricingModal: () => Promise<boolean>;
  onConnectGA4: () => void;
  label?: string;             // optional custom label
};

export default function ConnectGAPlaceholder({
  onOpenPricingModal,
  onConnectGA4,
  label = "Upgrade to Pro & Connect GA4",
}: ConnectGAPlaceholderProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgradeAndConnect = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const upgraded = await onOpenPricingModal();
      if (upgraded) onConnectGA4();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-48">
      <button
  onClick={handleUpgradeAndConnect}
  disabled={loading}
  aria-label={label}
  aria-busy={loading}
  className="
    group relative
    inline-flex items-center justify-center gap-2 select-none
    rounded-full
    w-[280px] sm:w-[320px]
    max-[380px]:w-[240px]
    px-4 sm:px-6 py-2 sm:py-2.5
    text-sm sm:text-base leading-none
    whitespace-nowrap
    bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600
    text-white font-semibold
    shadow-[0_6px_20px_rgba(79,70,229,.35)]
    transition-all duration-200
    hover:brightness-110 hover:shadow-[0_8px_24px_rgba(79,70,229,.45)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70
    focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900
    disabled:opacity-60 disabled:cursor-not-allowed
  "
>
  {/* shimmer gloss */}
  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

  <span className="relative z-10 inline-flex items-center gap-2">
    {loading ? (
      <>
        <Spinner />
        Processing…
      </>
    ) : (
      <>
        <span aria-hidden className="text-base leading-none">💎</span>

        {/* Long label (default) */}
        <span className="max-[380px]:hidden">
          Upgrade to Pro &amp; Connect GA4
        </span>

        {/* Short label for ultra-narrow phones */}
        <span className="hidden max-[380px]:inline">
          Upgrade &amp; Connect GA4
        </span>
      </>
    )}
  </span>
</button>

    </div>
  );
}

/** Minimal spinner (no extra deps) */
function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
