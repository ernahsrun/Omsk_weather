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
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center justify-between text-lg">
        <span className="text-neutral-400">утро</span>
        <span className="font-medium text-neutral-50">
          {formatTemp(t.morning)}
        </span>
      </div>
      <div className="flex items-center justify-between text-lg">
        <span className="text-neutral-400">день</span>
        <span className="font-medium text-neutral-50">{formatTemp(t.day)}</span>
      </div>
      <div className="flex items-center justify-between text-lg">
        <span className="text-neutral-400">вечер</span>
        <span className="font-medium text-neutral-50">
          {formatTemp(t.evening)}
        </span>
      </div>
      <div className="flex items-center justify-between text-lg">
        <span className="text-neutral-400">ночь</span>
        <span className="font-medium text-neutral-50">
          {formatTemp(t.night)}
        </span>
      </div>
    </div>
  );
}
