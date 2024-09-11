import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  isToday,
  startOfWeek,
} from "date-fns";
import { useCalendarContext } from "../../state/CalendarContext";
import {
  getCurrentTimePosition,
  getEventPosition,
  hours,
  isWithinHourSlot,
} from "../../utils/calendar-utils";

const WeeksRows = () => {
  const {
    currentDate,
    events,
    settings: { mainColor, secondColor },
  } = useCalendarContext();

  const startWeek = startOfWeek(currentDate);
  const endWeek = endOfWeek(currentDate);
  const weekDays = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <div className="grid grid-cols-7 gap-2 w-10/12">
      {/* Weekday Columns */}
      {weekDays.map((day, dayIndex) => {
        const dayEvents = events.filter((event: any) =>
          isSameDay(new Date(event.start), day)
        );

        return (
          <div
            key={dayIndex}
            className={`flex flex-col space-y-0 relative border-l border-gray-500 bg-white`}
            style={{
              borderLeft: dayIndex !== 0 ? `1px solid ${secondColor}` : "",
            }}
          >
            <div
              className={`text-center text-sm font-semibold h-12 pt-3 text-white`}
              style={{
                backgroundColor: isToday(day) ? mainColor : secondColor, // Use mainColor here
              }}
            >
              {format(day, "EEE d")}
            </div>

            {/* Time Slots */}
            {hours.map((hour, index) => (
              <div
                key={index}
                className="border-t border-gray-200 h-12 cursor-pointer hover:bg-gray-100 relative"
                onClick={() =>
                  // handleTimeSlotClick(day, parseInt(hour.split(":")[0]))
                  alert(
                    JSON.stringify({
                      day,
                      hour,
                    })
                  )
                }
              >
                {isWithinHourSlot(currentDate, hour) &&
                  format(currentDate, "yyyy-MM-dd") ===
                    format(day, "yyyy-MM-dd") &&
                  isToday(currentDate) && (
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-red-500"
                      style={{
                        top: `${getCurrentTimePosition()}%`,
                      }}
                    />
                  )}
              </div>
            ))}

            {/* Render Events */}
            {dayEvents.map((event: any, eventIndex: any) => {
              const eventStart = new Date(event.start);
              const eventEnd = new Date(event.end);
              const position = getEventPosition(eventStart, eventEnd);

              return (
                <div
                  key={eventIndex}
                  className="absolute left-0 right-0 mx-2 rounded-lg shadow text-white px-2 cursor-pointer"
                  style={{
                    backgroundColor: event.color,
                    top: position.top,
                    height: position.height,
                  }}
                  // onClick={() => handleEventClick(event)}
                  onClick={() => alert(JSON.stringify(event))}
                >
                  <div className="text-sm font-bold">
                    {format(eventStart, "h:mm a")}
                  </div>
                  <div className="text-xs">{event.title}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WeeksRows;
