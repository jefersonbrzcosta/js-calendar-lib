import { format, setMonth, startOfMonth } from "date-fns";
import { MonthListProps } from "../../../types/month-view";

function MonthList({
  currentDate,
  mainColor,
  secondColor,
  handleMonthClick,
}: MonthListProps) {
  return (
    <ul className="mt-8">
      {Array.from({ length: 12 }).map((_, index) => {
        const monthDate = setMonth(startOfMonth(currentDate), index);
        return (
          <li
            key={index}
            className={`text-lg pb-4 font-semibold cursor-pointer opacity-80 hover:opacity-100`}
            style={
              monthDate.getMonth() === currentDate.getMonth()
                ? { color: mainColor, opacity: 1 }
                : { color: secondColor }
            }
            onClick={() => handleMonthClick(index, true)}
          >
            {format(monthDate, "MMMM")}
          </li>
        );
      })}
    </ul>
  );
}

export default MonthList;
