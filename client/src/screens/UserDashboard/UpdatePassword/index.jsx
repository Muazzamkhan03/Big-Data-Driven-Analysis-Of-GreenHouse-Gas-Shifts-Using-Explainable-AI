import SideBar from "../../../components/UserDashboard/SideBar/sideBar";
import UserUpdatePassword from "../../../components/UserDashboard/updatePassword";
import { useState } from "react";
import "../style.css";

const UpdatePassword = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", width: "100%", height:"100%", backgroundColor: "var(--background)", padding: 0, margin: 0 }}>

      <div style={{ position: "fixed", left: 0, top: 0, height: "100vh" }}>
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      <div
        style={{
          marginLeft: isCollapsed ? "20px" : "200px", // Adjust position dynamically
          flexGrow: 1, 
        }}
      >
        <UserUpdatePassword />
      </div>
    </div>
  );
};

export default UpdatePassword;
