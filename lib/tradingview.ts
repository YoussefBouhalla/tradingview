import { MOROCCO_TIME_ZONE } from "@/lib/session";

/**
 * TradingView Advanced Chart (official free embed widget)
 *
 * Loader (documented React embed):
 * https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/demos/technical-analysis
 * Script: https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js
 *
 * Study identifiers come from TradingView's own widget examples and the published
 * widget study ID list used by the Advanced Chart embed:
 * - Exponential Moving Average: MAExp@tv-basicstudies
 * - Relative Strength Index:    RSI@tv-basicstudies
 * Official demo uses the same `@tv-basicstudies` suffix (e.g. MASimple@tv-basicstudies, RSI@tv-basicstudies).
 *
 * Study inputs:
 * The official embed script forwards a `studies` array and `studies_overrides`
 * into the widget iframe (both are in the widget's allowed property list).
 * Per-instance lengths are configured with the documented widget constructor
 * object form `{ id, version, inputs: { length } }` — not by relabeling defaults.
 *
 * If a loaded chart legend does not show the requested EMA length, UI labels
 * must be changed to match the actual indicator. Do not claim EMA 50/200 unless
 * the widget actually applied those inputs.
 */
export const TRADINGVIEW_WIDGET_SCRIPT =
  "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

export const TRADINGVIEW_SUPPORT_HOST = "https://www.tradingview.com";

/** Official TradingView FX pair used by TradingView's own forex widget demos. */
export const EURUSD_SYMBOL = "FX:EURUSD";

export const EMA_STUDY_ID = "MAExp@tv-basicstudies";
export const RSI_STUDY_ID = "RSI@tv-basicstudies";

export type TradingViewInterval = "5" | "15" | "60";
export type WidgetStatus = "loading" | "live" | "error";

export type TradingViewStudy =
  | string
  | {
      id: string;
      version?: number;
      inputs?: Record<string, string | number | boolean>;
    };

export type ChartDefinition = {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  timeframeLabel: string;
  interval: TradingViewInterval;
  intervalName: "H1" | "M15" | "M5";
  studies: TradingViewStudy[];
  indicatorLabels: string[];
  context: string;
  chartHeightClass: string;
};

/**
 * EMA / RSI study objects.
 *
 * `version: 60` is the study schema version used by TradingView's widget
 * constructor when passing `inputs.length` for MAExp / RSI.
 */
export function emaStudy(length: number): TradingViewStudy {
  return {
    id: EMA_STUDY_ID,
    version: 60,
    inputs: { length },
  };
}

export function rsiStudy(length: number): TradingViewStudy {
  return {
    id: RSI_STUDY_ID,
    version: 60,
    inputs: { length },
  };
}

export const CHARTS: ChartDefinition[] = [
  {
    id: "h1",
    kicker: "H1 — Trend",
    title: "H1 — EUR/USD — EMA 50 / EMA 200",
    subtitle: "Determine the primary EUR/USD market direction.",
    timeframeLabel: "1 hour / 60 minutes",
    interval: "60",
    intervalName: "H1",
    studies: [emaStudy(50), emaStudy(200)],
    indicatorLabels: ["EMA 50", "EMA 200"],
    context:
      "Observe price relative to EMA 50 and EMA 200, and whether EMA 50 is above or below EMA 200. This page does not generate buy or sell signals.",
    chartHeightClass: "h-[560px] sm:h-[640px] lg:h-[760px] xl:h-[800px]",
  },
  {
    id: "m15",
    kicker: "M15 — Pullback",
    title: "M15 — EUR/USD — EMA 20 / EMA 50",
    subtitle: "Look for pullbacks into important trend areas.",
    timeframeLabel: "15 minutes",
    interval: "15",
    intervalName: "M15",
    studies: [emaStudy(20), emaStudy(50)],
    indicatorLabels: ["EMA 20", "EMA 50"],
    context:
      "Observe pullbacks toward EMA 20, EMA 50, and nearby support or resistance. This page does not generate buy or sell signals.",
    chartHeightClass: "h-[560px] sm:h-[640px] lg:h-[760px] xl:h-[800px]",
  },
  {
    id: "m5",
    kicker: "M5 — Entry Confirmation",
    title: "M5 — EUR/USD — EMA 20 / RSI 14",
    subtitle: "Wait for confirmation before considering an entry.",
    timeframeLabel: "5 minutes",
    interval: "5",
    intervalName: "M5",
    studies: [emaStudy(20), rsiStudy(14)],
    indicatorLabels: ["EMA 20", "RSI 14"],
    context:
      "Observe price relative to EMA 20, candle structure, and RSI relative to 50 in the pane below price. This page does not generate buy or sell signals.",
    chartHeightClass: "h-[620px] sm:h-[700px] lg:h-[820px] xl:h-[850px]",
  },
];

export type AdvancedChartConfig = {
  autosize: boolean;
  symbol: string;
  interval: TradingViewInterval;
  timezone: string;
  theme: "dark";
  style: "1";
  locale: "en";
  backgroundColor: string;
  gridColor: string;
  hide_top_toolbar: boolean;
  hide_side_toolbar: boolean;
  hide_legend: boolean;
  hide_volume: boolean;
  allow_symbol_change: boolean;
  save_image: boolean;
  withdateranges: boolean;
  studies: TradingViewStudy[];
  disabled_features: string[];
  support_host: string;
  container_id: string;
};

export function buildAdvancedChartConfig(
  chart: ChartDefinition,
): AdvancedChartConfig {
  return {
    autosize: true,
    symbol: EURUSD_SYMBOL,
    interval: chart.interval,
    timezone: MOROCCO_TIME_ZONE,
    theme: "dark",
    style: "1",
    locale: "en",
    backgroundColor: "rgba(11, 15, 20, 1)",
    gridColor: "rgba(36, 48, 64, 1)",
    hide_top_toolbar: false,
    hide_side_toolbar: true,
    hide_legend: false,
    hide_volume: true,
    allow_symbol_change: false,
    save_image: false,
    withdateranges: true,
    studies: chart.studies,
    disabled_features: [
      "use_localstorage_for_settings",
      "save_chart_properties_to_local_storage",
      "header_symbol_search",
      "create_volume_indicator_by_default",
    ],
    support_host: TRADINGVIEW_SUPPORT_HOST,
    container_id: `tv-chart-${chart.id}`,
  };
}
