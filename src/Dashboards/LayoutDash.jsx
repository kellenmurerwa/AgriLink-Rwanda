import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashNavBar from "./DashNavBar";
import SideNavBar from "./SideNavBar";
import "../DashboardStyles/LayoutDash.css";

function LayoutDash() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="dashboardContainer1">
      <SideNavBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="mainContainer1">
        <DashNavBar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          className="dashNavBar1"
          style={{
            left: sidebarOpen ? '16rem' : '5rem'
          }}
        />
        <div 
          className="contentArea1"
          style={{
            marginLeft: sidebarOpen ? '16rem' : '5rem',
            width: `calc(100% - ${sidebarOpen ? '16rem' : '5rem'})`
          }}
        >
          <main className="contentContainer1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default LayoutDash;