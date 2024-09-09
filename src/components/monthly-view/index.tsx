import MonthsColumn from "./month-column";
import WeekDaysHeader from "./week-days-header";
import CalendarDays from "./calendar-days";

const MonthlyView = () => {
  return (
    <div className="flex bg-gray-50">
      <MonthsColumn />
      <div className="flex-1 p-5 relative">
        <WeekDaysHeader />
        <CalendarDays />
      </div>
    </div>
  );
};

export default MonthlyView;
