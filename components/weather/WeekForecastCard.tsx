import type { WeekWeatherData } from "@/types/weather";

interface Props {
  data: WeekWeatherData;
}

export function WeekForecastCard({ data }: Props) {
  return (
    <div className="card card-week">
      <div className="week-title">
        Прогноз на неделю — {data.city}
      </div>

      <div className="week-list">
        {data.days.map((day) => (
          <div key={day.date} className="week-item">
            <div className="week-item-date">{day.date}</div>
            <div className="week-item-temps">
              <span>мин {day.minTemp}°C</span>
              <span>макс {day.maxTemp}°C</span>
            </div>
            <div className="week-item-desc">{day.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
