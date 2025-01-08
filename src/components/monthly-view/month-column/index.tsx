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
    <div className="w-full sm:w-1/4 p-6 border border-gray rounded-md font-serif">
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
        <div className="text-xl font-bold" >{format(currentDate, "yyyy")}</div>
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
