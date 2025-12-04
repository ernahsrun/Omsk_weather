import { getTomorrowWeather } from "@/lib/weatherApi";
import TimeSlot from "@/components/TimeSlot";
import { formatDate } from "@/lib/utils";

export default async function TomorrowPage() {
  try {
    const timeSlotsData = await getTomorrowWeather();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
      <>
        <h1 className="page-title">
          Погода в Омске - Завтра ({formatDate(tomorrow)})
        </h1>
        <p className="page-subtitle">Прогноз погоды по времени суток</p>

        <div className="time-slots-grid">
          <TimeSlot period="morning" data={timeSlotsData.morning} />
          <TimeSlot period="day" data={timeSlotsData.day} />
          <TimeSlot period="evening" data={timeSlotsData.evening} />
          <TimeSlot period="night" data={timeSlotsData.night} />
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="error">
        <p>Ошибка загрузки прогноза на завтра</p>
        <p>Пожалуйста, проверьте подключение к интернету и обновите страницу</p>
      </div>
    );
  }
}
