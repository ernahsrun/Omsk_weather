interface TimeSlotProps {
  period: "morning" | "day" | "evening" | "night";
  data: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    description: string;
    wind_speed: number;
  };
}

export default function TimeSlot({ period, data }: TimeSlotProps) {
  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "morning":
        return "Утро";
      case "day":
        return "День";
      case "evening":
        return "Вечер";
      case "night":
        return "Ночь";
      default:
        return period;
    }
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("ясно") || desc.includes("солн")) return "☀️";
    if (desc.includes("облачно") || desc.includes("пасмурно")) return "☁️";
    if (desc.includes("дождь")) return "🌧️";
    if (desc.includes("снег")) return "❄️";
    if (desc.includes("туман")) return "🌫️";
    if (desc.includes("гроза")) return "⛈️";
    return "🌈";
  };

  return (
    <div className="time-slot">
      <div className="time-label">{getPeriodLabel(period)}</div>
      <div className="weather-icon">{getWeatherIcon(data.description)}</div>
      <div className="temperature">{data.temp}°C</div>
      <div className="weather-description">{data.description}</div>

      <table className="details-table">
        <tbody>
          <tr>
            <td className="detail-label">Ощущается</td>
            <td className="detail-value">{data.feels_like}°C</td>
          </tr>
          <tr>
            <td className="detail-label">Влажность</td>
            <td className="detail-value">{data.humidity}%</td>
          </tr>
          <tr>
            <td className="detail-label">Давление</td>
            <td className="detail-value">{data.pressure} мм рт.ст.</td>
          </tr>
          <tr>
            <td className="detail-label">Ветер</td>
            <td className="detail-value">{data.wind_speed} м/с</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
