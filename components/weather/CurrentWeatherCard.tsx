// components/weather/CurrentWeatherCard.tsx
import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function CurrentWeatherCard({ weather }: Props) {
  return (
    <section className="card current-weather-card">
      <div className="card-title">Сейчас</div>
      <div className="current-temp">{weather.temperature} °C</div>
      <div className="current-desc">{weather.description}</div>
    </section>
  );
}
