import { useState } from "react"
import "../AgronomistStyles/Alerts.css"
import { AlertTriangle, Filter, Check, X, ChevronDown, ChevronUp } from "lucide-react"

const Alerts = () => {
  const [filter, setFilter] = useState("all")
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [expandedAlerts, setExpandedAlerts] = useState(["1"]) // First alert expanded by default
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "critical",
      title: "Pest Outbreak Detected",
      message: "Aphid infestation detected in Farmer F001's corn field. Immediate action required.",
      farmerId: "F001",
      date: "2025-04-01",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Low Soil Moisture",
      message: "Soil moisture levels are below optimal range in Farmer F002's wheat field. Consider irrigation.",
      farmerId: "F002",
      date: "2025-03-30",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Fertilizer Application Due",
      message: "Scheduled fertilizer application for Farmer F003's soybean field is due in 3 days.",
      farmerId: "F003",
      date: "2025-03-29",
      read: true,
    },
    {
      id: "4",
      type: "critical",
      title: "Disease Risk High",
      message: "Current weather conditions indicate high risk for fungal diseases in Farmer F001's tomato field.",
      farmerId: "F001",
      date: "2025-03-28",
      read: false,
    },
    {
      id: "5",
      type: "warning",
      title: "Nutrient Deficiency",
      message: "Potassium deficiency symptoms observed in Farmer F004's potato field. Soil test recommended.",
      farmerId: "F004",
      date: "2025-03-27",
      read: true,
    },
  ])

  const toggleExpand = (id) => {
    if (expandedAlerts.includes(id)) {
      setExpandedAlerts(expandedAlerts.filter((alertId) => alertId !== id))
    } else {
      setExpandedAlerts([...expandedAlerts, id])
    }
  }

  const markAsRead = (id, e) => {
    e.stopPropagation()
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
  }

  const dismissAlert = (id, e) => {
    e.stopPropagation()
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "unread") return !alert.read
    return alert.type === filter
  })

  return (
    // <div className="dashboardContainer">
    //   <div className="mainContainer">
    //     <div className="contentContainer">  
               <div className="alertsContainer">
            <div className="alertsHeader">
              <div className="alertsTitle">
                <AlertTriangle size={24} />
                <h2>Alerts & Notifications</h2>
              </div>
              <div className="alertsActions">
                <div className="filterContainer">
                  <button className="filterButton" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                    <Filter size={16} />
                    <span>Filter</span>
                    {showFilterMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {showFilterMenu && (
                    <div className="filterMenu">
                      <button
                        className={`filterOption ${filter === "all" ? "active" : ""}`}
                        onClick={() => {
                          setFilter("all")
                          setShowFilterMenu(false)
                        }}
                      >
                        All Alerts
                      </button>
                      <button
                        className={`filterOption ${filter === "unread" ? "active" : ""}`}
                        onClick={() => {
                          setFilter("unread")
                          setShowFilterMenu(false)
                        }}
                      >
                        Unread
                      </button>
                      <button
                        className={`filterOption ${filter === "critical" ? "active" : ""}`}
                        onClick={() => {
                          setFilter("critical")
                          setShowFilterMenu(false)
                        }}
                      >
                        Critical
                      </button>
                      <button
                        className={`filterOption ${filter === "warning" ? "active" : ""}`}
                        onClick={() => {
                          setFilter("warning")
                          setShowFilterMenu(false)
                        }}
                      >
                        Warning
                      </button>
                      <button
                        className={`filterOption ${filter === "info" ? "active" : ""}`}
                        onClick={() => {
                          setFilter("info")
                          setShowFilterMenu(false)
                        }}
                      >
                        Information
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="alertsList">
              {filteredAlerts.length === 0 ? (
                <div className="noAlerts">
                  <p>No alerts to display</p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`alertItem ${alert.type} ${alert.read ? "read" : "unread"}`}
                    onClick={() => toggleExpand(alert.id)}
                  >
                    <div className="alertItemContent">
                      <div className="alertIcon">
                        <AlertTriangle size={20} />
                      </div>
                      <div className="alertInfo">
                        <h3>{alert.title}</h3>
                        <div className="alertMeta">
                          <span className="farmerId">Farmer: {alert.farmerId}</span>
                          <span className="alertDate">{alert.date}</span>
                        </div>
                      </div>
                      <div className="alertActions">
                        {!alert.read && (
                          <button
                            className="markReadButton"
                            onClick={(e) => markAsRead(alert.id, e)}
                            title="Mark as read"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button className="dismissButton" onClick={(e) => dismissAlert(alert.id, e)} title="Dismiss">
                          <X size={16} />
                        </button>
                        {expandedAlerts.includes(alert.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {expandedAlerts.includes(alert.id) && (
                      <div className="alertMessage">
                        <p>{alert.message}</p>
                        <div className="alertActionButtons">
                          <button className="takeActionButton">Take Action</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Alerts

