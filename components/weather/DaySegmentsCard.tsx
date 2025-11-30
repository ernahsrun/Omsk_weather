// components/weather/DaySegmentsCard.tsx
import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function DaySegmentsCard({ weather }: Props) {
  const { segments } = weather;

  return (
    <section className="card day-segments-card">
      <div className="segment-row">
        <span>утро</span>
        <span>{segments.morning}</span>
      </div>
      <div className="segment-row">
        <span>день</span>
        <span>{segments.day}</span>
      </div>
      <div className="segment-row">
        <span>вечер</span>
        <span>{segments.evening}</span>
      </div>
      <div className="segment-row">
        <span>ночь</span>
        <span>{segments.night}</span>
      </div>
    </section>
  );
}
