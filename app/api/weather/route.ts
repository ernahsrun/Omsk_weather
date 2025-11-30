// app/api/weather/route.ts
import { NextResponse } from "next/server";
// import type { WeatherData } from "@/types/weather";

const CITY = process.env.WEATHER_CITY ?? "Moscow";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY!;
const WEATHER_API_URL = process.env.WEATHER_API_URL!;
// Например, https://api.openweathermap.org/data/2.5/weather

export async function GET() {
  // Here you call real external weather API
  const url = `${WEATHER_API_URL}?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Weather API error");
    }

    const raw = await res.json();

    // Map external API to internal WeatherData shape
    const data /*: WeatherData*/ = {
      city: raw.name,
      temperature: Math.round(raw.main.temp),
      description: raw.weather[0]?.description ?? "",
      segments: {
        morning: "ясно",
        day: "переменная облачность",
        evening: "пасмурно",
        night: "ясно",
      },
      sun: {
        sunrise: new Date(raw.sys.sunrise * 1000).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sunset: new Date(raw.sys.sunset * 1000).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        dayLength: "11 ч 23 мин",
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load weather" },
      { status: 500 },
    );
  }
}
