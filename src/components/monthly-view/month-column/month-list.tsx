import { useRef, useEffect } from "react";
import { format, setMonth, startOfMonth } from "date-fns";
import { MonthListProps } from "../../../types/month-view";

function MonthList({
  currentDate,
  mainColor,
  secondColor,
  handleDateChange,
}: MonthListProps) {
  const monthRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthElement = monthRefs.current[currentMonthIndex];
    if (currentMonthElement) {
      currentMonthElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentDate]);

  return (
    <ul className="mt-4 sm:mt-10 flex flex-row sm:flex-col overflow-auto">
      {Array.from({ length: 12 }).map((_, index) => {
        const monthDate = setMonth(startOfMonth(currentDate), index);
        return (
          <li
            key={index}
            ref={(el) => (monthRefs.current[index] = el)}
            className={`px-2 text-lg pb-4 font-semibold cursor-pointer opacity-80 hover:opacity-100`}
            style={
              monthDate.getMonth() === currentDate.getMonth()
                ? { color: mainColor, opacity: 1 }
                : { color: secondColor }
            }
            onClick={() =>
              handleDateChange({ type: "monthly", offset: index, isList: true })
            }
          >
            {format(monthDate, "MMMM")}
          </li>
        );
      })}
    </ul>
  );
}

export default MonthList;
