// уже есть:
export type DaySegmentKey = "morning" | "day" | "evening" | "night";

export interface SunInfo {
  sunrise: string;
  sunset: string;
  dayLength: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  segmentTemps: Record<DaySegmentKey, number | null>;
  sun: SunInfo;
}

// === добавить НИЖЕ, не трогая WeatherData ===

export interface DayForecast {
  date: string; // '2025-12-08'
  minTemp: number;
  maxTemp: number;
  description: string;
}

export interface WeekWeatherData {
  city: string;
  days: DayForecast[];
}

export interface TomorrowWeather {
  city: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
}

export interface DayForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
}

export interface WeekWeatherData {
  city: string;
  days: DayForecast[];
}
