import MonthsColumn from "./month-column";
import WeekDaysHeader from "./week-days-header";
import CalendarDays from "./calendar-days";
import AnimationWrapper from "../shared/animation-wrapper";

const MonthlyView = () => {
  return (
    <AnimationWrapper className="flex bg-gray-10 md:flex-row flex-col font-serif">
      <MonthsColumn />
      <div className="flex-row mt- w-full sm:w-5/4 px-0 sm:px-5 border border-gray rounded-md shadow-md">
        <WeekDaysHeader />
        <CalendarDays />
      </div>
    </AnimationWrapper>
  );
};

export default MonthlyView;
