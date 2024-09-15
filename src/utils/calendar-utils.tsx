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

export const AvailableHoursArray = (startHour: string, endHour: string) => {
  const startHourNumber = parseInt(startHour.split(":")[0], 10);
  const endHourNumber = parseInt(endHour.split(":")[0], 10);

  return Array.from(
    { length: endHourNumber - startHourNumber + 1 },
    (_, i) => `${i + startHourNumber}:00`
  );
};

export const isAvailableHourSlot = (
  slot: string,
  startHour: string,
  endHour: string
) => {
  const startHourNumber = parseInt(startHour.split(":")[0], 10);
  const endHourNumber = parseInt(endHour.split(":")[0], 10);
  const slotNumber = parseInt(slot.split(":")[0], 10);

  return slotNumber > startHourNumber && slotNumber < endHourNumber;
};

export const isAvailableDaySlot = (
  slot: Date,
  availableDays: AvailableDay[]
) => {
  const dayOfWeek = slot.getDay() === 0 ? 7 : slot.getDay();
  return availableDays.includes(dayOfWeek as AvailableDay);
};

export const isAvailableSlot = (
  slot: string,
  startHour: string,
  endHour: string
) => {
  const startHourNumber = parseInt(startHour.split(":")[0], 10);
  const endHourNumber = parseInt(endHour.split(":")[0], 10);
  const slotNumber = parseInt(slot.split(":")[0], 10);

  return slotNumber > startHourNumber && slotNumber < endHourNumber;
};

export const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export const getCurrentTimePosition = () => {
  const now = new Date();
  const minutes = now.getMinutes();

  return (minutes / 60) * 100;
};

export const getEventPosition = (eventStart: Date, eventEnd: Date) => {
  const HOUR_HEIGHT = 48;
  const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
  const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();

  const top = (startMinutes * HOUR_HEIGHT) / 60;
  const height = ((endMinutes - startMinutes) * HOUR_HEIGHT) / 60;

  return {
    top: `${top + 48}px`,
    height: `${height}px`,
  };
};

export const isWithinHourSlot = (
  currentDate: Date,
  slotHour: string
): boolean => {
  const currentHour = currentDate.getHours(); // Get current hour
  const slotStartHour = parseInt(slotHour.split(":")[0], 10); // Parse slot start hour

  // Check if currentHour is between the slot start hour and the next hour
  return currentHour >= slotStartHour && currentHour < slotStartHour + 1;
};
