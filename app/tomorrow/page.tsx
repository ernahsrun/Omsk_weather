// app/tomorrow/page.tsx
import type { WeatherData } from "@/types/weather";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { DaySegmentsCard } from "@/components/weather/DaySegmentsCard";
import { SunInfoCard } from "@/components/weather/SunInfoCard";

async function getTomorrowWeather(): Promise<WeatherData> {
  const res = await fetch("http://localhost:3000/api/weather-tomorrow", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weather for tomorrow");
  }

  return res.json();
}

export default async function TomorrowPage() {
  let weather: WeatherData | null = null;

  try {
    weather = await getTomorrowWeather();
  } catch {
    weather = null;
  }

  if (!weather) {
    return <div>Не удалось загрузить погоду на завтра</div>;
  }

  return (
    <div className="screen">
      <h1 className="page-title">Прогноз на завтра</h1>

      <div className="weather-grid">
        <div className="card card-now">
          <CurrentWeatherCard weather={weather} />
        </div>
        <div className="card card-sun">
          <SunInfoCard weather={weather} />
        </div>
        <div className="card card-dayparts">
          <DaySegmentsCard weather={weather} />
        </div>
      </div>
    </div>
  );
}
