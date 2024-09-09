import { addMonths, format, setMonth } from "date-fns";
import { useCalendarContext } from "../../../state/CalendarContext";
import MonthList from "./month-list";


function MonthsColumn() {
  const { currentDate, settings: { mainColor, secondColor }, dispatch } = useCalendarContext();

  const handleMonthChange = (offset: number, isList?: boolean) => {
    const newDate = isList ? setMonth(currentDate, offset) : addMonths(currentDate, offset);
    dispatch({ type: 'SET_DATE', payload: newDate });
  };

  return (
    <div className="w-1/4 p-6 bg-gray-200" >
      <div className="flex justify-between items-center " style={{ color: mainColor }}>
        <button
          onClick={() => handleMonthChange(-12)}
          style={{ color: mainColor }}
        >
          &lt;
        </button>
        <div className="text-xl font-bold" >
          {format(currentDate, 'yyyy')}
        </div>
        <button
          onClick={() => handleMonthChange(12)}
          style={{ color: mainColor }}
        >
          &gt;
        </button>
      </div>
      <ul className="mt-10">
        <MonthList currentDate={currentDate} mainColor={mainColor} secondColor={secondColor} handleMonthClick={handleMonthChange} />
      </ul>
    </div>
  );
};

export default MonthsColumn;
