import { MoroccoClock } from "@/components/MoroccoClock";
import { SessionStatus } from "@/components/SessionStatus";

export function DashboardHeader() {
  return (
    <header className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          EUR/USD Trading Dashboard
        </h1>
        <p className="max-w-3xl text-base text-zinc-400">
          Public TradingView Advanced Chart widgets for EUR/USD. No login, broker
          account, or database is required. Charts are for visual analysis only —
          this page does not generate buy or sell signals.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <MoroccoClock />
        <SessionStatus />
      </div>
    </header>
  );
}
