export function formatDate(
  date: Date,
  format: "short" | "full" = "short"
): string {
  if (format === "full") {
    return date.toLocaleDateString("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function convertPressure(hPa: number): number {
  return Math.round(hPa * 0.750062);
}

export function getTimeOfDay(hour: number): string {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "day";
  if (hour >= 18 && hour < 24) return "evening";
  return "night";
}

export function getTimeOfDayLabel(period: string): string {
  switch (period) {
    case "morning":
      return "Утро";
    case "day":
      return "День";
    case "evening":
      return "Вечер";
    case "night":
      return "Ночь";
    default:
      return period;
  }
}
