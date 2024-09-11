import MonthsColumn from "./month-column";
import WeekDaysHeader from "./week-days-header";
import CalendarDays from "./calendar-days";
import AnimationWrapper from "../shared/animation-wrapper";

const MonthlyView = () => {
  return (
    <AnimationWrapper className="flex bg-gray-50">
      <MonthsColumn />
      <div className="flex-row w-5/6 px-5">
        <WeekDaysHeader />
        <CalendarDays />
      </div>
    </AnimationWrapper>
  );
};

export default MonthlyView;
