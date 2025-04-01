import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AgroSideBar from './AgroSidebar';
import AgroNavBar from '../AgronomistDashboard/AgroNavBar';
import '../AgronomistStyles/AgroLayout.css';

const AgroLayout = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboardContainer">
      <AgroSideBar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      <div className="mainContainer">
        <AgroNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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

export default AgroLayout;