import MonthsColumn from "./month-column";
import WeekDaysHeader from "./week-days-header";
import CalendarDays from "./calendar-days";
import AnimationWrapper from "../shared/animation-wrapper";

const MonthlyView = () => {
  return (
    <AnimationWrapper className="flex bg-gray-50 md:flex-row flex-col">
      <MonthsColumn />
      <div className="flex-row mt-4 w-full sm:w-5/6 px-0 sm:px-5">
        <WeekDaysHeader />
        <CalendarDays />
      </div>
    </AnimationWrapper>
  );
};

export default MonthlyView;
