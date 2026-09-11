export const MOROCCO_TIME_ZONE = "Africa/Casablanca";

/** Inclusive start of the preferred analysis window, as minutes from midnight. */
export const ANALYSIS_WINDOW_START_MINUTES = 13 * 60;

/** Exclusive end of the preferred analysis window, as minutes from midnight. */
export const ANALYSIS_WINDOW_END_MINUTES = 16 * 60;

export const ANALYSIS_WINDOW_LABEL = "13:00–16:00 Africa/Casablanca";

export type MoroccoTimeParts = {
  hour: number;
  minute: number;
  second: number;
  weekday: string;
  day: string;
  month: string;
  year: string;
  clock: string;
  dateLabel: string;
};

function readPart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
): string {
  return parts.find((part) => part.type === type)?.value ?? "";
}

export function getMoroccoTimeParts(date: Date = new Date()): MoroccoTimeParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: MOROCCO_TIME_ZONE,
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = Number.parseInt(readPart(parts, "hour"), 10);
  const minute = Number.parseInt(readPart(parts, "minute"), 10);
  const second = Number.parseInt(readPart(parts, "second"), 10);
  const clock = `${readPart(parts, "hour")}:${readPart(parts, "minute")}:${readPart(parts, "second")}`;
  const dateLabel = `${readPart(parts, "weekday")}, ${readPart(parts, "day")} ${readPart(parts, "month")} ${readPart(parts, "year")}`;

  return {
    hour,
    minute,
    second,
    weekday: readPart(parts, "weekday"),
    day: readPart(parts, "day"),
    month: readPart(parts, "month"),
    year: readPart(parts, "year"),
    clock,
    dateLabel,
  };
}

export function isAnalysisSessionActive(date: Date = new Date()): boolean {
  const { hour, minute } = getMoroccoTimeParts(date);
  const minutesFromMidnight = hour * 60 + minute;
  return (
    minutesFromMidnight >= ANALYSIS_WINDOW_START_MINUTES &&
    minutesFromMidnight < ANALYSIS_WINDOW_END_MINUTES
  );
}
