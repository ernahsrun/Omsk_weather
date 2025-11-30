export type DaySegmentKey = "morning" | "day" | "evening" | "night";

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  segmentTemps: Record<DaySegmentKey, number | null>;
  sun: {
    sunrise: string;
    sunset: string;
    dayLength: string;
  };
}
