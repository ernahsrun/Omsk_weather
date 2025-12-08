import type { WeekWeatherData } from "@/types/weather";
import { WeekForecastCard } from "@/components/weather/WeekForecastCard";

async function getWeekWeather(): Promise<WeekWeatherData> {
  const res = await fetch("http://localhost:3000/api/weather-week", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch week weather");
  }

  return res.json();
}

export default async function WeekPage() {
  let data: WeekWeatherData | null = null;

  try {
    data = await getWeekWeather();
  } catch {
    data = null;
  }

  if (!data) {
    return <div>Не удалось загрузить прогноз на неделю</div>;
  }

  return (
    <div>
      <WeekForecastCard data={data} />
    </div>
  );
}
