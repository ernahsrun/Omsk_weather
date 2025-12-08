import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function SunInfoCard({ weather }: Props) {
  // Fallback для случая, когда sun вдруг нет
  const sun = weather.sun ?? {
    sunrise: "-",
    sunset: "-",
    dayLength: "-",
  };

  return (
    <div className="sun-card">
      <div className="sun-card__title">световой день</div>
      <div className="sun-card__rows">
        <div className="sun-card__row">
          <span className="sun-card__row-label">Восход</span>
          <span className="sun-card__row-value">{sun.sunrise}</span>
        </div>
        <div className="sun-card__row">
          <span className="sun-card__row-label">Закат</span>
          <span className="sun-card__row-value">{sun.sunset}</span>
        </div>
        <div className="sun-card__row">
          <span className="sun-card__row-label">Длительность</span>
          <span className="sun-card__row-value">{sun.dayLength}</span>
        </div>
      </div>
    </div>
  );
}
