"use client";

import { useEffect, useState } from "react";
import {
  getMoroccoTimeParts,
  isAnalysisSessionActive,
  type MoroccoTimeParts,
} from "@/lib/session";

export type MoroccoClockState = {
  parts: MoroccoTimeParts;
  sessionActive: boolean;
};

export function useMoroccoTime(): MoroccoClockState | null {
  const [state, setState] = useState<MoroccoClockState | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setState({
        parts: getMoroccoTimeParts(now),
        sessionActive: isAnalysisSessionActive(now),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
