import { Button } from "antd";

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
    <div className="flex justify-between items-center mb-3">
      <div className="text-2xl font-bold" style={{ color: calendarColor }}>
        {title}
      </div>
      <div className="flex items-center space-x-3">
        <Button
          onClick={onPrev}
          style={{ color: calendarColor }}
          className="text-lg hover:opacity-80"
        >
          &lt;
        </Button>
        <Button
          onClick={onNext}
          style={{ color: calendarColor }}
          className="text-lg hover:opacity-80"
        >
          &gt;
        </Button>
        <Button
          onClick={onToday}
          style={{ color: calendarColor }}
          className="text-lg hover:opacity-80"
        >
          Today
        </Button>
      </div>
    </div>
  );
};

export default NavigationHeader;
