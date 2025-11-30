// types/weather.ts
export type DaySegment = "morning" | "day" | "evening" | "night";

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  segments: Record<DaySegment, string>;
  sun: {
    sunrise: string;
    sunset: string;
    dayLength: string;
  };
}
