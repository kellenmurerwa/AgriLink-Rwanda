
import { BarChart3, Calendar, ShoppingCart, Truck, Users, Warehouse } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "./charts/Charts.jsx"
import "../BuyersDashStyles/DashboardOverview.css"

function DashboardOverview() {
  // Sample data for Rwanda
  const provinces = ["Kigali", "Eastern", "Western", "Northern", "Southern"]
  const crops = ["Coffee", "Tea", "Maize", "Beans", "Cassava", "Bananas"]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-actions">
          <div className="dashboard-date-selector">
            <button className="dashboard-date-button active">Today</button>
            <button className="dashboard-date-button">Week</button>
            <button className="dashboard-date-button">Month</button>
            <button className="dashboard-date-button">Year</button>
          </div>
          <button className="btn-primary">
            <Calendar size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ backgroundColor: "rgba(77, 124, 15, 0.1)" }}>
            <Users size={24} color="#4d7c0f" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-title">Total Farmers</h3>
            <p className="dashboard-stat-value">1,248</p>
            <p className="dashboard-stat-change positive">+12% from last month</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ backgroundColor: "rgba(180, 83, 9, 0.1)" }}>
            <ShoppingCart size={24} color="#b45309" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-title">Active Orders</h3>
            <p className="dashboard-stat-value">324</p>
            <p className="dashboard-stat-change positive">+4% from last week</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ backgroundColor: "rgba(3, 105, 161, 0.1)" }}>
            <Truck size={24} color="#0369a1" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-title">Shipments in Transit</h3>
            <p className="dashboard-stat-value">145</p>
            <p className="dashboard-stat-change positive">+18% from last month</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon" style={{ backgroundColor: "rgba(124, 58, 237, 0.1)" }}>
            <Warehouse size={24} color="#7c3aed" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-title">Storage Capacity</h3>
            <p className="dashboard-stat-value">68%</p>
            <p className="dashboard-stat-change negative">-7% from last week</p>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-card lg">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">
              <BarChart3 size={20} className="dashboard-card-icon" />
              Crop Production by Province
            </h2>
            <select className="dashboard-card-select">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>Last 3 Years</option>
            </select>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-chart" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Kigali", Coffee: 400, Tea: 240, Maize: 500 },
                    { name: "Eastern", Coffee: 300, Tea: 139, Maize: 800 },
                    { name: "Western", Coffee: 200, Tea: 980, Maize: 400 },
                    { name: "Northern", Coffee: 278, Tea: 390, Maize: 300 },
                    { name: "Southern", Coffee: 189, Tea: 480, Maize: 600 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Coffee" fill="#4d7c0f" />
                  <Bar dataKey="Tea" fill="#b45309" />
                  <Bar dataKey="Maize" fill="#0369a1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-card md">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">
              <ShoppingCart size={20} className="dashboard-card-icon" />
              Order Trends
            </h2>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-chart" style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: "Jan", Orders: 400 },
                    { name: "Feb", Orders: 300 },
                    { name: "Mar", Orders: 500 },
                    { name: "Apr", Orders: 278 },
                    { name: "May", Orders: 189 },
                    { name: "Jun", Orders: 239 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Orders" stroke="#b45309" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="dashboard-card md">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">
              <Warehouse size={20} className="dashboard-card-icon" />
              Storage Distribution
            </h2>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-chart" style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Coffee", value: 35 },
                      { name: "Tea", value: 25 },
                      { name: "Maize", value: 20 },
                      { name: "Beans", value: 10 },
                      { name: "Other", value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#4d7c0f" />
                    <Cell fill="#b45309" />
                    <Cell fill="#0369a1" />
                    <Cell fill="#7c3aed" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">
              <Users size={20} className="dashboard-card-icon" />
              Top Farmers
            </h2>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-table">
              <table>
                <thead>
                  <tr>
                    <th>Farmer</th>
                    <th>Location</th>
                    <th>Crops</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="dashboard-table-user">
                        <img src="/placeholder.svg?height=32&width=32&text=JM" alt="User" />
                        <span>Jean Mutabazi</span>
                      </div>
                    </td>
                    <td>Musanze, Northern</td>
                    <td>Coffee, Maize</td>
                    <td>
                      <div className="dashboard-table-rating">
                        <span className="dashboard-table-rating-value">4.8</span>
                        <span className="dashboard-table-rating-stars">★★★★★</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="dashboard-table-user">
                        <img src="/placeholder.svg?height=32&width=32&text=CM" alt="User" />
                        <span>Claire Mugabo</span>
                      </div>
                    </td>
                    <td>Rwamagana, Eastern</td>
                    <td>Tea, Cassava</td>
                    <td>
                      <div className="dashboard-table-rating">
                        <span className="dashboard-table-rating-value">4.7</span>
                        <span className="dashboard-table-rating-stars">★★★★★</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="dashboard-table-user">
                        <img src="/placeholder.svg?height=32&width=32&text=EN" alt="User" />
                        <span>Eric Niyonzima</span>
                      </div>
                    </td>
                    <td>Huye, Southern</td>
                    <td>Coffee, Bananas</td>
                    <td>
                      <div className="dashboard-table-rating">
                        <span className="dashboard-table-rating-value">4.6</span>
                        <span className="dashboard-table-rating-stars">★★★★★</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="dashboard-table-user">
                        <img src="/placeholder.svg?height=32&width=32&text=AM" alt="User" />
                        <span>Alice Mukamana</span>
                      </div>
                    </td>
                    <td>Rubavu, Western</td>
                    <td>Tea, Beans</td>
                    <td>
                      <div className="dashboard-table-rating">
                        <span className="dashboard-table-rating-value">4.5</span>
                        <span className="dashboard-table-rating-stars">★★★★★</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="dashboard-card-footer">
              <button className="dashboard-card-link">View All Farmers</button>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2 className="dashboard-card-title">
              <Truck size={20} className="dashboard-card-icon" />
              Recent Shipments
            </h2>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>KGL-1234</td>
                    <td>Musanze Coffee Coop</td>
                    <td>Kigali Warehouse</td>
                    <td>
                      <span className="badge badge-green">Delivered</span>
                    </td>
                  </tr>
                  <tr>
                    <td>KGL-1235</td>
                    <td>Eastern Tea Growers</td>
                    <td>Export Terminal</td>
                    <td>
                      <span className="badge badge-blue">In Transit</span>
                    </td>
                  </tr>
                  <tr>
                    <td>KGL-1236</td>
                    <td>Southern Maize Farmers</td>
                    <td>Kigali Processing</td>
                    <td>
                      <span className="badge badge-amber">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>KGL-1237</td>
                    <td>Western Cassava Coop</td>
                    <td>Rubavu Storage</td>
                    <td>
                      <span className="badge badge-red">Delayed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="dashboard-card-footer">
              <button className="dashboard-card-link">View All Shipments</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview;