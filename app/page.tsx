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
      <div className="flex justify-center">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 text-sm text-neutral-200">
          Не удалось загрузить погоду
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
          <CurrentWeatherCard weather={weather} />
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
          <SunInfoCard weather={weather} />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
        <DaySegmentsCard weather={weather} />
      </div>
    </div>
  );
}
