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
            if (events){
            if (events?.length > 0) {
              let titlesofevents = "[" + events[0].title;
              for (let i = 1; i < events?.length; i++){
                titlesofevents = titlesofevents + "," + events[i].title;
              }
              titlesofevents = titlesofevents + "]";
              alert(JSON.stringify({"date":date, "titles":titlesofevents}));
            }else{
              alert(JSON.stringify({"date":date}));
            }
          }else{
                  //search date in mock
                  const everyevents = mockEvents;
                  let haveevent = false;
                  const dateofdate = format(new Date(date), 'MM/dd/yyyy hh:mm');

                  for (let i = 0; i < everyevents.length; i++){
                    const datei = format(new Date(everyevents[i].start), 'MM/dd/yyyy hh:mm');
                                        
                    if (datei === dateofdate){
                      const titleofevent = everyevents[i].title;
                      alert(JSON.stringify({"date": datei, "title": titleofevent}));
                      haveevent = true;
                    }
                  }
                  if (!haveevent){
                    alert(JSON.stringify({"date": dateofdate}));
                  }
              
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
