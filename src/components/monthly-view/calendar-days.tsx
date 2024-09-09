import { format, isToday } from "date-fns";
import { getCalendarDays, getDayNumber } from "../../utils/calendar-utils";
import { useCalendarContext } from "../../state/CalendarContext";

const CalendarDays = () => {
  const {
    currentDate,
    settings,
    settings: { mainColor, secondColor },
    events,
    handleDayClick,
  } = useCalendarContext();

  const eventsByDay: { [key: string]: { color: string }[] } = {};
  events.forEach((event) => {
    const eventDate = format(new Date(event.start), "yyyy-MM-dd");
    if (!eventsByDay[eventDate]) {
      eventsByDay[eventDate] = [];
    }
    eventsByDay[eventDate].push({ color: event.color });
  });

  const calendarDays = getCalendarDays(currentDate);

  return (
    <div className="grid grid-cols-7 gap-2">
      {calendarDays.map((day, index) => {
        const isCurrentMonth = day.getMonth() === currentDate.getMonth();
        const isAvailableDay = settings.availableDays.includes(
          getDayNumber(day)
        );
        const dayString = format(day, "yyyy-MM-dd");
        const dayEvents = eventsByDay[dayString] || [];

        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center h-24 cursor-pointer
              rounded-lg ${isCurrentMonth ? "text-gray-800" : "text-gray-400"} ${
                isAvailableDay
                  ? "hover:bg-gray-100"
                  : "opacity-20 pointer-events-none"
              }`}
            style={
              isToday(day)
                ? { color: "white", backgroundColor: secondColor }
                : { color: mainColor }
            }
            onClick={() => isAvailableDay && handleDayClick(day)}
          >
            <div className="text-xl font-semibold">{format(day, "d")}</div>

            <div className="flex flex-wrap justify-center mt-1">
              {dayEvents.slice(0, 6).map((event, index) => (
                <span
                  key={index}
                  className="w-2 h-2 rounded-full m-0.5"
                  style={{ backgroundColor: event.color }}
                ></span>
              ))}
            </div>
            {dayEvents.length > 6 && (
              <div className="flex flex-wrap justify-center mt-1">
                {dayEvents.slice(6).map((event, idx) => (
                  <span
                    key={idx}
                    className="w-2 h-2 rounded-full m-0.5"
                    style={{ backgroundColor: event.color }}
                  ></span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDays;
