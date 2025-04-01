import React, { useState } from "react"
import "../AgronomistStyles/AgroSoilAnalysis.css"
import {
  Users,
  Search,
  MapPin,
  Leaf,
  BarChart2,
  Calendar,
  AlertTriangle,
  Plus,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  X,
} from "lucide-react"

const Farmers = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [showRegionFilter, setShowRegionFilter] = useState(false)
  const [showCropFilter, setShowCropFilter] = useState(false)
  const [expandedFarmer, setExpandedFarmer] = useState(null)

  // Modal states
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showPerformanceModal, setShowPerformanceModal] = useState(false)
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedFarmer, setSelectedFarmer] = useState(null)

  const farmers = [
    {
      id: "F001",
      name: "Mugabo Jean",
      region: "Northern",
      location: "Musanze",
      crops: ["Corn", "Wheat"],
      area: "45 ha",
      performance: 92,
      lastVisit: "2025-03-15",
      alerts: 2,
      status: "active",
      contact: "+250 788 123 456",
      email: "mugabo.jean@example.com",
      notes: "Implementing new irrigation system. Scheduled follow-up visit for soil testing next month.",
    },
    {
      id: "F002",
      name: "Uwase Marie",
      region: "Central",
      location: "Kigali",
      crops: ["Soybeans", "Rice"],
      area: "38 ha",
      performance: 88,
      lastVisit: "2025-03-22",
      alerts: 1,
      status: "active",
      contact: "+250 788 234 567",
      email: "uwase.marie@example.com",
      notes: "Interested in organic certification. Provided information on certification process and requirements.",
    },
    {
      id: "F003",
      name: "Nshimiyimana David",
      region: "Southern",
      location: "Huye",
      crops: ["Wheat", "Barley"],
      area: "52 ha",
      performance: 76,
      lastVisit: "2025-03-10",
      alerts: 1,
      status: "active",
      contact: "+250 788 345 678",
      email: "nshimiyimana.david@example.com",
      notes: "Experiencing issues with soil erosion. Recommended contour plowing and cover crops.",
    },
    {
      id: "F004",
      name: "Mukamana Sarah",
      region: "Eastern",
      location: "Kayonza",
      crops: ["Corn", "Soybeans"],
      area: "41 ha",
      performance: 95,
      lastVisit: "2025-03-28",
      alerts: 1,
      status: "active",
      contact: "+250 788 456 789",
      email: "mukamana.sarah@example.com",
      notes:
        "High-performing farm with excellent crop rotation practices. Interested in precision agriculture technologies.",
    },
    {
      id: "F005",
      name: "Habimana Michel",
      region: "Western",
      location: "Rubavu",
      crops: ["Rice", "Vegetables"],
      area: "30 ha",
      performance: 81,
      lastVisit: "2025-03-05",
      alerts: 0,
      status: "inactive",
      contact: "+250 788 567 890",
      email: "habimana.michel@example.com",
      notes: "Currently inactive due to seasonal transition. Planning to resume activities next month.",
    },
  ]

  const regions = ["Northern", "Central", "Southern", "Eastern", "Western"]
  const crops = ["Corn", "Wheat", "Soybeans", "Rice", "Barley", "Vegetables"]

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || farmer.region === selectedRegion
    const matchesCrop = selectedCrop === "all" || farmer.crops.includes(selectedCrop)

    return matchesSearch && matchesRegion && matchesCrop
  })

  const toggleFarmerExpand = (id) => {
    if (expandedFarmer === id) {
      setExpandedFarmer(null)
    } else {
      setExpandedFarmer(id)
    }
  }

  const getPerformanceColor = (score) => {
    if (score >= 90) return "#2e7d32"
    if (score >= 80) return "#7cb342"
    if (score >= 70) return "#c0ca33"
    if (score >= 60) return "#fdd835"
    return "#f57c00"
  }

  const getStatusBadgeClass = (status) => {
    return status === "active" ? "statusBadge active" : "statusBadge inactive"
  }

  const handleScheduleVisit = (farmer, e) => {
    e.stopPropagation()
    setSelectedFarmer(farmer)
    setShowScheduleModal(true)
  }

  const handleViewPerformance = (farmer, e) => {
    e.stopPropagation()
    setSelectedFarmer(farmer)
    setShowPerformanceModal(true)
  }

  const handleViewAlerts = (farmer, e) => {
    e.stopPropagation()
    setSelectedFarmer(farmer)
    setShowAlertsModal(true)
  }

  const handleViewProfile = (farmer, e) => {
    e.stopPropagation()
    setSelectedFarmer(farmer)
    setShowProfileModal(true)
  }

  return (
    <div className="farmersContainer">
      <div className="farmersHeader">
        <div className="farmersTitle">
          <Users size={24} />
          <h2>Farmer Oversight</h2>
        </div>
        <div className="farmersActions">
          <div className="searchContainer">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search farmers by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filterContainer">
            <button className="filterButton" onClick={() => setShowRegionFilter(!showRegionFilter)}>
              <MapPin size={16} />
              <span>Region: {selectedRegion === "all" ? "All" : selectedRegion}</span>
              {showRegionFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showRegionFilter && (
              <div className="filterMenu">
                <button
                  className={`filterOption ${selectedRegion === "all" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedRegion("all")
                    setShowRegionFilter(false)
                  }}
                >
                  All Regions
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    className={`filterOption ${selectedRegion === region ? "active" : ""}`}
                    onClick={() => {
                      setSelectedRegion(region)
                      setShowRegionFilter(false)
                    }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filterContainer">
            <button className="filterButton" onClick={() => setShowCropFilter(!showCropFilter)}>
              <Leaf size={16} />
              <span>Crop: {selectedCrop === "all" ? "All" : selectedCrop}</span>
              {showCropFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showCropFilter && (
              <div className="filterMenu">
                <button
                  className={`filterOption ${selectedCrop === "all" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCrop("all")
                    setShowCropFilter(false)
                  }}
                >
                  All Crops
                </button>
                {crops.map((crop) => (
                  <button
                    key={crop}
                    className={`filterOption ${selectedCrop === crop ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCrop(crop)
                      setShowCropFilter(false)
                    }}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="addButton">
            <Plus size={16} />
            <span>Add Farmer</span>
          </button>
        </div>
      </div>

      <div className="farmersList">
        <div className="farmersListHeader">
          <div className="farmerId">ID</div>
          <div className="farmerName">Name</div>
          <div className="farmerRegion">Region</div>
          <div className="farmerCrops">Crops</div>
          <div className="farmerArea">Area</div>
          <div className="farmerPerformance">Performance</div>
          <div className="farmerLastVisit">Last Visit</div>
          <div className="farmerAlerts">Alerts</div>
          <div className="farmerStatus">Status</div>
          <div className="farmerActions">Actions</div>
        </div>

        {filteredFarmers.length === 0 ? (
          <div className="noFarmers">
            <p>No farmers found matching your criteria.</p>
          </div>
        ) : (
          filteredFarmers.map((farmer) => (
            <React.Fragment key={farmer.id}>
              <div
                className={`farmerRow ${expandedFarmer === farmer.id ? "expanded" : ""}`}
                onClick={() => toggleFarmerExpand(farmer.id)}
              >
                <div className="farmerId">{farmer.id}</div>
                <div className="farmerName">{farmer.name}</div>
                <div className="farmerRegion">{farmer.region}</div>
                <div className="farmerCrops">{farmer.crops.join(", ")}</div>
                <div className="farmerArea">{farmer.area}</div>
                <div className="farmerPerformance">
                  <div className="performanceBar">
                    <div
                      className="performanceBarFill"
                      style={{
                        width: `${farmer.performance}%`,
                        backgroundColor: getPerformanceColor(farmer.performance),
                      }}
                    ></div>
                    <span>{farmer.performance}</span>
                  </div>
                </div>
                <div className="farmerLastVisit">{farmer.lastVisit}</div>
                <div className="farmerAlerts">
                  {farmer.alerts > 0 ? (
                    <div className="alertBadge">
                      <AlertTriangle size={14} />
                      <span>{farmer.alerts}</span>
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </div>
                <div className="farmerStatus">
                  <span className={getStatusBadgeClass(farmer.status)}>
                    {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                  </span>
                </div>
                <div className="farmerActions">
                  {expandedFarmer === farmer.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {expandedFarmer === farmer.id && (
                <div className="farmerDetails">
                  <div className="detailsGrid">
                    <div className="detailSection">
                      <h4>Contact Information</h4>
                      <div className="detailItem">
                        <span className="detailLabel">Phone:</span>
                        <span className="detailValue">{farmer.contact}</span>
                      </div>
                      <div className="detailItem">
                        <span className="detailLabel">Email:</span>
                        <span className="detailValue">{farmer.email}</span>
                      </div>
                      <div className="detailItem">
                        <span className="detailLabel">Location:</span>
                        <span className="detailValue">{farmer.location}</span>
                      </div>
                    </div>

                    <div className="detailSection">
                      <h4>Farm Details</h4>
                      <div className="detailItem">
                        <span className="detailLabel">Total Area:</span>
                        <span className="detailValue">{farmer.area}</span>
                      </div>
                      <div className="detailItem">
                        <span className="detailLabel">Crops:</span>
                        <span className="detailValue">{farmer.crops.join(", ")}</span>
                      </div>
                      <div className="detailItem">
                        <span className="detailLabel">Status:</span>
                        <span className={getStatusBadgeClass(farmer.status)}>
                          {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="detailSection fullWidth">
                      <h4>Notes</h4>
                      <p className="farmerNotes">{farmer.notes}</p>
                    </div>
                  </div>

                  <div className="detailActions">
                    <button className="detailButton" onClick={(e) => handleScheduleVisit(farmer, e)}>
                      <Calendar size={16} />
                      <span>Schedule Visit</span>
                    </button>
                    <button className="detailButton" onClick={(e) => handleViewPerformance(farmer, e)}>
                      <BarChart2 size={16} />
                      <span>View Performance</span>
                    </button>
                    <button className="detailButton" onClick={(e) => handleViewAlerts(farmer, e)}>
                      <AlertTriangle size={16} />
                      <span>View Alerts</span>
                    </button>
                    <button className="detailButton" onClick={(e) => handleViewProfile(farmer, e)}>
                      <ExternalLink size={16} />
                      <span>Full Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>

      {/* Schedule Visit Modal */}
      {showScheduleModal && selectedFarmer && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <h3>Schedule Visit for {selectedFarmer.name}</h3>
              <button className="closeButton" onClick={() => setShowScheduleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modalContent">
              <div className="formGroup">
                <label>Visit Date</label>
                <input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="formGroup">
                <label>Visit Time</label>
                <input type="time" defaultValue="09:00" />
              </div>
              <div className="formGroup">
                <label>Visit Type</label>
                <select defaultValue="regular">
                  <option value="regular">Regular Check-up</option>
                  <option value="soil">Soil Testing</option>
                  <option value="pest">Pest Inspection</option>
                  <option value="harvest">Harvest Planning</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="formGroup">
                <label>Notes</label>
                <textarea rows="3" placeholder="Add any notes about this visit..."></textarea>
              </div>
            </div>
            <div className="modalFooter">
              <button className="cancelButton" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </button>
              <button
                className="saveButton"
                onClick={() => {
                  alert(`Visit scheduled for ${selectedFarmer.name}`)
                  setShowScheduleModal(false)
                }}
              >
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {showPerformanceModal && selectedFarmer && (
        <div className="modalOverlay">
          <div className="modal performanceModal">
            <div className="modalHeader">
              <h3>Performance Details - {selectedFarmer.name}</h3>
              <button className="closeButton" onClick={() => setShowPerformanceModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modalContent">
              <div className="performanceOverview">
                <div className="performanceScore">
                  <div
                    className="scoreCircle"
                    style={{
                      background: `conic-gradient(${getPerformanceColor(selectedFarmer.performance)} ${selectedFarmer.performance}%, #f0f0f0 0)`,
                    }}
                  >
                    <span>{selectedFarmer.performance}</span>
                  </div>
                  <div className="scoreLabel">Overall Score</div>
                </div>

                <div className="performanceMetrics">
                  <div className="metricItem">
                    <div className="metricLabel">Yield Efficiency</div>
                    <div className="metricBar">
                      <div className="metricFill" style={{ width: "85%", backgroundColor: "#2e7d32" }}></div>
                      <span>85%</span>
                    </div>
                  </div>
                  <div className="metricItem">
                    <div className="metricLabel">Crop Quality</div>
                    <div className="metricBar">
                      <div className="metricFill" style={{ width: "92%", backgroundColor: "#2e7d32" }}></div>
                      <span>92%</span>
                    </div>
                  </div>
                  <div className="metricItem">
                    <div className="metricLabel">Resource Management</div>
                    <div className="metricBar">
                      <div className="metricFill" style={{ width: "78%", backgroundColor: "#7cb342" }}></div>
                      <span>78%</span>
                    </div>
                  </div>
                  <div className="metricItem">
                    <div className="metricLabel">Sustainability</div>
                    <div className="metricBar">
                      <div className="metricFill" style={{ width: "88%", backgroundColor: "#2e7d32" }}></div>
                      <span>88%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="performanceHistory">
                <h4>Performance History</h4>
                <div className="historyChart">
                  <div className="chartBars">
                    <div className="chartBar">
                      <div className="barFill" style={{ height: "65%", backgroundColor: "#7cb342" }}></div>
                      <div className="barLabel">2022</div>
                      <div className="barValue">65</div>
                    </div>
                    <div className="chartBar">
                      <div className="barFill" style={{ height: "78%", backgroundColor: "#7cb342" }}></div>
                      <div className="barLabel">2023</div>
                      <div className="barValue">78</div>
                    </div>
                    <div className="chartBar">
                      <div className="barFill" style={{ height: "85%", backgroundColor: "#2e7d32" }}></div>
                      <div className="barLabel">2024</div>
                      <div className="barValue">85</div>
                    </div>
                    <div className="chartBar">
                      <div
                        className="barFill"
                        style={{
                          height: `${selectedFarmer.performance}%`,
                          backgroundColor: getPerformanceColor(selectedFarmer.performance),
                        }}
                      ></div>
                      <div className="barLabel">2025</div>
                      <div className="barValue">{selectedFarmer.performance}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="recommendationsSection">
                <h4>Recommendations</h4>
                <ul className="recommendationsList">
                  <li>Consider implementing crop rotation to improve soil health</li>
                  <li>Optimize irrigation schedule based on soil moisture data</li>
                  <li>Explore organic fertilizer options for sustainable farming</li>
                  <li>Schedule regular equipment maintenance to improve efficiency</li>
                </ul>
              </div>
            </div>
            <div className="modalFooter">
              <button className="cancelButton" onClick={() => setShowPerformanceModal(false)}>
                Close
              </button>
              <button
                className="saveButton"
                onClick={() => {
                  alert(`Performance report for ${selectedFarmer.name} downloaded`)
                  setShowPerformanceModal(false)
                }}
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Modal */}
      {showAlertsModal && selectedFarmer && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <h3>Alerts for {selectedFarmer.name}</h3>
              <button className="closeButton" onClick={() => setShowAlertsModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modalContent">
              <div className="farmerAlertsList">
                {selectedFarmer.id === "F001" && (
                  <>
                    <div className="farmerAlertItem critical">
                      <div className="alertIcon">
                        <AlertTriangle size={20} />
                      </div>
                      <div className="alertContent">
                        <h4>Pest Outbreak Detected</h4>
                        <p>Aphid infestation detected in corn field. Immediate action required.</p>
                        <span className="alertDate">2025-04-01</span>
                      </div>
                    </div>
                    <div className="farmerAlertItem critical">
                      <div className="alertIcon">
                        <AlertTriangle size={20} />
                      </div>
                      <div className="alertContent">
                        <h4>Disease Risk High</h4>
                        <p>Current weather conditions indicate high risk for fungal diseases in tomato field.</p>
                        <span className="alertDate">2025-03-28</span>
                      </div>
                    </div>
                  </>
                )}
                {selectedFarmer.id === "F002" && (
                  <div className="farmerAlertItem warning">
                    <div className="alertIcon">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="alertContent">
                      <h4>Low Soil Moisture</h4>
                      <p>Soil moisture levels are below optimal range in wheat field. Consider irrigation.</p>
                      <span className="alertDate">2025-03-30</span>
                    </div>
                  </div>
                )}
                {selectedFarmer.id === "F003" && (
                  <div className="farmerAlertItem info">
                    <div className="alertIcon">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="alertContent">
                      <h4>Fertilizer Application Due</h4>
                      <p>Scheduled fertilizer application for soybean field is due in 3 days.</p>
                      <span className="alertDate">2025-03-29</span>
                    </div>
                  </div>
                )}
                {selectedFarmer.id === "F004" && (
                  <div className="farmerAlertItem warning">
                    <div className="alertIcon">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="alertContent">
                      <h4>Nutrient Deficiency</h4>
                      <p>Potassium deficiency symptoms observed in potato field. Soil test recommended.</p>
                      <span className="alertDate">2025-03-27</span>
                    </div>
                  </div>
                )}
                {selectedFarmer.id === "F005" && (
                  <div className="noFarmerAlerts">
                    <p>No alerts for this farmer</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modalFooter">
              <button className="cancelButton" onClick={() => setShowAlertsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Profile Modal */}
      {showProfileModal && selectedFarmer && (
        <div className="modalOverlay">
          <div className="modal profileModal">
            <div className="modalHeader">
              <h3>Farmer Profile - {selectedFarmer.name}</h3>
              <button className="closeButton" onClick={() => setShowProfileModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modalContent">
              <div className="profileSection">
                <h4>Personal Information</h4>
                <div className="profileGrid">
                  <div className="profileItem">
                    <span className="profileLabel">Farmer ID:</span>
                    <span className="profileValue">{selectedFarmer.id}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Name:</span>
                    <span className="profileValue">{selectedFarmer.name}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Phone:</span>
                    <span className="profileValue">{selectedFarmer.contact}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Email:</span>
                    <span className="profileValue">{selectedFarmer.email}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Location:</span>
                    <span className="profileValue">{selectedFarmer.location}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Region:</span>
                    <span className="profileValue">{selectedFarmer.region}</span>
                  </div>
                </div>
              </div>

              <div className="profileSection">
                <h4>Farm Details</h4>
                <div className="profileGrid">
                  <div className="profileItem">
                    <span className="profileLabel">Total Area:</span>
                    <span className="profileValue">{selectedFarmer.area}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Crops:</span>
                    <span className="profileValue">{selectedFarmer.crops.join(", ")}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Status:</span>
                    <span className={getStatusBadgeClass(selectedFarmer.status)}>
                      {selectedFarmer.status.charAt(0).toUpperCase() + selectedFarmer.status.slice(1)}
                    </span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Performance:</span>
                    <span className="profileValue">{selectedFarmer.performance}%</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Last Visit:</span>
                    <span className="profileValue">{selectedFarmer.lastVisit}</span>
                  </div>
                  <div className="profileItem">
                    <span className="profileLabel">Active Alerts:</span>
                    <span className="profileValue">{selectedFarmer.alerts}</span>
                  </div>
                </div>
              </div>

              <div className="profileSection">
                <h4>Notes</h4>
                <p className="profileNotes">{selectedFarmer.notes}</p>
              </div>

              <div className="profileSection">
                <h4>Visit History</h4>
                <table className="profileTable">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Findings</th>
                      <th>Recommendations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedFarmer.lastVisit}</td>
                      <td>Regular Check-up</td>
                      <td>Crops developing well. Some minor pest issues noted.</td>
                      <td>Continue current practices. Monitor for pests.</td>
                    </tr>
                    <tr>
                      <td>2025-02-15</td>
                      <td>Soil Testing</td>
                      <td>Soil pH slightly low. Nitrogen levels adequate.</td>
                      <td>Apply lime to adjust pH. Maintain current fertilization.</td>
                    </tr>
                    <tr>
                      <td>2025-01-10</td>
                      <td>Planning Session</td>
                      <td>Discussed crop rotation for upcoming season.</td>
                      <td>Implement proposed rotation plan. Consider cover crops.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modalFooter">
              <button className="cancelButton" onClick={() => setShowProfileModal(false)}>
                Close
              </button>
              <button
                className="saveButton"
                onClick={() => {
                  alert(`Profile for ${selectedFarmer.name} downloaded`)
                  setShowProfileModal(false)
                }}
              >
                Download Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Farmers

