import AnimationWrapper from "../shared/animation-wrapper";
import { TimeColumn } from "../shared/time-column";
import DaysRows from "./days-rows";
import Header from "./header";

const DailyView = () => {
  return (
    <AnimationWrapper className="flex bg-gray-50 flex-col w-full">
      <Header />
      <div className="flex">
        <TimeColumn />
        <DaysRows />
      </div>
    </AnimationWrapper>
  );
};

export default DailyView;
