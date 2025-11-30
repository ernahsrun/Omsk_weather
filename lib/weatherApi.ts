import type { WeatherData } from "@/types/weather";

export async function fetchWeather(): Promise<WeatherData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/weather`,
    {
      // For server components you can just call fetch("/api/weather")
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
}
