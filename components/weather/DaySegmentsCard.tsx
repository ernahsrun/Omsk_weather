import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

function formatTemp(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "–";
  }
  return `${Math.round(value)}°C`;
}

export function DaySegmentsCard({ weather }: Props) {
  // Fallback, если segmentTemps вдруг не пришёл
  const t = weather.segmentTemps ?? {
    morning: null,
    day: null,
    evening: null,
    night: null,
  };

  return (
    <div className="daysegments">
      <div className="daysegments__row">
        <span className="daysegments__label">утро</span>
        <span className="daysegments__value">{formatTemp(t.morning)}</span>
      </div>
      <div className="daysegments__row">
        <span className="daysegments__label">день</span>
        <span className="daysegments__value">{formatTemp(t.day)}</span>
      </div>
      <div className="daysegments__row">
        <span className="daysegments__label">вечер</span>
        <span className="daysegments__value">{formatTemp(t.evening)}</span>
      </div>
      <div className="daysegments__row">
        <span className="daysegments__label">ночь</span>
        <span className="daysegments__value">{formatTemp(t.night)}</span>
      </div>
    </div>
  );
}
