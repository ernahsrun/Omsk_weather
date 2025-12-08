// app/tomorrow/page.tsx
import type { WeatherData } from "@/types/weather";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { DaySegmentsCard } from "@/components/weather/DaySegmentsCard";
import { SunInfoCard } from "@/components/weather/SunInfoCard";

async function getWeatherTomorrow(): Promise<WeatherData> {
  // пока берём те же данные, что и для "сегодня" — важна именно структура
  const res = await fetch("http://localhost:3000/api/weather", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}

export default async function TomorrowPage() {
  let weather: WeatherData | null = null;

  try {
    weather = await getWeatherTomorrow();
  } catch {
    weather = null;
  }

  if (!weather) {
    return (
      <div className="screen">
        <h1 className="page-title">Прогноз на завтра</h1>
        <div>Не удалось загрузить погоду на завтра</div>
      </div>
    );
  }

  return (
    <div className="screen">
      <h1 className="page-title">Прогноз на завтра</h1>

      <div className="weather-grid">
        {/* Левая колонка: сейчас/температура */}
        <div className="card card-now">
          <CurrentWeatherCard weather={weather} />
        </div>

        {/* Левая колонка: световой день (ВОСХОД/ЗАКАТ/ДЛИТЕЛЬНОСТЬ) */}
        <div className="card card-sun">
          <SunInfoCard weather={weather} />
        </div>

        {/* Правая колонка: утро/день/вечер/ночь */}
        <div className="card card-dayparts">
          <DaySegmentsCard weather={weather} />
        </div>
      </div>
    </div>
  );
}
