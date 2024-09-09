import { useState } from "react";
import MonthsColumn from "./month-column";

const MonthlyView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modelToggle = (getState: boolean) => {
    if (getState) return isModalVisible
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div>
      <MonthsColumn />
    </div>
  );
};

export default MonthlyView;
