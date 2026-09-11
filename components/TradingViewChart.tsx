"use client";

import { memo, useEffect, useRef } from "react";
import {
  buildAdvancedChartConfig,
  TRADINGVIEW_WIDGET_SCRIPT,
  type ChartDefinition,
  type WidgetStatus,
} from "@/lib/tradingview";

type TradingViewChartProps = {
  chart: ChartDefinition;
  onStatusChange?: (status: WidgetStatus) => void;
};

const LOAD_TIMEOUT_MS = 20000;

function TradingViewChartComponent({
  chart,
  onStatusChange,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef(onStatusChange);
  const configJson = JSON.stringify(buildAdvancedChartConfig(chart));

  useEffect(() => {
    statusRef.current = onStatusChange;
  }, [onStatusChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let timeoutId: number | undefined;

    const report = (status: WidgetStatus) => {
      if (!cancelled) statusRef.current?.(status);
    };

    const init = () => {
      if (cancelled || !containerRef.current) return;

      report("loading");
      container.replaceChildren();

      const widgetHost = document.createElement("div");
      widgetHost.className = "tradingview-widget-container__widget";
      widgetHost.style.height = "calc(100% - 32px)";
      widgetHost.style.width = "100%";

      const copyright = document.createElement("div");
      copyright.className = "tradingview-widget-copyright";
      copyright.innerHTML = `<a href="https://www.tradingview.com/symbols/EURUSD/?exchange=FX" rel="noopener nofollow" target="_blank"><span class="blue-text">EURUSD chart</span></a><span class="trademark"> by TradingView</span>`;

      const script = document.createElement("script");
      script.src = TRADINGVIEW_WIDGET_SCRIPT;
      script.type = "text/javascript";
      script.async = true;
      script.text = configJson;
      script.onerror = () => report("error");

      container.append(widgetHost, copyright, script);

      observer = new MutationObserver(() => {
        if (container.querySelector("iframe")) {
          report("live");
          observer?.disconnect();
          observer = null;
          if (timeoutId !== undefined) window.clearTimeout(timeoutId);
        }
      });
      observer.observe(container, { childList: true, subtree: true });

      timeoutId = window.setTimeout(() => {
        if (!container.querySelector("iframe")) report("error");
      }, LOAD_TIMEOUT_MS);
    };

    // Defer so React Strict Mode's immediate unmount cancels the first init
    // instead of appending two TradingView scripts.
    const initId = window.setTimeout(init, 0);

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      window.clearTimeout(initId);
      container.replaceChildren();
    };
  }, [configJson]);

  return (
    <div className="h-full w-full">
      <div
        className="tradingview-widget-container h-full w-full"
        ref={containerRef}
      />
    </div>
  );
}

export const TradingViewChart = memo(TradingViewChartComponent);
