import { NextResponse } from "next/server";
import type { WeekWeatherData, DayForecast } from "@/types/weather";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY!;
const WEATHER_CITY = process.env.WEATHER_CITY ?? "Omsk";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

function formatRuDateLabel(ms: number) {
  return new Date(ms).toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export async function GET() {
  try {
    const url =
      `${FORECAST_API_URL}?q=${encodeURIComponent(WEATHER_CITY)}` +
      `&appid=${WEATHER_API_KEY}&units=metric&lang=ru`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Forecast API error");
    }

    const raw = await res.json();

    const tzOffsetSec: number = raw.city?.timezone ?? 0;
    const tzOffsetMs = tzOffsetSec * 1000;

    // группируем по датам
    const byDate = new Map<
      string,
      { min: number; max: number; desc: string; labelMs: number }
    >();

    for (const item of raw.list ?? []) {
      const dtSec: number | undefined = item.dt;
      const temp: number | undefined = item.main?.temp;
      const desc: string | undefined = item.weather?.[0]?.description;

      if (typeof dtSec !== "number" || typeof temp !== "number") continue;

      const localMs = dtSec * 1000 + tzOffsetMs;
      const localDate = new Date(localMs);

      const key = localDate.toISOString().slice(0, 10); // "YYYY-MM-DD"

      const prev = byDate.get(key);
      if (!prev) {
        byDate.set(key, {
          min: temp,
          max: temp,
          desc: desc ?? "",
          labelMs: localMs,
        });
      } else {
        prev.min = Math.min(prev.min, temp);
        prev.max = Math.max(prev.max, temp);
        // описание можно просто перезаписывать или оставлять первое
        if (desc) prev.desc = desc;
        // labelMs можно оставить как есть
      }
    }

    // сортируем даты и берём первые 7
    const sortedKeys = Array.from(byDate.keys()).sort();
    const days: DayForecast[] = sortedKeys.slice(0, 7).map((key) => {
      const bucket = byDate.get(key)!;
      return {
        date: formatRuDateLabel(bucket.labelMs), // уже человекочитаемая строка
        minTemp: Math.round(bucket.min),
        maxTemp: Math.round(bucket.max),
        description: bucket.desc,
      };
    });

    const data: WeekWeatherData = {
      city: raw.city?.name ?? WEATHER_CITY,
      days,
    };

    return NextResponse.json(data);
  } catch (e) {
    console.error("Weather week API failed:", e);
    return NextResponse.json(
      { error: "Failed to load week weather" },
      { status: 500 }
    );
  }
}
