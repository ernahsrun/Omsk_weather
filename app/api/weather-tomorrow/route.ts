// app/api/weather-tomorrow/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";
import type { WeatherData, DaySegmentKey } from "@/types/weather";

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
  try {
    const url =
      `${FORECAST_API_URL}?q=${encodeURIComponent(WEATHER_CITY)}` +
      `&appid=${WEATHER_API_KEY}&units=metric&lang=ru`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Forecast API error (tomorrow)");
    }

    const raw = await res.json();

    const tzOffsetSec: number = raw.city?.timezone ?? 0;
    const tzOffsetMs = tzOffsetSec * 1000;

    // локальное "сейчас" в таймзоне города
    const nowLocal = new Date(Date.now() + tzOffsetMs);

    // начало сегодняшнего дня (локальное)
    const startOfToday = new Date(
      Date.UTC(
        nowLocal.getUTCFullYear(),
        nowLocal.getUTCMonth(),
        nowLocal.getUTCDate()
      )
    );
    const startOfTomorrow = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
    const startOfDayAfterTomorrow = new Date(
      startOfToday.getTime() + 2 * 24 * 60 * 60 * 1000
    );

    const segmentTemps: SegmentTemps = emptySegmentTemps();
    const filled: Record<DaySegmentKey, boolean> = {
      morning: false,
      day: false,
      evening: false,
      night: false,
    };

    let mainTemp: number | null = null;
    let mainDesc: string | null = null;

    for (const item of raw.list ?? []) {
      const dtSec: number | undefined = item.dt;
      const temp: number | undefined = item.main?.temp;

      if (typeof dtSec !== "number" || typeof temp !== "number") {
        continue;
      }

      const local = new Date(dtSec * 1000 + tzOffsetMs);

      // интересуют только слоты завтрашнего дня
      if (local < startOfTomorrow || local >= startOfDayAfterTomorrow) {
        continue;
      }

      const hour = local.getUTCHours();
      const seg = getSegmentByHour(hour);

      if (!filled[seg]) {
        segmentTemps[seg] = temp;
        filled[seg] = true;
      }

      // берём "основную" температуру и описание около полудня
      if (hour >= 12 && hour < 18 && mainTemp === null) {
        mainTemp = temp;
        mainDesc = item.weather?.[0]?.description ?? "";
      }
    }

    // fallback, если не нашли слоты около полудня
    if (mainTemp === null) {
      mainTemp =
        segmentTemps.day ??
        segmentTemps.morning ??
        segmentTemps.evening ??
        segmentTemps.night ??
        0;
    }

    const data: WeatherData = {
      city: raw.city?.name ?? WEATHER_CITY,
      temperature: Math.round(mainTemp ?? 0),
      description: mainDesc ?? "",
      segmentTemps,
      // для простоты оставляем солнечный блок пустым
      sun: {
        sunrise: "-",
        sunset: "-",
        dayLength: "-",
      },
    };

    // лог в Supabase (по желанию можно убрать)
    await supabaseServer.from("weather_views").insert({
      city: data.city,
      temperature: data.temperature,
      description: data.description,
    });

    return NextResponse.json(data);
  } catch (e) {
    console.error("Weather tomorrow API failed:", e);
    return NextResponse.json(
      { error: "Failed to load tomorrow weather" },
      { status: 500 }
    );
  }
}
