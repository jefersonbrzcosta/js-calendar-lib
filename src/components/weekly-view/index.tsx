import AnimationWrapper from "../shared/animation-wrapper";
import { TimeColumn } from "../shared/time-column";
import Header from "./header";
import WeeksRows from "./weeks-rows";

const WeeklyView = () => {
  return (
    <AnimationWrapper className="flex border border-gray-200 rounded-xl shadow-md flex-col p-2">
      <Header />
      <div className="flex flex-row">
        <TimeColumn />
        <WeeksRows />
      </div>
    </AnimationWrapper>
  );
};

export default WeeklyView;
