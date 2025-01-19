import { format, isSameDay, isToday } from "date-fns";
import { useCalendarContext } from "../../state/CalendarContext";
import {
  getCurrentTimePosition,
  getEventPosition,
  hours,
  isAvailableDaySlot,
  isAvailableHourSlot,
  isWithinHourSlot,
  addHoursInDate,
  justHourAndMinutes
} from "../../utils/calendar-utils";

interface DaysRowsProps {
  // Define your props here if needed
}

const DaysRows: React.FC<DaysRowsProps> = () => {
  const {
    currentDate,
    events,
    settings: { mainColor, secondColor, startHour, endHour, availableDays },
    handleDayClick,
  } = useCalendarContext();

  const isDayAvailable = isAvailableDaySlot(currentDate, availableDays);
  const dayEvents = events.filter((event: any) =>
    isSameDay(new Date(event.start), currentDate)
  );

  return (
    <div className="grid grid-cols-1 gap-2 w-full border border-gray-300 rounded-md shadow p-1">
      {/* Day Column */}
      <div
        className={`flex flex-col space-y-0 relative bg-white ${
          !isDayAvailable && "opacity-35 cursor-default"
        }`}
        style={{
          pointerEvents: isDayAvailable ? "auto" : "none",
        }}
      >
        <div
          className="text-center text-lg font-semibold font-serif h-12 pt-3 text-white rounded-md shadow"
          style={{
            backgroundColor: isToday(currentDate) ? mainColor : secondColor,
          }}
        >
          {format(currentDate, "eeee d")}
        </div>

        {/* Time Slots */}
        {hours.map((hour, index) => (
          <div
            key={index}
              className={`border border-gray-300 shadow-sm h-12 relative ${
                isAvailableHourSlot(hour, startHour, endHour)
                  ? "hover:bg-gray-200 cursor-pointer"
                  : "opacity-35 cursor-default"
              }`
            }
            onClick={() =>{
              if (isAvailableHourSlot(hour, startHour, endHour)) {
                const dateandhour = new Date(addHoursInDate(currentDate, hour));          
                handleDayClick(dateandhour);
              }
            }}
          >

            {isWithinHourSlot(currentDate, hour) && isToday(currentDate) && (
              <div
                className="absolute left-0 right-0 h-0.5 bg-red-500 z-10 opacity-60"
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
              onClick={() => {
                const clickedHour = justHourAndMinutes(eventStart);
                const actualdate = new Date(currentDate);
                
                if (isAvailableHourSlot(clickedHour, startHour, endHour)) {
                  const dateandhour = new Date(addHoursInDate(actualdate, clickedHour));          
                  handleDayClick(dateandhour);
                }
                
              }}
            >
              <div className="text-sm font-bold">
                {format(eventStart, "h:mm a")} - {format(eventEnd, "h:mm a")}
              </div>
              <div className="text-xs">{event.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaysRows;
