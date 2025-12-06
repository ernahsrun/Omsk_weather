import type { WeatherData } from "@/types/weather";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { DaySegmentsCard } from "@/components/weather/DaySegmentsCard";
import { SunInfoCard } from "@/components/weather/SunInfoCard";

async function getWeather(): Promise<WeatherData> {
  const res = await fetch("http://localhost:3000/api/weather", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}

export default async function HomePage() {
  let weather: WeatherData | null = null;

  try {
    weather = await getWeather();
  } catch {
    weather = null;
  }

  if (!weather) {
    return (
      <div className="centered-row">
        <div className="error-banner">Не удалось загрузить погоду</div>
      </div>
    );
  }

  return (
    <div className="weather-layout">
      <div className="weather-layout__left">
        <div className="card">
          <CurrentWeatherCard weather={weather} />
        </div>

        <div className="card">
          <SunInfoCard weather={weather} />
        </div>
      </div>

      <div className="card card--stretch">
        <DaySegmentsCard weather={weather} />
      </div>
    </div>
  );
}
