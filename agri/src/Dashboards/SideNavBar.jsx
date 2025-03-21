import React from 'react';
import { Link } from 'react-router-dom';
import '../DashboardStyles/SideNavBar.css';
import AgriLink_Logo from '../assets/AgriLink_Logo.png';
import { 
  Users, Calendar, Home, TrendingUp, CloudLightning, BookOpen, Menu 
} from 'lucide-react';

const SideNavBar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebarExpanded' : 'sidebarCollapsed'}`}>
      <div className="sidebarHeader">
        {sidebarOpen && (
          <div className="Img">
            <img src={AgriLink_Logo} alt="AgriLink Logo" />
            <h2 className="sidebarTitle">AgriLink</h2>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebarToggle">
          <Menu size={20} />
        </button>
      </div>

      <div className="sidebarContent">
        <SidebarItem icon={<Home size={20} />} text="Overview" path="/farmer/overview" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<Calendar size={20} />} text="To-do" path="/farmer/todo" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<TrendingUp size={20} />} text="Performance" path="/farmer/performance" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<CloudLightning size={20} />} text="Weather Analysis" path="/farmer/weather" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<BookOpen size={20} />} text="Resources" path="/farmer/resources" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<Users size={20} />} text="Community" path="/farmer/community" sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
};

// Sidebar item component with Link for navigation
const SidebarItem = ({ icon, text, path, sidebarOpen }) => (
  <Link to={path} className="sidebarItem">
    <div className="itemIcon">{icon}</div>
    {sidebarOpen && <span className="itemText">{text}</span>}
  </Link>
);

export default SideNavBar;
