import { useEffect } from "react";
import { useCalendarContext } from "../../state/CalendarContext";
import { hours, isScreenMobile } from "../../utils/calendar-utils";

export const TimeColumn = () => {
  const {
    settings: { mainColor, secondColor },
  } = useCalendarContext();

  const currentHour = new Date().getHours();

  let isMobile = isScreenMobile();

  useEffect(() => {
    isMobile = isScreenMobile();
  }, [window.innerWidth]);

  const renderRightBackgroundColor = (isCurrentHour: boolean) => {
    if (isMobile) return "white";
    return isCurrentHour ? mainColor : secondColor;
  };

  return (
    <div className="flex flex-col space-y-0 sm:w-2/12">
      <div className="h-12" />
      {hours.map((hour, index) => {
        const hourInt = parseInt(hour.split(":")[0], 10);
        const isCurrentHour = currentHour === hourInt;

        return (
          <div
            key={index}
            className={`flex pr-1 text-xs sm:text-base h-12 items-center sm:justify-center sm:text-white sm:border-b sm:border-gray-200 ${
              isCurrentHour && isMobile && `font-extrabold`
            }`}
            style={{
              backgroundColor: renderRightBackgroundColor(isCurrentHour),
            }}
          >
            {hour}
          </div>
        );
      })}
    </div>
  );
};
