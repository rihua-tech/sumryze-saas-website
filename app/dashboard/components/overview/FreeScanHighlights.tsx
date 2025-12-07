'use client';
import React, { type ReactNode } from 'react';

// =======================
// Types
// =======================
type Intent = 'GOOD' | 'WARN' | 'FIX' | 'PENDING';
// backward-compat so legacy PASS maps to GOOD
type IntentInput = Intent | 'PASS';

interface KPI {
  label: string;
  sub?: string;
  value?: string;   // if missing => pending row
  status?: IntentInput; // GOOD | WARN | FIX | PENDING | PASS(legacy)
}

// =======================
// Utils
// =======================
const normalizeIntent = (s?: IntentInput): Intent => (s === 'PASS' ? 'GOOD' : (s ?? 'PENDING')) as Intent;
const hasIssues = (rows: KPI[]) => rows.some(r => {
  const st = normalizeIntent(r.status);
  return st !== 'GOOD' || !r.value;
});
const asPending = (rows: KPI[]): KPI[] => rows.map(r => ({ ...r, value: undefined, status: 'PENDING' }));

// =======================
// Page (now supports a pending/placeholder state)
// Pass hasUrl=false (default) to show placeholders until a URL is provided
// =======================
export default function FreeScanHighlights({ hasUrl = false }: { hasUrl?: boolean } = {}): JSX.Element {
  const pending = !hasUrl;

  // Middle column KPIs (On-Page style)
  const middleKPIs: KPI[] = [
    { label: 'Missing metas', value: '18', status: 'FIX' },
    { label: 'Schema coverage', value: '64%', status: 'WARN' },
    { label: 'Internal link issues', value: '12', status: 'FIX' },
  ];

  // Right column KPIs (same pattern)
  const rightKPIs: KPI[] = [
    { label: 'Speed (LCP)', sub: 'p75', value: '2.6s', status: 'WARN' },
    { label: 'Critical errors (4xx/5xx)', value: '3', status: 'FIX' },
    { label: 'Readability / Answerability', value: '76/100', status: 'GOOD' },
  ];

  const middleRows = pending ? asPending(middleKPIs) : middleKPIs;
  const rightRows = pending ? asPending(rightKPIs) : rightKPIs;

  return (
    <div className="min-h-screen w-full bg-[#0b0b0d] text-white p-6 md:p-10">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl md:text-2xl font-semibold">Free scan highlights</h2>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs bg-neutral-900/60 border border-neutral-700/60 text-neutral-300"
            aria-label="7 of 27 checks available in free highlights"
          >
            7 of 27 checks
          </span>
        </div>
        <a className="text-emerald-400 hover:text-emerald-300 text-sm" href="#">View all 27 &gt;</a>
      </header>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: SEO Health donut card */}
        <Card className="flex items-center justify-center">
          <div className="flex items-center justify-center gap-6 min-h-[180px]">
            <Donut percent={78} size={140} strokeWidth={14} pending={pending} />
            <div className="space-y-2">
              <div className="text-sm uppercase tracking-wide text-neutral-300">SEO HEALTH (FREE)</div>
              <div className="text-neutral-200 text-base">Overall score</div>
              {pending ? (
                <div className="mt-2 inline-flex items-center gap-3 flex-wrap">
                  <Badge intent="PENDING" />
                  <span className="text-xs text-neutral-500">Enter a URL to run the free checks</span>
                </div>
              ) : (
                <div className="mt-2 inline-flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-xs bg-neutral-900/60 border border-neutral-700/60 text-neutral-300">Auto calculated from 7 checks</span>
                  <a href="#" className="text-emerald-400 text-xs hover:text-emerald-300">Unlock 20 more</a>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Middle KPI card */}
        <KPICard showFix={!pending && hasIssues(middleKPIs)} pending={pending}>
          {middleRows.map((k, i) => (
            <KpiRow key={i} label={k.label} sub={k.sub} value={k.value} status={k.status} />
          ))}
        </KPICard>

        {/* Right KPI card */}
        <KPICard showFix={!pending && hasIssues(rightKPIs)} pending={pending}>
          {rightRows.map((k, i) => (
            <KpiRow key={i} label={k.label} sub={k.sub} value={k.value} status={k.status} />
          ))}
        </KPICard>
      </div>
    </div>
  );
}

// =======================
// Primitives (match other SEO cards)
// =======================
function Card({ children, className = '' }: { children: ReactNode; className?: string }): JSX.Element {
  const base = 'bg-[#0f0f13] border border-neutral-800/70 rounded-2xl p-6';
  return <div className={(base + ' ' + className).trim()}>{children}</div>;
}

function KPICard({ children, className = '', showFix = false, pending = false }: { children: ReactNode; className?: string; showFix?: boolean; pending?: boolean }): JSX.Element {
  return (
    <Card className={("h-full " + className).trim()}>
      {/* Keep list clean: no per-row dividers, same as other section */}
      <div>{children}</div>
      <ActionBar showFix={showFix} pending={pending} />
    </Card>
  );
}

function KpiRow({ label, sub, value, status }: { label: string; sub?: string; value?: string; status?: IntentInput }): JSX.Element {
  const isPending = !value && (!status || normalizeIntent(status) === 'PENDING');
  const rightStatus: Intent = normalizeIntent(isPending ? 'PENDING' : (status ?? 'GOOD'));
  const showSub = !!sub && !label.toLowerCase().includes(String(sub).toLowerCase());

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-base md:text-[17px] text-neutral-200 truncate">{label}</p>
        {showSub ? <p className="text-xs text-neutral-500 mt-0.5">{sub}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-2xl md:text-3xl font-semibold tabular-nums">{isPending ? '—' : value}</div>
        <Badge intent={rightStatus} />
      </div>
    </div>
  );
}

function Badge({ intent }: { intent: IntentInput }): JSX.Element {
  const norm = normalizeIntent(intent);
  const styles: Record<Intent, string> = {
    GOOD: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
    WARN: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30',
    FIX: 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30',
    PENDING: 'bg-neutral-700/30 text-neutral-300 ring-1 ring-neutral-600/30',
  };
  return <span className={("px-2.5 py-1 text-[11px] rounded-full font-medium tracking-wide " + styles[norm]).trim()}>{norm}</span>;
}

function Button({ href = '#', children, disabled = false }: { href?: string; children: ReactNode; disabled?: boolean }): JSX.Element {
  return (
    <a
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      className={
        'inline-flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium shadow focus:outline-none focus:ring-2 ' +
        (disabled
          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed focus:ring-transparent'
          : 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-400 hover:to-indigo-400 focus:ring-violet-500/50')
      }
    >
      {children}
    </a>
  );
}

function ActionBar({ showFix, pending }: { showFix: boolean; pending?: boolean }): JSX.Element {
  return (
    <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800/80">
      {pending ? <Button disabled>Run scan</Button> : showFix ? <Button>Fix issues</Button> : <span />}
      <a
        href={pending ? undefined : '#'}
        aria-disabled={pending}
        className={
          'text-sm ' + (pending ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-400 hover:text-white')
        }
      >
        View details
      </a>
    </div>
  );
}

function Donut({ percent, size = 120, strokeWidth = 12, pending = false }: { percent?: number; size?: number; strokeWidth?: number; pending?: boolean }): JSX.Element {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dash = typeof percent === 'number' ? (percent / 100) * c : 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={'0 0 ' + size + ' ' + size}
        className="block"
        role="img"
        aria-labelledby="donutTitle"
        aria-describedby="donutDesc"
      >
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#232329" strokeWidth={strokeWidth} fill="none" />
        {/* Progress (only when not pending) */}
        {!pending && typeof percent === 'number' ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="url(#grad1)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={dash + ' ' + (c - dash)}
            strokeLinecap="round"
            transform={'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'}
          />
        ) : null}
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <title id="donutTitle">SEO Health score</title>
        <desc id="donutDesc">{pending ? 'Pending until a URL is scanned' : String(percent) + ' out of 100 based on 7 checks'}</desc>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-4xl font-bold tabular-nums">{pending ? '—' : percent}</div>
      </div>
    </div>
  );
}
