import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function SunInfoCard({ weather }: Props) {
  const sun = weather.sun;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-neutral-400">
        световой день
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Восход</span>
          <span className="text-neutral-100">{sun.sunrise}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Закат</span>
          <span className="text-neutral-100">{sun.sunset}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Длительность</span>
          <span className="text-neutral-100">{sun.dayLength}</span>
        </div>
      </div>
    </div>
  );
}
