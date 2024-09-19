import {
  format,
  isToday,
  isBefore,
  isAfter,
  eachDayOfInterval,
} from "date-fns";
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

  // Create a mapping of events by day, including multi-day events
  const eventsByDay: {
    [key: string]: {
      color: string;
      multiDay?: boolean;
      start?: string;
      end?: string;
    }[];
  } = {};

  events.forEach((event) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    const eventDays = eachDayOfInterval({ start: eventStart, end: eventEnd });

    eventDays.forEach((day) => {
      const dayString = format(day, "yyyy-MM-dd");

      if (!eventsByDay[dayString]) {
        eventsByDay[dayString] = [];
      }

      // If the event spans multiple days, mark it
      eventsByDay[dayString].push({
        color: event.color,
        multiDay: isBefore(eventStart, day) || isAfter(eventEnd, day),
        start: format(eventStart, "yyyy-MM-dd"),
        end: format(eventEnd, "yyyy-MM-dd"),
      });
    });
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
            onClick={() => isAvailableDay && handleDayClick(day, dayEvents)}
          >
            <div className="text-xl font-semibold">{format(day, "d")}</div>

            <div className="flex flex-wrap justify-center mt-1">
              {dayEvents.slice(0, 6).map((event, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full m-0.5 ${
                    event.multiDay ? "border border-white" : ""
                  }`}
                  style={{ backgroundColor: event.color }}
                ></span>
              ))}
            </div>
            {dayEvents.length > 6 && (
              <div className="flex flex-wrap justify-center mt-1">
                {dayEvents.slice(6).map((event, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full m-0.5 ${
                      event.multiDay ? "border border-white" : ""
                    }`}
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
