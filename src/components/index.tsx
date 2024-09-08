import { useCalendarContext } from '../state/CalendarContext';


import { Tabs, ConfigProvider } from 'antd';
import { CalendarOutlined, BarsOutlined, ClockCircleOutlined } from '@ant-design/icons';

function CalendarApp() {
  const { state, dispatch } = useCalendarContext();
  const { mainColor } = state.settings;

  const handleViewChange = (view: string) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  return (
    <ConfigProvider theme={{
      components: {
        Tabs: {
          inkBarColor: mainColor,
          itemActiveColor: mainColor,
          itemHoverColor: mainColor,
          itemSelectedColor: mainColor,
          itemColor: "gray"
        },
      },
    }}>
      <div className="w-full flex flex-col">
        <div className="px-4 bg-white shadow-lg rounded-lg">
          <Tabs
            defaultActiveKey="month"
            activeKey={state.view}
            onChange={handleViewChange}
            size="large"
            tabBarGutter={16}
            tabBarStyle={{
              marginBottom: '1rem',
              color: mainColor,
              borderBottom: `1px solid ${mainColor}`,

            }}
            items={[
              {
                key: 'month',
                label: 'Monthly View',
                icon: <CalendarOutlined />
              },
              {
                key: 'week',
                label: 'Weekly View',
                icon: <BarsOutlined />
              },
              {
                key: 'day',
                label: 'Daily View',
                icon: <ClockCircleOutlined />
              },
            ]}
          />

          {/* Render the selected view */}
          {/* {state.view === 'month' && <MonthlyView />}
          {state.view === 'week' && <WeeklyView />}
          {state.view === 'day' && <DayView />} */}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default CalendarApp