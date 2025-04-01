import { useState } from "react"
import { CheckCircle, Clock, CreditCard, FileText, Filter, Search, ShoppingCart, XCircle } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "../Charts/Charts.jsx"
import "../BuyersDashStyles/TransactionManagement.css"

function TransactionManagement() {
  const [activeTab, setActiveTab] = useState("volume")

  return (
    <div className="transaction-management">
      <div className="transaction-management-header">
        <h1 className="transaction-management-title">Transaction Management</h1>
        <p className="transaction-management-subtitle">Track and manage your orders from placement to delivery</p>
      </div>

      <div className="transaction-management-content">
        <div className="transaction-management-main">
          <div className="transaction-management-card">
            <div className="transaction-management-card-header">
              <div className="transaction-management-card-title-wrapper">
                <h2 className="transaction-management-card-title">
                  <ShoppingCart size={18} className="transaction-management-card-icon" />
                  Orders
                </h2>
              </div>
              <div className="transaction-management-card-actions">
                <button className="transaction-management-card-action-button">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="transaction-management-card-action-button">Export</button>
              </div>
            </div>
            <div className="transaction-management-card-content">
              <div className="transaction-management-search-row">
                <div className="transaction-management-search">
                  <Search size={18} className="transaction-management-search-icon" />
                  <input type="text" placeholder="Search orders..." className="transaction-management-search-input" />
                </div>
                <select className="transaction-management-select">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="transaction-management-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Supplier</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "KGL-1234",
                        supplier: "Musanze Coffee Cooperative",
                        date: "2023-06-12",
                        amount: "3,450,000 RWF",
                        status: "Delivered",
                      },
                      {
                        id: "KGL-1235",
                        supplier: "Eastern Tea Growers",
                        date: "2023-06-14",
                        amount: "1,290,000 RWF",
                        status: "Shipped",
                      },
                      {
                        id: "KGL-1236",
                        supplier: "Southern Maize Farmers",
                        date: "2023-06-15",
                        amount: "2,800,000 RWF",
                        status: "Processing",
                      },
                      {
                        id: "KGL-1237",
                        supplier: "Karongi Bean Producers",
                        date: "2023-06-16",
                        amount: "4,200,000 RWF",
                        status: "Pending",
                      },
                      {
                        id: "KGL-1238",
                        supplier: "Rwamagana Cassava Coop",
                        date: "2023-06-18",
                        amount: "1,850,000 RWF",
                        status: "Cancelled",
                      },
                    ].map((order) => (
                      <tr key={order.id}>
                        <td className="font-medium">{order.id}</td>
                        <td>{order.supplier}</td>
                        <td>{order.date}</td>
                        <td>{order.amount}</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "Delivered"
                                ? "badge-green"
                                : order.status === "Shipped"
                                  ? "badge-blue"
                                  : order.status === "Processing"
                                    ? "badge-amber"
                                    : order.status === "Pending"
                                      ? "badge-purple"
                                      : "badge-red"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="text-right">
                          <button className="transaction-management-view-button">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="transaction-management-card">
            <div className="transaction-management-card-header">
              <h2 className="transaction-management-card-title">Transaction Analytics</h2>
              <select
                className="transaction-management-card-select"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="trends">Trends</option>
                <option value="suppliers">Top Suppliers</option>
              </select>
            </div>
            <div className="transaction-management-card-content">
              {activeTab === "volume" && (
                <div className="transaction-management-chart" style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { name: "Jan", value: 400000000 },
                        { name: "Feb", value: 300000000 },
                        { name: "Mar", value: 500000000 },
                        { name: "Apr", value: 278000000 },
                        { name: "May", value: 189000000 },
                        { name: "Jun", value: 239000000 },
                        { name: "Jul", value: 349000000 },
                        { name: "Aug", value: 400000000 },
                        { name: "Sep", value: 520000000 },
                        { name: "Oct", value: 580000000 },
                        { name: "Nov", value: 600000000 },
                        { name: "Dec", value: 650000000 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#b45309" fill="#fcd34d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeTab === "trends" && (
                <div className="transaction-management-trends">
                  <div className="transaction-management-trend-card">
                    <div className="transaction-management-trend-title">Average Order Value</div>
                    <div className="transaction-management-trend-value">2,450,000 RWF</div>
                    <div className="transaction-management-trend-change positive">+12% from last month</div>
                  </div>

                  <div className="transaction-management-trend-card">
                    <div className="transaction-management-trend-title">Order Frequency</div>
                    <div className="transaction-management-trend-value">4.2/week</div>
                    <div className="transaction-management-trend-change positive">+8% from last month</div>
                  </div>

                  <div className="transaction-management-trend-card">
                    <div className="transaction-management-trend-title">Fulfillment Time</div>
                    <div className="transaction-management-trend-value">3.5 days</div>
                    <div className="transaction-management-trend-change negative">-15% from last month</div>
                  </div>
                </div>
              )}

              {activeTab === "suppliers" && (
                <div className="transaction-management-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Supplier</th>
                        <th>Orders</th>
                        <th>Value</th>
                        <th>Reliability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Musanze Coffee Cooperative",
                          orders: 45,
                          value: "125,450,000 RWF",
                          reliability: "98%",
                        },
                        { name: "Eastern Tea Growers", orders: 38, value: "98,720,000 RWF", reliability: "95%" },
                        { name: "Southern Maize Farmers", orders: 32, value: "87,600,000 RWF", reliability: "97%" },
                        { name: "Karongi Bean Producers", orders: 28, value: "76,300,000 RWF", reliability: "94%" },
                        { name: "Rwamagana Cassava Coop", orders: 25, value: "68,450,000 RWF", reliability: "96%" },
                      ].map((supplier) => (
                        <tr key={supplier.name}>
                          <td className="font-medium">{supplier.name}</td>
                          <td>{supplier.orders}</td>
                          <td>{supplier.value}</td>
                          <td className="text-green">{supplier.reliability}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="transaction-management-sidebar">
          <div className="transaction-management-card">
            <div className="transaction-management-card-header">
              <h2 className="transaction-management-card-title">
                <CreditCard size={18} className="transaction-management-card-icon" />
                Payment Summary
              </h2>
            </div>
            <div className="transaction-management-card-content">
              <div className="transaction-management-summary">
                <div className="transaction-management-summary-item">
                  <span className="transaction-management-summary-label">Total Orders</span>
                  <span className="transaction-management-summary-value">324</span>
                </div>
                <div className="transaction-management-summary-item">
                  <span className="transaction-management-summary-label">Pending Payment</span>
                  <span className="transaction-management-summary-value text-amber">24,500,000 RWF</span>
                </div>
                <div className="transaction-management-summary-item">
                  <span className="transaction-management-summary-label">Paid This Month</span>
                  <span className="transaction-management-summary-value text-green">128,750,000 RWF</span>
                </div>
                <div className="transaction-management-summary-item">
                  <span className="transaction-management-summary-label">Overdue</span>
                  <span className="transaction-management-summary-value text-red">3,200,000 RWF</span>
                </div>
              </div>

              <div className="transaction-management-chart" style={{ height: "200px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Paid", value: 65 },
                        { name: "Pending", value: 25 },
                        { name: "Overdue", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      <Cell fill="#4d7c0f" />
                      <Cell fill="#b45309" />
                      <Cell fill="#dc2626" />
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="transaction-management-card">
            <div className="transaction-management-card-header">
              <h2 className="transaction-management-card-title">
                <FileText size={18} className="transaction-management-card-icon" />
                Quality Verification
              </h2>
            </div>
            <div className="transaction-management-card-content">
              <div className="transaction-management-verification">
                <div className="transaction-management-verification-item">
                  <div className="transaction-management-verification-icon green">
                    <CheckCircle size={18} />
                  </div>
                  <span className="transaction-management-verification-label">Verified</span>
                  <span className="transaction-management-verification-value">245</span>
                </div>

                <div className="transaction-management-verification-item">
                  <div className="transaction-management-verification-icon amber">
                    <Clock size={18} />
                  </div>
                  <span className="transaction-management-verification-label">Pending</span>
                  <span className="transaction-management-verification-value">68</span>
                </div>

                <div className="transaction-management-verification-item">
                  <div className="transaction-management-verification-icon red">
                    <XCircle size={18} />
                  </div>
                  <span className="transaction-management-verification-label">Rejected</span>
                  <span className="transaction-management-verification-value">11</span>
                </div>
              </div>

              <button className="btn-secondary transaction-management-button">View Reports</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionManagement;