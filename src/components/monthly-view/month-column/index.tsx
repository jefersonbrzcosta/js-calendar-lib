import { format } from "date-fns";
import { useCalendarContext } from "../../../state/CalendarContext";
import MonthList from "./month-list";

function MonthsColumn() {
  const {
    currentDate,
    settings: { mainColor, secondColor },
    handleDateChange,
  } = useCalendarContext();

  return (
    <div className="w-1/6 px-14 pt-5 bg-gray-200">
      {/* Change year buttons */}
      <div
        className="flex justify-between items-center"
        style={{ color: mainColor }}
      >
        <button
          onClick={() => handleDateChange({ type: "monthly", offset: -12 })}
          style={{ color: mainColor }}
        >
          &lt;
        </button>
        <div className="text-xl font-bold">{format(currentDate, "yyyy")}</div>
        <button
          onClick={() => handleDateChange({ type: "monthly", offset: 12 })}
          style={{ color: mainColor }}
        >
          &gt;
        </button>
      </div>
      <MonthList
        currentDate={currentDate}
        mainColor={mainColor}
        secondColor={secondColor}
        handleDateChange={handleDateChange}
      />
    </div>
  );
}

export default MonthsColumn;
