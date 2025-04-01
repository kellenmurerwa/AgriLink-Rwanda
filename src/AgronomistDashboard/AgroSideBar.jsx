import { Link } from "react-router-dom"
import "../AgronomistStyles/AgroSideBar.css"
import AgriLink_Logo from "../assets/AgriLink_Logo.png"
import { Users, Calendar, AlertTriangle, TrendingUp, Bug, CloudLightning, BookOpen, Menu } from "lucide-react"

const AgroSideBar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={`sidebar ${sidebarOpen ? "sidebarExpanded" : "sidebarCollapsed"}`}>
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
        <SidebarItem to="/pests" icon={<Bug size={20} />} text="Pest & Disease" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/climate" icon={<CloudLightning size={20} />} text="Climate Tools" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/practices" icon={<BookOpen size={20} />} text="Best Practices" sidebarOpen={sidebarOpen} />
      </div>
    </div>
  )
}

// Sidebar item component using Link
const SidebarItem = ({ to, icon, text, sidebarOpen }) => (
  <Link to={to} className="sidebarItem">
    <div className="itemIcon">{icon}</div>
    {sidebarOpen && <span className="itemText">{text}</span>}
  </Link>
)

export default AgroSideBar

