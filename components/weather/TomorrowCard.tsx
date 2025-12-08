import type { TomorrowWeather } from "@/types/weather";

interface Props {
  weather: TomorrowWeather;
}

export function TomorrowCard({ weather }: Props) {
  return (
    <div className="tomorrow-card">
      <div className="tomorrow-card__title">завтра — {weather.city}</div>
      <div className="tomorrow-card__date">{weather.date}</div>
      <div className="tomorrow-card__temps">
        <span>min {Math.round(weather.minTemp)}°C</span>
        <span>max {Math.round(weather.maxTemp)}°C</span>
      </div>
      <div className="tomorrow-card__desc">{weather.description}</div>
    </div>
  );
}
