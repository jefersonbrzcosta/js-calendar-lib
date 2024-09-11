import { useCalendarContext } from "../../state/CalendarContext";
import { hours } from "../../utils/calendar-utils";

export const TimeColumn = () => {
  const {
    settings: { mainColor, secondColor },
  } = useCalendarContext();

  const currentHour = new Date().getHours();

  return (
    <div className="flex flex-col space-y-0 w-2/12">
      <div className="h-12" />
      {hours.map((hour, index) => {
        const hourInt = parseInt(hour.split(":")[0], 10);
        const isCurrentHour = currentHour === hourInt;

        return (
          <div
            key={index}
            className={`text-sm text-white h-12 flex items-center justify-center border-b border-gray-200`}
            style={{ backgroundColor: isCurrentHour ? mainColor : secondColor }}
          >
            {hour}
          </div>
        );
      })}
    </div>
  );
};
