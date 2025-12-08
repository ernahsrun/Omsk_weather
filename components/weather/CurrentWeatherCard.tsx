import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function CurrentWeatherCard({ weather }: Props) {
  return (
    <div className="current-card">
      <div className="current-card__label">Сейчас</div>
      <div className="current-card__temp">
        {Math.round(weather.temperature)}°C
      </div>
      <div className="current-card__desc">{weather.description}</div>
      <div className="current-card__city">{weather.city}</div>
    </div>
  );
}
