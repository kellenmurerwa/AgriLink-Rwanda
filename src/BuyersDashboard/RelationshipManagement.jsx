"use client"

import { useState } from "react"
import { FileText, MessageSquare, MoreHorizontal, Search, Star, Users } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "../Charts/Charts.jsx"
import "../BuyersDashStyles/RelationshipManagement.css"

function RelationshipManagement() {
  const [activeTab, setActiveTab] = useState("trends")

  return (
    <div className="relationship-management">
      <div className="relationship-management-header">
        <h1 className="relationship-management-title">Relationship Management</h1>
        <p className="relationship-management-subtitle">Manage your network of trusted farmers across Rwanda</p>
      </div>

      <div className="relationship-management-content">
        <div className="relationship-management-main">
          <div className="relationship-management-card">
            <div className="relationship-management-card-header">
              <div className="relationship-management-card-title-wrapper">
                <h2 className="relationship-management-card-title">
                  <Users size={18} className="relationship-management-card-icon" />
                  Preferred Farmer Network
                </h2>
              </div>
              <button className="btn-purple relationship-management-add-button">+ Add Farmer</button>
            </div>
            <div className="relationship-management-card-content">
              <div className="relationship-management-search">
                <Search size={18} className="relationship-management-search-icon" />
                <input type="text" placeholder="Search farmers..." className="relationship-management-search-input" />
              </div>

              <div className="relationship-management-table">
                <table>
                  <thead>
                    <tr>
                      <th>Farmer</th>
                      <th>Products</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Jean Mutabazi",
                        image: "/placeholder.svg?height=40&width=40&text=JM",
                        products: "Coffee, Maize",
                        rating: 4.8,
                        status: "Preferred",
                      },
                      {
                        name: "Claire Mugabo",
                        image: "/placeholder.svg?height=40&width=40&text=CM",
                        products: "Tea, Cassava",
                        rating: 4.5,
                        status: "Preferred",
                      },
                      {
                        name: "Eric Niyonzima",
                        image: "/placeholder.svg?height=40&width=40&text=EN",
                        products: "Coffee, Bananas",
                        rating: 4.7,
                        status: "Preferred",
                      },
                      {
                        name: "Alice Mukamana",
                        image: "/placeholder.svg?height=40&width=40&text=AM",
                        products: "Beans, Vegetables",
                        rating: 4.2,
                        status: "Standard",
                      },
                      {
                        name: "Paul Habimana",
                        image: "/placeholder.svg?height=40&width=40&text=PH",
                        products: "Fruits, Vegetables",
                        rating: 4.0,
                        status: "Standard",
                      },
                    ].map((farmer) => (
                      <tr key={farmer.name}>
                        <td>
                          <div className="relationship-management-farmer">
                            <img
                              src={farmer.image || "/placeholder.svg"}
                              alt={farmer.name}
                              className="relationship-management-farmer-image"
                            />
                            <span className="relationship-management-farmer-name">{farmer.name}</span>
                          </div>
                        </td>
                        <td>{farmer.products}</td>
                        <td>
                          <div className="relationship-management-rating">
                            <Star size={14} className="relationship-management-rating-star" />
                            <span>{farmer.rating}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${farmer.status === "Preferred" ? "badge-purple" : "badge-gray"}`}>
                            {farmer.status}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="relationship-management-actions">
                            <button className="relationship-management-action-button">
                              <MoreHorizontal size={16} />
                            </button>
                            <div className="relationship-management-action-menu">
                              <button className="relationship-management-action-menu-item">View Profile</button>
                              <button className="relationship-management-action-menu-item">Contact Farmer</button>
                              <button className="relationship-management-action-menu-item">View Contracts</button>
                              <button className="relationship-management-action-menu-item text-red">
                                Remove from Network
                              </button>
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

          <div className="relationship-management-card">
            <div className="relationship-management-card-header">
              <h2 className="relationship-management-card-title">Performance Metrics</h2>
              <select
                className="relationship-management-card-select"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="trends">Performance Trends</option>
                <option value="comparison">Supplier Comparison</option>
                <option value="metrics">Key Metrics</option>
              </select>
            </div>
            <div className="relationship-management-card-content">
              {activeTab === "trends" && (
                <div className="relationship-management-chart" style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: "Jan", Quality: 85, Reliability: 80, Communication: 75 },
                        { name: "Feb", Quality: 88, Reliability: 82, Communication: 78 },
                        { name: "Mar", Quality: 87, Reliability: 85, Communication: 80 },
                        { name: "Apr", Quality: 90, Reliability: 88, Communication: 82 },
                        { name: "May", Quality: 92, Reliability: 90, Communication: 85 },
                        { name: "Jun", Quality: 93, Reliability: 92, Communication: 88 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Quality" stroke="#7c3aed" />
                      <Line type="monotone" dataKey="Reliability" stroke="#4d7c0f" />
                      <Line type="monotone" dataKey="Communication" stroke="#0369a1" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeTab === "comparison" && (
                <div className="relationship-management-chart" style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      outerRadius={90}
                      data={[
                        { subject: "Quality", "Jean Mutabazi": 90, "Claire Mugabo": 85, "Eric Niyonzima": 88 },
                        { subject: "Reliability", "Jean Mutabazi": 95, "Claire Mugabo": 80, "Eric Niyonzima": 90 },
                        { subject: "Price", "Jean Mutabazi": 75, "Claire Mugabo": 90, "Eric Niyonzima": 85 },
                        { subject: "Communication", "Jean Mutabazi": 85, "Claire Mugabo": 88, "Eric Niyonzima": 80 },
                        { subject: "Delivery", "Jean Mutabazi": 92, "Claire Mugabo": 82, "Eric Niyonzima": 87 },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Jean Mutabazi"
                        dataKey="Jean Mutabazi"
                        stroke="#7c3aed"
                        fill="#7c3aed"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Claire Mugabo"
                        dataKey="Claire Mugabo"
                        stroke="#4d7c0f"
                        fill="#4d7c0f"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Eric Niyonzima"
                        dataKey="Eric Niyonzima"
                        stroke="#0369a1"
                        fill="#0369a1"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeTab === "metrics" && (
                <div className="relationship-management-metrics">
                  {[
                    { title: "Average Quality Score", value: "92%", change: "+5%", trend: "up" },
                    { title: "On-Time Delivery", value: "94%", change: "+3%", trend: "up" },
                    { title: "Contract Renewal Rate", value: "87%", change: "+12%", trend: "up" },
                    { title: "Average Response Time", value: "4.2 hours", change: "-15%", trend: "down" },
                    { title: "Quality Issue Rate", value: "2.1%", change: "-8%", trend: "down" },
                    { title: "Relationship Longevity", value: "3.5 years", change: "+18%", trend: "up" },
                  ].map((metric) => (
                    <div key={metric.title} className="relationship-management-metric-card">
                      <div className="relationship-management-metric-title">{metric.title}</div>
                      <div className="relationship-management-metric-value">{metric.value}</div>
                      <div
                        className={`relationship-management-metric-change ${metric.trend === "up" ? "positive" : "negative"}`}
                      >
                        {metric.change} from last year
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relationship-management-sidebar">
          <div className="relationship-management-card">
            <div className="relationship-management-card-header">
              <h2 className="relationship-management-card-title">
                <FileText size={18} className="relationship-management-card-icon" />
                Contract Management
              </h2>
            </div>
            <div className="relationship-management-card-content">
              <div className="relationship-management-contract-summary">
                <div className="relationship-management-contract-stat">
                  <div className="relationship-management-contract-stat-title">Active Contracts</div>
                  <div className="relationship-management-contract-stat-value">24</div>
                </div>
                <div className="relationship-management-contract-stat">
                  <div className="relationship-management-contract-stat-title">Pending Approval</div>
                  <div className="relationship-management-contract-stat-value text-amber">8</div>
                </div>
                <div className="relationship-management-contract-stat">
                  <div className="relationship-management-contract-stat-title">Expiring Soon</div>
                  <div className="relationship-management-contract-stat-value text-red">5</div>
                </div>
              </div>

              <div className="relationship-management-contract-list">
                <h3 className="relationship-management-contract-list-title">Recent Contracts</h3>
                {[
                  { name: "Jean Mutabazi", type: "Annual Supply", status: "Active", expiry: "Mar 2024" },
                  { name: "Claire Mugabo", type: "Seasonal", status: "Pending", expiry: "Sep 2023" },
                  { name: "Eric Niyonzima", type: "Annual Supply", status: "Active", expiry: "Jan 2024" },
                ].map((contract) => (
                  <div key={contract.name} className="relationship-management-contract-item">
                    <div className="relationship-management-contract-item-content">
                      <div className="relationship-management-contract-item-name">{contract.name}</div>
                      <div className="relationship-management-contract-item-details">
                        {contract.type} • Expires: {contract.expiry}
                      </div>
                    </div>
                    <span className={`badge ${contract.status === "Active" ? "badge-green" : "badge-amber"}`}>
                      {contract.status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="btn-purple relationship-management-button">Create New Contract</button>
            </div>
          </div>

          <div className="relationship-management-card">
            <div className="relationship-management-card-header">
              <h2 className="relationship-management-card-title">
                <MessageSquare size={18} className="relationship-management-card-icon" />
                Communication Tools
              </h2>
            </div>
            <div className="relationship-management-card-content">
              <div className="relationship-management-communication-summary">
                <div className="relationship-management-communication-stat">
                  <div className="relationship-management-communication-stat-title">Unread Messages</div>
                  <div className="relationship-management-communication-stat-value">12</div>
                </div>
                <div className="relationship-management-communication-stat">
                  <div className="relationship-management-communication-stat-title">Active Chats</div>
                  <div className="relationship-management-communication-stat-value">8</div>
                </div>
              </div>

              <div className="relationship-management-message-list">
                <h3 className="relationship-management-message-list-title">Recent Messages</h3>
                {[
                  { name: "Jean Mutabazi", message: "Coffee harvest will be ready next week", time: "2h ago" },
                  { name: "Claire Mugabo", message: "Can we discuss the new tea contract?", time: "5h ago" },
                  { name: "Eric Niyonzima", message: "Banana shipment confirmed for Monday", time: "1d ago" },
                ].map((message) => (
                  <div key={message.name} className="relationship-management-message-item">
                    <img
                      src="/placeholder.svg?height=40&width=40&text=JM"
                      alt={message.name}
                      className="relationship-management-message-item-image"
                    />
                    <div className="relationship-management-message-item-content">
                      <div className="relationship-management-message-item-header">
                        <div className="relationship-management-message-item-name">{message.name}</div>
                        <div className="relationship-management-message-item-time">{message.time}</div>
                      </div>
                      <div className="relationship-management-message-item-text">{message.message}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-purple relationship-management-button">Open Messenger</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelationshipManagement;