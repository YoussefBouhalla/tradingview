"use client";

import { useMoroccoTime } from "@/hooks/useMoroccoTime";
import { MOROCCO_TIME_ZONE } from "@/lib/session";

export function MoroccoClock() {
  const clock = useMoroccoTime();

  return (
    <section
      aria-label="Current Morocco time"
      className="rounded-xl border border-zinc-800 bg-zinc-950/80 px-5 py-4"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
        Morocco Time
      </p>
      <p className="mt-2 font-mono text-3xl font-semibold tabular-nums tracking-tight text-zinc-50 sm:text-4xl">
        {clock?.parts.clock ?? "--:--:--"}
      </p>
      <p className="mt-2 text-sm text-zinc-400">
        {clock ? `${clock.parts.dateLabel} · ${MOROCCO_TIME_ZONE}` : MOROCCO_TIME_ZONE}
      </p>
    </section>
  );
}
