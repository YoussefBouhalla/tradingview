"use client";

import { useState } from "react";
import { ChartErrorBoundary } from "@/components/ChartErrorBoundary";
import { TradingViewChart } from "@/components/TradingViewChart";
import { EURUSD_SYMBOL, type ChartDefinition, type WidgetStatus } from "@/lib/tradingview";

function statusLabel(status: WidgetStatus): string {
  if (status === "live") return "LIVE";
  if (status === "error") return "UNAVAILABLE";
  return "LOADING";
}

export function ChartSection({ chart }: { chart: ChartDefinition }) {
  const [status, setStatus] = useState<WidgetStatus>("loading");

  return (
    <section
      aria-labelledby={`${chart.id}-title`}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-4 lg:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/90">
        {chart.kicker}
      </p>
      <h2
        id={`${chart.id}-title`}
        className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl"
      >
        {chart.title}
      </h2>
      <p className="mt-2 max-w-3xl text-base text-zinc-300">{chart.subtitle}</p>
      <p className="mt-1 text-sm text-zinc-400">Timeframe: {chart.timeframeLabel}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200">
        <span>{EURUSD_SYMBOL.replace("FX:", "")}</span>
        <span className="text-zinc-600">|</span>
        <span>{chart.intervalName}</span>
        {chart.indicatorLabels.map((label) => (
          <span key={label} className="contents">
            <span className="text-zinc-600">|</span>
            <span>{label}</span>
          </span>
        ))}
        <span className="text-zinc-600">|</span>
        <span
          className={
            status === "live"
              ? "text-emerald-400"
              : status === "error"
                ? "text-red-400"
                : "text-amber-300"
          }
        >
          {statusLabel(status)}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{chart.context}</p>

      <div
        className={`relative mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-black ${chart.chartHeightClass}`}
      >
        {status === "error" ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950 px-6 text-center">
            <p className="text-base text-zinc-200">
              Unable to load {chart.intervalName} TradingView chart.
              <br />
              Refresh the page and try again.
            </p>
          </div>
        ) : null}
        <ChartErrorBoundary name={chart.intervalName}>
          <TradingViewChart chart={chart} onStatusChange={setStatus} />
        </ChartErrorBoundary>
      </div>
    </section>
  );
}
