import { useReducer, createContext, useContext, ReactNode } from "react";
import {
  CalendarState,
  CalendarAction,
  CalendarContextType,
  handleDateChangeProps,
} from "../types/calendar-context";
import { mockEvents, mockSettings } from "../utils/mocks";
import { addDays, addMonths, addWeeks, setMonth, format } from "date-fns";

const initialState: CalendarState = {
  events: mockEvents,
  view: "month",
  currentDate: new Date(),
  settings: mockSettings,
};

const calendarReducer = (
  state: CalendarState,
  action: CalendarAction
): CalendarState => {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "REMOVE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id
            ? { ...event, ...action.payload }
            : event
        ),
      };
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_DATE":
      return { ...state, currentDate: action.payload };
    case "SET_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
};

const CalendarContext = createContext<CalendarContextType>({
  ...initialState,
  dispatch: () => null,
  handleDateChange: () => null,
  handleGoToToday: () => null,
  handleDayClick: () => null,
});

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    ...initialState,
    settings: { ...initialState.settings },
  });

  const handleDateChange = ({
    type,
    offset,
    isList,
  }: handleDateChangeProps) => {
    const operations: Record<handleDateChangeProps["type"], () => Date> = {
      monthly: () =>
        isList
          ? setMonth(state.currentDate, offset)
          : addMonths(state.currentDate, offset),
      weekly: () => addWeeks(state.currentDate, offset),
      daily: () => addDays(state.currentDate, offset),
    };

    setTimeout(() => {
      const newDate = operations[type]();
      dispatch({ type: "SET_DATE", payload: newDate });
    }, 300);
  };

  const handleGoToToday = () => {
    const today = new Date();
    dispatch({ type: "SET_DATE", payload: today });
  };

  const getEventTitles = (events: { title: string }[]): string => {
    return `[${events.map(event => event.title).join(",")}]`;
  };
  
  const searchEventInMock = (date: Date | string, mockEvents: any[]): { date: string; title?: string } => {
    const formattedDate = format(new Date(date), "MM/dd/yyyy hh:mm");
    for (const event of mockEvents) {
      const eventDate = format(new Date(event.start), "MM/dd/yyyy hh:mm");
      if (eventDate === formattedDate) {
        return { date: formattedDate, title: event.title };
      }
    }
    return { date: formattedDate };
  };

  const handleDayClick = (
    date: Date | string,
    events?: {
      title: string;
      color: string;
      multiDay?: boolean;
      start?: string;
      end?: string;
    }[]
  ) => {
    if (events && events.length > 0) {
      const titles = getEventTitles(events);
      alert(JSON.stringify({ date, titles }));
    } else {
      const result = searchEventInMock(date, mockEvents);
      alert(JSON.stringify(result));
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        dispatch,
        handleDateChange,
        handleGoToToday,
        handleDayClick,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  return useContext(CalendarContext);
};
