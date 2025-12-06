import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

function formatTemp(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return "–";
  }
  return `${Math.round(value)}°C`;
}

export function DaySegmentsCard({ weather }: Props) {
  const t = weather.segmentTemps;

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
