import { Button } from "antd";
import { isScreenMobile } from "../../utils/calendar-utils";

interface NavigationHeaderProps {
  title: string;
  calendarColor?: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  calendarColor,
  onPrev,
  onNext,
  onToday,
}) => {
  return (
    <div className="flex justify-between items-center mb-3 flex-col sm:flex-row">
      <div
        className="text-md sm:text-2xl font-bold mb-2"
        style={{ color: calendarColor }}
      >
        {title}
      </div>
      <div className="flex">
        <div className="flex space-x-3 mr-20 sm:mr-4">
          <Button
            onClick={onPrev}
            style={{ color: calendarColor }}
            className="text-xs sm:text-lg hover:opacity-80"
          >
            &lt;
          </Button>
          <Button
            onClick={onNext}
            style={{ color: calendarColor }}
            className="text-xs sm:text-lg hover:opacity-80"
          >
            &gt;
          </Button>
        </div>
        <Button
          size={isScreenMobile() ? "small" : "middle"}
          onClick={onToday}
          style={{ color: calendarColor }}
          className="text-xs sm:text-lg hover:opacity-80"
        >
          Today
        </Button>
      </div>
    </div>
  );
};

export default NavigationHeader;
