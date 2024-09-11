import { CalendarState, handleDateChangeProps } from "./calendar-context";

export interface MonthListProps {
  currentDate: CalendarState["currentDate"];
  mainColor: CalendarState["settings"]["mainColor"];
  secondColor: CalendarState["settings"]["secondColor"];
  handleDateChange: (params: handleDateChangeProps) => void;
}
