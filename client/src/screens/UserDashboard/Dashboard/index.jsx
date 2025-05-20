import SideBar from "../../../components/UserDashboard/SideBar/sideBar";
import UserDashboard from "../../../components/UserDashboard/userDashboard";
import { useState } from "react";
import "../style.css";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  };

  return (
    <div style={{ display: "flex", width:"100%",  backgroundColor: "var(--background)", padding:0, margin:0  }}>
      {/* Sidebar - Fixed on the left */}
      <div style={{ position: "fixed", left: 0, top: 0, height: "100vh"}}>
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Main Content - Positioned beside Sidebar with smooth transitions */}
      <div
        style={{
          marginLeft: isCollapsed ? "20px" : "200px", // Adjust position dynamically
          // transition: "margin-left 0.3s ease-in-out", // Smooth transition
          flexGrow: 1, // Take remaining space
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "flex-start",
          // border: "2px solid red"
        }}
      >
        <UserDashboard userData={userData} />
      </div>
    </div>
  );
};

export default Dashboard;
