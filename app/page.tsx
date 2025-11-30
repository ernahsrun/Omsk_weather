// app/page.tsx
import { fetchWeather } from "../lib/weatherApi";
import { CurrentWeatherCard } from "../components/weather/CurrentWeatherCard";
import { DaySegmentsCard } from "../components/weather/DaySegmentsCard";
import { SunInfoCard } from "../components/weather/SunInfoCard";

export default async function HomePage() {
  const weather = await fetchWeather();

  return (
    <div className="weather-layout">
      <div className="left-column">
        <CurrentWeatherCard weather={weather} />
        <SunInfoCard weather={weather} />
      </div>

      <div className="right-column">
        <DaySegmentsCard weather={weather} />
      </div>
    </div>
  );
}
