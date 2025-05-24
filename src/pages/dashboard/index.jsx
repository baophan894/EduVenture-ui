import {
  ContainerOutlined,
  FileWordFilled,
  TagsFilled,
  ReadFilled,
  UserOutlined,
  DollarOutlined,
  ExclamationCircleFilled,
  FormOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import DashboardStyle from "./Dashboard.style";
import ReportTab from "./tab/ReportTab.jsx";
import ListPendingDocument from "./tab/ListPendingDocument.jsx";
import { useState, useEffect } from "react";
import ListUser from "./tab/ListUser.jsx";
import ListPendingFlashcard from "./tab/ListPendingFlashcard.jsx";
import ListPendingCourse from "./tab/ListPendingCourse.jsx";
import { adminRequire } from "../../common/adminRequire.js";
import ExpertRequest from "./tab/ExpertRequest.jsx";
import Topic from "./tab/Topic.jsx";
import Withdraw from "./tab/Withdraw.jsx";
import TestManagement from "./tab/TestManagement.jsx";
import { useSearchParams } from "react-router-dom";

const items = [
  { key: "1", icon: <UserOutlined />, label: "Platform statistics" },
  { key: "2", icon: <ExclamationCircleFilled />, label: "List Report" },
  { key: "3", icon: <FileWordFilled />, label: "List Pending Documents" },
  { key: "4", icon: <ReadFilled />, label: "List Pending Courses" },
  { key: "5", icon: <TagsFilled />, label: "List Pending Flashcards" },
  { key: "6", icon: <ContainerOutlined />, label: "Platform topic" },
  { key: "7", icon: <ContainerOutlined />, label: "Expert request" },
  { key: "8", icon: <DollarOutlined />, label: "Withdraw" },
  { key: "9", icon: <FormOutlined />, label: "Test Management" },
];

const Dashboard = () => {
  adminRequire();
  const [searchParams] = useSearchParams();
  const [selectedKey, setSelectedKey] = useState("1");

  // Set initial selected key from URL parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "test-management") {
      setSelectedKey("9");
    }
  }, [searchParams]);

  const handleClick = (e) => {
    setSelectedKey(e.key);
  };
  const renderTab = () => {
    switch (selectedKey) {
      case "1":
        return <ListUser />;
      case "2":
        return <ReportTab />;
      case "3":
        return <ListPendingDocument />;
      case "4":
        return <ListPendingCourse />;
      case "5":
        return <ListPendingFlashcard />;
      case "6":
        return <Topic />;
      case "7":
        return <ExpertRequest />;
      case "8":
        return <Withdraw />;
      case "9":
        return <TestManagement />;
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
            selectedKeys={[selectedKey]}
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
export default Dashboard;
