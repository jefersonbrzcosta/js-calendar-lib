import { format } from "date-fns";

import { useCalendarContext } from "../../state/CalendarContext";
import NavigationHeader from "../shared/navigation-header";

const WeekDaysHeader = () => {
  const {
    currentDate,
    settings: { mainColor, secondColor },
    handleDateChange,
    handleGoToToday,
  } = useCalendarContext();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <NavigationHeader
        title={format(currentDate, "MMMM yyyy")}
        calendarColor={mainColor}
        onPrev={() => handleDateChange({ type: "monthly", offset: -1 })}
        onNext={() => handleDateChange({ type: "monthly", offset: 1 })}
        onToday={handleGoToToday}
      />

      <div
        className="grid grid-cols-7 gap-2 text-center text-lg font-semibold mb-2"
        style={{ color: "white", backgroundColor: secondColor }}
      >
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
    </>
  );
};

export default WeekDaysHeader;
