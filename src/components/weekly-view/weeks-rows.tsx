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
  isAvailableDaySlot,
  isAvailableHourSlot,
  isWithinHourSlot,
  addHoursInDate,
} from "../../utils/calendar-utils";


const WeeksRows = () => {
  const {
    currentDate,
    events,
    settings: { mainColor, secondColor, startHour, endHour, availableDays },
    handleDayClick,
  } = useCalendarContext();

  const startWeek = startOfWeek(currentDate);
  const endWeek = endOfWeek(currentDate);
  const weekDays = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <div className="grid grid-cols-7 gap-0.5 w-full p-1 border border-gray-200 rounded-md shadow-md">
      {/* Weekday Columns */}
      {weekDays.map((day, dayIndex) => {
        const isDayAvailable = isAvailableDaySlot(day, availableDays);
        const dayEvents = events.filter((event: any) =>
          isSameDay(new Date(event.start), day)
        );

        return (
          <div
            key={dayIndex}
            className={`flex flex-col relative rounded-lg shadow-md bg-white${
              !isDayAvailable && "opacity-50 cursor-not-allowed"
            }`}
            style={{
              pointerEvents: isDayAvailable ? "auto" : "none",
              border: `2px solid ${isToday(day) ? mainColor : secondColor}`,
            }}
          >
            {/* Header for Day */}
            <div
              className={`text-center text-xs sm:text-sm sm:font-semibold h-12 pt-4 rounded-t-md shadow`}
              style={{
                backgroundColor: isToday(day) ? mainColor : secondColor,
                color: "white",
              }}
            >
              {format(day, "EEE d")}
            </div>

            {/* Time Slots */}
            {hours.map((hour, index) => (
              <div
                key={index}
                className={`border-t border-gray-200 h-12 relative hover:shadow-md rounded-md${
                  isAvailableHourSlot(hour, startHour, endHour)
                    ? "hover:bg-gray-200 cursor-pointer"
                    : "opacity-35 cursor-default"
                }`}
                onClick={() => {
                  if (isAvailableHourSlot(hour, startHour, endHour)) {
                    const dateandhour = new Date(addHoursInDate(day, hour));          
                    handleDayClick(dateandhour);
                  }
                }}
                
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
                  className="absolute left-1 right-1 rounded-lg shadow-lg text-white px-2 py-2 cursor-pointer"
                  style={{
                    backgroundColor: event.color,
                    top: position.top,
                    height: position.height,
                  }}
                  onClick={() => handleDayClick(eventStart)}
                >
                  <div className="text-xs sm:text-md font-bold font-sans">
                    {format(eventStart, "h:mm a")}
                  </div>
                  <div className="text-xs break-words sm:text-md font-serif">
                    {event.title}
                  </div>
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