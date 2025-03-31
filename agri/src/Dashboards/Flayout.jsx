"use client"

import { useState } from "react"
import SideNavBar from "./SideNavBar"
import DashNavBar from "./DashNavBar"
import FarmerDashboard from "./FarmerDashboard"
import "../DashboardStyles/FLayout.css"

function FLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flayout-container">
      <SideNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flayout-main">
        <DashNavBar sidebarOpen={sidebarOpen} />
        <div className="flayout-content">
          <FarmerDashboard />
        </div>
      </div>
    </div>
  )
}

export default FLayout

