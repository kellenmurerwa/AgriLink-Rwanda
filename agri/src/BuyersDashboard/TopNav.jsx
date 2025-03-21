import React, { useState } from 'react';
import { Bell, Search,Settings, User, ChevronDown, Moon, Sun } from 'lucide-react';
import '../BuyersDashStyles/TopNav.css';
import UserProfile from "../components/UserProfile";
const TopNav = ({ sidebarOpen }) => {
  return (
<div className="topNav" style={{ marginLeft: sidebarOpen ? '16rem' : '5rem' }}>
      <div className="navLeft">
        <h1 className="pageTitle">Buyer's Dashboard</h1>
      </div>
      <div className="navRight">
        <div className="searchContainer">
          <input 
            type="text" 
            placeholder="Search..." 
            className="searchInput"
          />
          <Search size={18} className="searchIcon" />
        </div>
        <div className="notificationContainer">
          <Bell size={20} className="notificationIcon" />
          <div className="notificationBadge">3</div>
        </div>
        <div className="colorModeContainer">
          <Moon size={20} className="colorModeIcon" />
        </div>
        <div className="userProfileContainer">
        <UserProfile />
      
        </div>
      </div>
    </div>
  );
};



export default TopNav;