import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function CurrentWeatherCard({ weather }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wide text-neutral-400">
        сейчас
      </div>
      <div className="text-5xl font-semibold tracking-tight">
        {Math.round(weather.temperature)}°C
      </div>
      <div className="text-sm text-neutral-200">{weather.description}</div>
      <div className="text-xs text-neutral-500">{weather.city}</div>
    </div>
  );
}
