import React from 'react';
import { Link } from 'react-router-dom';
import '../AgronomistStyles/AgroSideBar.css';
import AgriLink_Logo from '../assets/AgriLink_Logo.png';
import { 
  Users, Calendar, AlertTriangle, TrendingUp, Bug,
  Sliders, CloudLightning, BookOpen, FileText, Award, BookMarked,
  FileBarChart, BarChart2, Activity, AlertOctagon, Menu
} from 'lucide-react';

const AgroSideBar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebarExpanded' : 'sidebarCollapsed'}`}>
      <div className="sidebarHeader">
        {sidebarOpen && (
          <div className='Img'>
            <img src={AgriLink_Logo} alt="AgriLink Logo"/>
            <h2 className="sidebarTitle">AgriLink</h2>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebarToggle">
          <Menu size={20} />
        </button> 
      </div>
      
      <div className="sidebarContent">
        <SidebarItem to="/farmers" icon={<Users size={20} />} text="Farmer Oversight" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/calendar" icon={<Calendar size={20} />} text="Calendar" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/alerts" icon={<AlertTriangle size={20} />} text="Alerts" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/performance" icon={<TrendingUp size={20} />} text="Performance" sidebarOpen={sidebarOpen} />
        
        <div className="sidebarSectionHeader">
          {sidebarOpen && "ADVISORY TOOLS"}
        </div>
        <SidebarItem to="/soil" icon={<Activity size={20} />} text="Soil Analysis" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/pests" icon={<Bug size={20} />} text="Pest & Disease" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/inputs" icon={<Sliders size={20} />} text="Input Optimization" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/climate" icon={<CloudLightning size={20} />} text="Climate Tools" sidebarOpen={sidebarOpen} />
        
        <div className="sidebarSectionHeader">
          {sidebarOpen && "KNOWLEDGE"}
        </div>
        <SidebarItem to="/practices" icon={<BookOpen size={20} />} text="Best Practices" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/training" icon={<FileText size={20} />} text="Training Materials" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/success" icon={<Award size={20} />} text="Success Stories" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/guidelines" icon={<BookMarked size={20} />} text="Guidelines" sidebarOpen={sidebarOpen} />
        
        <div className="sidebarSectionHeader">
          {sidebarOpen && "REPORTING"}
        </div>
        <SidebarItem to="/reporting" icon={<FileBarChart size={20} />} text="Performance" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/impact" icon={<BarChart2 size={20} />} text="Impact Assessment" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/tracking" icon={<Activity size={20} />} text="Intervention Tracking" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/problems" icon={<AlertOctagon size={20} />} text="Problem Areas" sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
};

// Sidebar item component using Link
const SidebarItem = ({ to, icon, text, sidebarOpen }) => (
  <Link to={to} className="sidebarItem">
    <div className="itemIcon">{icon}</div>
    {sidebarOpen && <span className="itemText">{text}</span>}
  </Link>
);

export default AgroSideBar;
