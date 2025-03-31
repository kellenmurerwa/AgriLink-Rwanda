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
            />
            <div className="mainContainer">
              <DashNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <main 
                className="contentContainer" 
                style={{ marginLeft: sidebarOpen ? '16rem' : '5rem' }}
              >
                <Outlet />
              </main>
            </div>
          </div>
        );
      };
    }      
export default LayoutDash;
