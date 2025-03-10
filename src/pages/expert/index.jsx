import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import DashboardStyle from "../dashboard/Dashboard.style";
import { useState } from "react";
import CreateTab from "./tab/CreateTab";
import ListCourseTab from "./tab/ListcourseTab.jsx";
import { expertRequire } from "../../common/expertRequire.js";
const items = [
  { key: "1", icon: <PieChartOutlined />, label: "Create course" },
  { key: "2", icon: <DesktopOutlined />, label: "List course" },
];
const ExpertDashboard = () => {
  expertRequire();
  const [selectedKey, setSelectedKey] = useState("1");
  const handleClick = (e) => {
    setSelectedKey(e.key);
  };
  const renderTab = () => {
    switch (selectedKey) {
      case "1":
        return <CreateTab />;
      case "2":
        return <ListCourseTab />;
      default:
        return <div>Default Content</div>;
    }
  };
  return (
    <DashboardStyle>
      <div className="dashboard" style={{ width: 256 }}>
        <div className="dashboard_menu">
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            items={items}
          />
        </div>
        <div className="dashboard_tab ">{renderTab()}</div>
      </div>
    </DashboardStyle>
  );
};
export default ExpertDashboard;
