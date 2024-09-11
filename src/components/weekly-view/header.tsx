import { endOfWeek, format, startOfWeek } from "date-fns";
import NavigationHeader from "../shared/navigation-header";
import { useCalendarContext } from "../../state/CalendarContext";

const Header = () => {
  const {
    currentDate,
    settings: { mainColor },
    handleDateChange,
    handleGoToToday,
  } = useCalendarContext();

  return (
    <div>
      <NavigationHeader
        title={`${format(startOfWeek(currentDate), "MMMM d")} - ${format(
          endOfWeek(currentDate),
          "MMMM d, yyyy"
        )}`}
        calendarColor={mainColor}
        onPrev={() => handleDateChange({ type: "weekly", offset: -1 })}
        onNext={() => handleDateChange({ type: "weekly", offset: 1 })}
        onToday={handleGoToToday}
      />
    </div>
  );
};

export default Header;
