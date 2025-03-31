import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashNavBar from "./DashNavBar";
import SideNavBar from "./SideNavBar";
import "../DashboardStyles/LayoutDash.css";

function LayoutDash() {
    {
        const [activeSection, setActiveSection] = useState('overview');
        const [sidebarOpen, setSidebarOpen] = useState(true);
      
        return (
          <div className="dashboardContainer">
            <SideNavBar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              className="sideNavBar"
              style={{ 
                width: sidebarOpen ? '16rem' : '5rem',
                transition: 'width 0.3s ease'
              }}
            />
            <div
              className="contentArea"
              style={{
                marginLeft: sidebarOpen ? '16rem' : '5rem',
                width: `calc(100% - ${sidebarOpen ? '16rem' : '5rem'})`,
                transition: 'margin-left 0.3s ease, width 0.3s ease'
              }}
            >
              <DashNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <main className="contentContainer">
                <Outlet />
              </main>
            </div>
          </div>
        );
      }
    }    
export default LayoutDash;
