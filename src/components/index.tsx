import { Tabs, ConfigProvider } from "antd";
import {
  CalendarOutlined,
  BarsOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { useCalendarContext } from "../state/CalendarContext";
import MonthlyView from "./monthly-view";
import WeeklyView from "./weekly-view";

const items: any = [
  {
    key: "month",
    label: "Monthly View",
    icon: <CalendarOutlined />,
  },
  {
    key: "week",
    label: "Weekly View",
    icon: <BarsOutlined />,
  },
  {
    key: "day",
    label: "Daily View",
    icon: <ClockCircleOutlined />,
  },
];

function CalendarApp() {
  const {
    view,
    settings: { mainColor },
    dispatch,
  } = useCalendarContext();

  const handleViewChange = (view: string) => {
    dispatch({ type: "SET_VIEW", payload: view });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: mainColor,
            itemActiveColor: mainColor,
            itemHoverColor: mainColor,
            itemSelectedColor: mainColor,
            itemColor: "gray",
          },
        },
      }}
    >
      <div className="w-full flex flex-col">
        <div className="px-4 bg-white shadow-lg rounded-lg">
          <Tabs
            defaultActiveKey="month"
            activeKey={view}
            onChange={handleViewChange}
            size="large"
            tabBarGutter={16}
            tabBarStyle={{
              marginBottom: "1rem",
              color: mainColor,
              borderBottom: `1px solid ${mainColor}`,
            }}
            items={items}
          />

          {/* Render the selected view */}
          {view === "month" && <MonthlyView />}
          {view === "week" && <WeeklyView />}
          {view === "day" && <></>}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default CalendarApp;
