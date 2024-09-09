export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  start: string | number;
  end: string | number;
  location: string;
  guests: string;
  color: string;
}

type AvailableDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface CalendarState {
  events: CalendarEvent[];
  view: "day" | "week" | "month" | string;
  currentDate: Date;
  settings: {
    mainColor: string;
    secondColor: string;
    availableDays: AvailableDay[];
    startHour: string;
    endHour: string;
  };
}

type CalendarAction =
  | { type: "SET_VIEW"; payload: CalendarState["view"] | string }
  | { type: "SET_DATE"; payload: Date }
  | { type: "ADD_EVENT"; payload: CalendarEvent }
  | { type: "UPDATE_EVENT"; payload: Partial<CalendarEvent> }
  | { type: "REMOVE_EVENT"; payload: number }
  | { type: "SET_SETTINGS"; payload: Partial<CalendarState["settings"]> };

export type CalendarDispatch = (action: CalendarAction) => void;

export interface handleMonthChangeProps {
  offset: number;
  isList?: boolean;
}

export interface CalendarContextType extends CalendarState {
  dispatch: CalendarDispatch;
  handleMonthChange: (params: handleMonthChangeProps) => void;
  handleGoToToday: () => void;
  handleDayClick: (date: Date) => void;
}
