import { Button } from "antd";
import { format } from "date-fns";

import { useCalendarContext } from "../../state/CalendarContext";

const WeekDaysHeader = () => {
  const {
    currentDate,
    settings: { mainColor, secondColor },
    handleMonthChange,
    handleGoToToday,
  } = useCalendarContext();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold" style={{ color: mainColor }}>
          {format(currentDate, "MMMM yyyy")}
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => handleMonthChange({ offset: -1 })}
            className="text-lg"
            style={{ color: mainColor }}
          >
            &lt;
          </Button>
          <Button
            onClick={() => handleMonthChange({ offset: 1 })}
            className="text-lg"
            style={{ color: mainColor }}
          >
            &gt;
          </Button>
          <Button
            onClick={handleGoToToday}
            className="text-lg"
            style={{ color: mainColor }}
          >
            Today
          </Button>
        </div>
      </div>

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
