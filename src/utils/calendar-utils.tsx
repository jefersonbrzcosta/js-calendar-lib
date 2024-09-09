import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { AvailableDay } from "../types/calendar-context";

export const getCalendarDays = (currentDate: Date) =>
  eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

export const getDayNumber = (date: Date): AvailableDay => {
  const day = date.getDay();
  return (day === 0 ? 7 : day) as AvailableDay;
};
