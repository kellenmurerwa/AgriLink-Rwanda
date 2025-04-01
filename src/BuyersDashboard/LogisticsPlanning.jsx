import { useState } from "react"
import { Calendar, Clock, MapPin, MoreHorizontal, Route, Truck, Warehouse } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "../Charts/Charts.jsx"
import "../BuyersDashStyles/LogisticsPlanning.css"

 function LogisticsPlanning() {
  const [activeTab, setActiveTab] = useState("map")

  return (
    <div className="logistics-planning">
      <div className="logistics-planning-header">
        <h1 className="logistics-planning-title">Logistics Planning</h1>
        <p className="logistics-planning-subtitle">Manage transportation, storage, and distribution across Rwanda</p>
      </div>

      <div className="logistics-planning-content">
        <div className="logistics-planning-main">
          <div className="logistics-planning-card">
            <div className="logistics-planning-card-header">
              <div className="logistics-planning-card-title-wrapper">
                <h2 className="logistics-planning-card-title">
                  <Truck size={18} className="logistics-planning-card-icon" />
                  Transportation Schedule
                </h2>
              </div>
              <button className="btn-accent logistics-planning-add-button">+ Add Shipment</button>
            </div>
            <div className="logistics-planning-card-content">
              <div className="logistics-planning-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "KGL-1234",
                        origin: "Musanze Coffee Cooperative",
                        destination: "Kigali Warehouse",
                        date: "Today, 2:30 PM",
                        status: "In Transit",
                      },
                      {
                        id: "KGL-1235",
                        origin: "Eastern Tea Growers",
                        destination: "Nyagatare Distribution",
                        date: "Tomorrow, 9:00 AM",
                        status: "Scheduled",
                      },
                      {
                        id: "KGL-1236",
                        origin: "Southern Maize Farmers",
                        destination: "Huye Processing",
                        date: "Tomorrow, 1:00 PM",
                        status: "Scheduled",
                      },
                      {
                        id: "KGL-1237",
                        origin: "Karongi Bean Producers",
                        destination: "Kigali Warehouse",
                        date: "Jun 24, 10:30 AM",
                        status: "Scheduled",
                      },
                      {
                        id: "KGL-1238",
                        origin: "Rwamagana Cassava Coop",
                        destination: "Rwamagana Distribution",
                        date: "Jun 24, 3:00 PM",
                        status: "Scheduled",
                      },
                    ].map((shipment) => (
                      <tr key={shipment.id}>
                        <td className="font-medium">{shipment.id}</td>
                        <td>{shipment.origin}</td>
                        <td>{shipment.destination}</td>
                        <td>
                          <div className="logistics-planning-date">
                            <Calendar size={14} className="logistics-planning-date-icon" />
                            <span>{shipment.date}</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              shipment.status === "In Transit"
                                ? "badge-blue"
                                : shipment.status === "Scheduled"
                                  ? "badge-purple"
                                  : "badge-green"
                            }`}
                          >
                            {shipment.status}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="logistics-planning-actions">
                            <button className="logistics-planning-action-button">
                              <MoreHorizontal size={16} />
                            </button>
                            <div className="logistics-planning-action-menu">
                              <button className="logistics-planning-action-menu-item">View Details</button>
                              <button className="logistics-planning-action-menu-item">Edit Schedule</button>
                              <button className="logistics-planning-action-menu-item">Track Shipment</button>
                              <button className="logistics-planning-action-menu-item text-red">Cancel Shipment</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="logistics-planning-card">
            <div className="logistics-planning-card-header">
              <h2 className="logistics-planning-card-title">
                <Route size={18} className="logistics-planning-card-icon" />
                Route Optimization
              </h2>
              <select
                className="logistics-planning-card-select"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="map">Map View</option>
                <option value="list">List View</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>
            <div className="logistics-planning-card-content">
              {activeTab === "map" && (
                <div className="logistics-planning-map-view">
                  <img
                    src="/placeholder.svg?height=400&width=800&text=Rwanda+Routes+Map"
                    alt="Rwanda Routes Map"
                    className="logistics-planning-map-image"
                  />
                  <div className="logistics-planning-map-overlay">
                    <p>Interactive route map showing optimized routes for multiple pickups across Rwanda</p>
                    <button className="btn-accent">View Full Map</button>
                  </div>
                </div>
              )}

              {activeTab === "list" && (
                <div className="logistics-planning-routes">
                  {[
                    { name: "Route A: Kigali to Musanze", stops: 5, distance: "78 km", time: "2h 45m", savings: "22%" },
                    {
                      name: "Route B: Kigali to Nyagatare",
                      stops: 4,
                      distance: "62 km",
                      time: "2h 10m",
                      savings: "18%",
                    },
                    { name: "Route C: Kigali to Huye", stops: 6, distance: "95 km", time: "3h 20m", savings: "25%" },
                  ].map((route) => (
                    <div key={route.name} className="logistics-planning-route-card">
                      <div className="logistics-planning-route-header">
                        <h3 className="logistics-planning-route-title">{route.name}</h3>
                        <span className="badge badge-blue">Optimized</span>
                      </div>
                      <div className="logistics-planning-route-details">
                        <div className="logistics-planning-route-detail">
                          <span className="logistics-planning-route-label">Stops:</span> {route.stops}
                        </div>
                        <div className="logistics-planning-route-detail">
                          <span className="logistics-planning-route-label">Distance:</span> {route.distance}
                        </div>
                        <div className="logistics-planning-route-detail">
                          <span className="logistics-planning-route-label">Est. Time:</span> {route.time}
                        </div>
                        <div className="logistics-planning-route-detail">
                          <span className="logistics-planning-route-label">Fuel Savings:</span>{" "}
                          <span className="text-green">{route.savings}</span>
                        </div>
                      </div>
                      <div className="logistics-planning-route-footer">
                        <button className="logistics-planning-route-button">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="logistics-planning-chart" style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Kigali-Musanze", Before: 100, After: 78 },
                        { name: "Kigali-Nyagatare", Before: 80, After: 62 },
                        { name: "Kigali-Huye", Before: 120, After: 95 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar name="Before Optimization (km)" dataKey="Before" fill="#94a3b8" />
                      <Bar name="After Optimization (km)" dataKey="After" fill="#0369a1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="logistics-planning-sidebar">
          <div className="logistics-planning-card">
            <div className="logistics-planning-card-header">
              <h2 className="logistics-planning-card-title">
                <Warehouse size={18} className="logistics-planning-card-icon" />
                Storage Facilities
              </h2>
            </div>
            <div className="logistics-planning-card-content">
              <div className="logistics-planning-storage">
                {[
                  {
                    name: "Kigali Central Warehouse",
                    capacity: 75,
                    available: 25,
                    temp: "34-38°F",
                    humidity: "85-90%",
                  },
                  { name: "Nyagatare Distribution", capacity: 60, available: 40, temp: "33-36°F", humidity: "80-85%" },
                  { name: "Huye Processing Center", capacity: 85, available: 15, temp: "35-40°F", humidity: "75-80%" },
                  { name: "Rubavu Storage Facility", capacity: 50, available: 50, temp: "32-35°F", humidity: "85-90%" },
                ].map((facility) => (
                  <div key={facility.name} className="logistics-planning-storage-item">
                    <div className="logistics-planning-storage-header">
                      <h3 className="logistics-planning-storage-title">{facility.name}</h3>
                      <span
                        className={`badge ${
                          facility.available > 30
                            ? "badge-green"
                            : facility.available > 15
                              ? "badge-amber"
                              : "badge-red"
                        }`}
                      >
                        {facility.available}% Available
                      </span>
                    </div>
                    <div className="logistics-planning-storage-progress">
                      <div
                        className="logistics-planning-storage-progress-bar"
                        style={{ width: `${facility.capacity}%` }}
                      ></div>
                    </div>
                    <div className="logistics-planning-storage-details">
                      <span>Capacity: {facility.capacity}%</span>
                      <span>Temp: {facility.temp}</span>
                      <span>Humidity: {facility.humidity}</span>
                    </div>
                  </div>
                ))}

                <button className="btn-accent logistics-planning-button">Manage Storage</button>
              </div>
            </div>
          </div>

          <div className="logistics-planning-card">
            <div className="logistics-planning-card-header">
              <h2 className="logistics-planning-card-title">
                <MapPin size={18} className="logistics-planning-card-icon" />
                Collection Points
              </h2>
            </div>
            <div className="logistics-planning-card-content">
              <div className="logistics-planning-collection">
                {[
                  { name: "Northern Hub (Musanze)", farms: 12, nextCollection: "Today, 4:00 PM", status: "Active" },
                  { name: "Eastern Hub (Nyagatare)", farms: 8, nextCollection: "Tomorrow, 10:00 AM", status: "Active" },
                  { name: "Southern Hub (Huye)", farms: 15, nextCollection: "Jun 24, 9:00 AM", status: "Scheduled" },
                  { name: "Western Hub (Rubavu)", farms: 10, nextCollection: "Jun 25, 2:00 PM", status: "Scheduled" },
                ].map((hub) => (
                  <div key={hub.name} className="logistics-planning-collection-card">
                    <div className="logistics-planning-collection-header">
                      <h3 className="logistics-planning-collection-title">{hub.name}</h3>
                      <span className={`badge ${hub.status === "Active" ? "badge-green" : "badge-purple"}`}>
                        {hub.status}
                      </span>
                    </div>
                    <div className="logistics-planning-collection-details">
                      <div className="logistics-planning-collection-detail">
                        <span className="logistics-planning-collection-label">Farms:</span> {hub.farms} connected
                      </div>
                      <div className="logistics-planning-collection-detail">
                        <Clock size={14} className="logistics-planning-collection-icon" />
                        <span className="logistics-planning-collection-label">Next Collection:</span>{" "}
                        {hub.nextCollection}
                      </div>
                    </div>
                    <div className="logistics-planning-collection-footer">
                      <button className="logistics-planning-collection-button">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LogisticsPlanning;
