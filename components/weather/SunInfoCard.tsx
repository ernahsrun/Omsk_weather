// components/weather/SunInfoCard.tsx
import type { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

export function SunInfoCard({ weather }: Props) {
  const { sun } = weather;

  return (
    <section className="card sun-info-card">
      <div>Восход: {sun.sunrise}</div>
      <div>Закат: {sun.sunset}</div>
      <div>Световой день: {sun.dayLength}</div>
      {/* Here you can render small diagram later */}
    </section>
  );
}
