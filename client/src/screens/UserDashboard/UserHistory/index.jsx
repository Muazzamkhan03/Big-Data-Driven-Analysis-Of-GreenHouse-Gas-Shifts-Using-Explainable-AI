//import React from 'react';
import DarkTable from "../../../components/UserHistory/DarkTable";
import SideBar from "../../../components/UserDashboard/SideBar/sideBar";
import { useState } from "react";
import "./style.css";

const UserHistory = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div style={{ display: "flex", width: "100%", backgroundColor: "var(--secondary-background)", padding: 0, margin: 0 }}>
          <div style={{ position: "fixed", left: 0, top: 0, height: "100vh" }}>
            <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          </div>
    <div className="dashboard-container"
     style={{
      marginLeft: isCollapsed ? "100px" : "250px", // Adjust position dynamically
      flexGrow: 1, 
    }}>
      {/* <Table /> */}
      <DarkTable />
    </div>
   
    </div>
  );
};

export default UserHistory;
