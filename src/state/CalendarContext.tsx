import { useReducer, createContext, useContext, ReactNode } from "react";
import {
  CalendarState,
  CalendarAction,
  CalendarContextType,
  handleMonthChangeProps,
} from "../types/calendar-context";
import { mockEvents, mockSettings } from "../utils/mocks";
import { addMonths, setMonth } from "date-fns";

const initialState: CalendarState = {
  events: mockEvents,
  view: "month",
  currentDate: new Date(),
  settings: mockSettings,
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

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
  handleMonthChange: () => null,
  handleGoToToday: () => null,
  handleDayClick: () => null,
});

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    ...initialState,
    settings: { ...initialState.settings },
  });

  const handleMonthChange = ({ offset, isList }: handleMonthChangeProps) => {
    const newDate = isList
      ? setMonth(state.currentDate, offset)
      : addMonths(state.currentDate, offset);
    dispatch({ type: "SET_DATE", payload: newDate });
  };

  const handleGoToToday = () => {
    const today = new Date();
    dispatch({ type: "SET_DATE", payload: today });
  };

  const handleDayClick = (date: Date) => {
    alert(date);
  };

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        dispatch,
        handleMonthChange,
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
