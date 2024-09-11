import AnimationWrapper from "../shared/animation-wrapper";
import { TimeColumn } from "../shared/time-column";
import Header from "./header";
import WeeksRows from "./weeks-rows";

const WeeklyView = () => {
  return (
    <AnimationWrapper className="flex bg-gray-50 flex-col">
      <Header />
      <div className="flex flex-row">
        <TimeColumn />
        <WeeksRows />
      </div>
    </AnimationWrapper>
  );
};

export default WeeklyView;
