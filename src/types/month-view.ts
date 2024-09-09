import { CalendarState } from "./calendar-context"

export interface MonthListProps {
  currentDate: CalendarState["currentDate"]
  mainColor: CalendarState["settings"]["mainColor"]
  secondColor: CalendarState["settings"]["secondColor"]
  handleMonthClick: (arg0: number, arg1?: boolean) => void
}