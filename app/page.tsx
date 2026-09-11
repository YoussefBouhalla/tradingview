import { DashboardHeader } from "@/components/DashboardHeader";
import { ChartSection } from "@/components/ChartSection";
import { CHARTS } from "@/lib/tradingview";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1680px] px-3 py-5 sm:px-4 lg:px-6 lg:py-6">
      <DashboardHeader />
      <div className="mt-6 flex flex-col gap-6 lg:gap-8">
        {CHARTS.map((chart) => (
          <ChartSection key={chart.id} chart={chart} />
        ))}
      </div>
    </main>
  );
}
