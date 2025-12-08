// app/api/weather/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";
import type { WeatherData, DaySegmentKey } from "@/types/weather";

// Interfaces for OpenWeather responses (minimal, no "any")
interface OpenWeatherCurrentMain {
  temp?: number;
}

interface OpenWeatherCurrentWeather {
  description?: string;
}

interface OpenWeatherCurrentSys {
  sunrise?: number;
  sunset?: number;
}

interface OpenWeatherCurrentResponse {
  name?: string;
  main?: OpenWeatherCurrentMain;
  weather?: OpenWeatherCurrentWeather[];
  sys?: OpenWeatherCurrentSys;
}

interface OpenWeatherForecastMain {
  temp?: number;
}

interface OpenWeatherForecastWeather {
  description?: string;
}

interface OpenWeatherForecastItem {
  dt?: number;
  main?: OpenWeatherForecastMain;
  weather?: OpenWeatherForecastWeather[];
}

interface OpenWeatherForecastCity {
  timezone?: number;
}

interface OpenWeatherForecastResponse {
  city?: OpenWeatherForecastCity;
  list?: OpenWeatherForecastItem[];
}

const WEATHER_API_URL = process.env.WEATHER_API_URL!;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY!;
const WEATHER_CITY = process.env.WEATHER_CITY ?? "Omsk";

const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

type SegmentTemps = WeatherData["segmentTemps"];

function emptySegmentTemps(): SegmentTemps {
  return {
    morning: null,
    day: null,
    evening: null,
    night: null,
  };
}

function getSegmentByHour(hour: number): DaySegmentKey {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "day";
  if (hour >= 18 && hour < 24) return "evening";
  return "night";
}

export async function GET() {
  const currentUrl =
    `${WEATHER_API_URL}?q=${encodeURIComponent(WEATHER_CITY)}` +
    `&appid=${WEATHER_API_KEY}&units=metric&lang=ru`;

  try {
    // Fetch current weather
    const currentRes = await fetch(currentUrl, { cache: "no-store" });

    if (!currentRes.ok) {
      throw new Error("Weather API error (current)");
    }

    const currentRaw = (await currentRes.json()) as OpenWeatherCurrentResponse;

    // Prepare segment temperatures
    const segmentTemps: SegmentTemps = emptySegmentTemps();

    try {
      const forecastUrl =
        `${FORECAST_API_URL}?q=${encodeURIComponent(WEATHER_CITY)}` +
        `&appid=${WEATHER_API_KEY}&units=metric&lang=ru`;

      const forecastRes = await fetch(forecastUrl, { cache: "no-store" });

      if (forecastRes.ok) {
        const forecastRaw =
          (await forecastRes.json()) as OpenWeatherForecastResponse;

        const tzOffsetSec: number = forecastRaw.city?.timezone ?? 0;
        const tzOffsetMs = tzOffsetSec * 1000;

        const filled: Record<DaySegmentKey, boolean> = {
          morning: false,
          day: false,
          evening: false,
          night: false,
        };

        for (const item of forecastRaw.list ?? []) {
          const dtSec = item.dt;
          const temp = item.main?.temp;
          if (typeof dtSec !== "number" || typeof temp !== "number") {
            continue;
          }

          const local = new Date(dtSec * 1000 + tzOffsetMs);
          const hour = local.getUTCHours();

          const seg = getSegmentByHour(hour);
          if (!filled[seg]) {
            segmentTemps[seg] = temp;
            filled[seg] = true;
          }

          if (filled.morning && filled.day && filled.evening && filled.night) {
            break;
          }
        }
      } else {
        console.error(
          "Forecast error",
          forecastRes.status,
          await forecastRes.text()
        );
      }
    } catch (err) {
      console.error("Forecast request failed:", err);
    }

    // Sun info
    const sunriseTs = currentRaw.sys?.sunrise
      ? currentRaw.sys.sunrise * 1000
      : undefined;
    const sunsetTs = currentRaw.sys?.sunset
      ? currentRaw.sys.sunset * 1000
      : undefined;

    const sunriseStr =
      sunriseTs !== undefined
        ? new Date(sunriseTs).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-";

    const sunsetStr =
      sunsetTs !== undefined
        ? new Date(sunsetTs).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-";

    let dayLengthStr = "-";
    if (sunriseTs !== undefined && sunsetTs !== undefined) {
      const diffMs = sunsetTs - sunriseTs;
      const totalMinutes = Math.round(diffMs / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      dayLengthStr = `${hours} ч ${minutes} мин`;
    }

    const data: WeatherData = {
      city: currentRaw.name ?? WEATHER_CITY,
      temperature: Math.round(currentRaw.main?.temp ?? 0),
      description: currentRaw.weather?.[0]?.description ?? "",
      segmentTemps,
      sun: {
        sunrise: sunriseStr,
        sunset: sunsetStr,
        dayLength: dayLengthStr,
      },
    };

    // Log to Supabase (can be commented out if not needed)
    await supabaseServer.from("weather_views").insert({
      city: data.city,
      temperature: data.temperature,
      description: data.description,
    });

    return NextResponse.json(data);
  } catch (e) {
    console.error("Weather API failed:", e);
    return NextResponse.json(
      { error: "Failed to load weather" },
      { status: 500 }
    );
  }
}

