import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../BuyersDashboard/TopNav';
import SideNav from '../BuyersDashboard/SideNav';
import '../BuyersDashStyles/BuyersLayout.css';

const BuyersLayout = () => {
  {
    const [activeSection, setActiveSection] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
    return (
      <div className="dashboardContainer">
        <SideNav 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        <div className="mainContainer">
          <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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

export default BuyersLayout;