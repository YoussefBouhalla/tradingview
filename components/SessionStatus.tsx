"use client";

import { useMoroccoTime } from "@/hooks/useMoroccoTime";
import { ANALYSIS_WINDOW_LABEL } from "@/lib/session";

export function SessionStatus() {
  const clock = useMoroccoTime();
  const active = clock?.sessionActive ?? false;

  return (
    <section
      aria-label="Preferred analysis session status"
      className="rounded-xl border border-zinc-800 bg-zinc-950/80 px-5 py-4"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
        Analysis window
      </p>
      <p
        className={`mt-2 text-3xl font-semibold tracking-tight sm:text-4xl ${
          active ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {clock ? (active ? "SESSION ACTIVE" : "SESSION CLOSED") : "SESSION —"}
      </p>
      <p className="mt-2 text-sm text-zinc-400">
        {ANALYSIS_WINDOW_LABEL}. Informational only — charts load at all times.
      </p>
    </section>
  );
}
