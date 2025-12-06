import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function SunInfoCard({ weather }: Props) {
  const sun = weather.sun;

  return (
    <div className="sun-card">
      <div className="sun-card__label">световой день</div>

      <div className="sun-card__list">
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
