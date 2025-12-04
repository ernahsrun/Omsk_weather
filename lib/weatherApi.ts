const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const CITY = process.env.NEXT_PUBLIC_WEATHER_CITY || "Omsk";
const COUNTRY = process.env.NEXT_PUBLIC_WEATHER_COUNTRY || "RU";

function convertPressure(hPa: number): number {
  return Math.round(hPa * 0.750062);
}

export async function getTomorrowWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric&lang=ru`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) throw new Error("Ошибка получения данных");

    const data = await response.json();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    const tomorrowForecasts = data.list.filter((item: any) => {
      const forecastDate = new Date(item.dt * 1000).toISOString().split("T")[0];
      return forecastDate === tomorrowDate;
    });

    const timeSlots = {
      morning: null as any,
      day: null as any,
      evening: null as any,
      night: null as any,
    };

    tomorrowForecasts.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const hour = date.getHours();

      let period: keyof typeof timeSlots;
      if (hour >= 6 && hour < 12) period = "morning";
      else if (hour >= 12 && hour < 18) period = "day";
      else if (hour >= 18 && hour < 24) period = "evening";
      else period = "night";

      if (!timeSlots[period]) {
        timeSlots[period] = {
          temp: Math.round(item.main.temp),
          feels_like: Math.round(item.main.feels_like),
          humidity: item.main.humidity,
          pressure: convertPressure(item.main.pressure),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          wind_speed: item.wind.speed,
        };
      }
    });

    const periods: (keyof typeof timeSlots)[] = [
      "morning",
      "day",
      "evening",
      "night",
    ];
    periods.forEach((period) => {
      if (!timeSlots[period]) {
        timeSlots[period] = {
          temp: 0,
          feels_like: 0,
          humidity: 0,
          pressure: 0,
          description: "Нет данных",
          icon: "01d",
          wind_speed: 0,
        };
      }
    });

    return timeSlots;
  } catch (error) {
    console.error("Error fetching tomorrow weather:", error);
    throw error;
  }
}
