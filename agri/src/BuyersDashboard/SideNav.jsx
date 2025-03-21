import React from 'react';
import { Link } from 'react-router-dom';
import '../BuyersDashStyles/SideNav.css';
import AgriLink_Logo from '../assets/AgriLink_Logo.png';
import { ShoppingBag, Calendar, Truck, Users, Menu } from 'lucide-react';  

const SideNav = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebarExpanded' : 'sidebarCollapsed'}`}>
      {/* Sidebar Header */}
      <div className="sidebarHeader">
        {sidebarOpen && (
          <div className='Img'>
            <img src={AgriLink_Logo} alt="AgriLink Logo" />
            <h2 className="sidebarTitle">AgriLink</h2>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebarToggle">
          <Menu size={20} />
        </button> 
      </div>
      
      {/* Sidebar Content with Links */}
      <div className="sidebarContent">
        <SidebarItem icon={<Calendar size={20} />} text="Transaction Management" path="/transactions" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<ShoppingBag size={20} />} text="Supply Discovery" path="/supply" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<Truck size={20} />} text="Logistics Planning" path="/logistics" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<Users size={20} />} text="Relationship Management" path="/relationships" sidebarOpen={sidebarOpen} />
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

export default SideNav;
