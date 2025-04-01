
import { useState } from "react"
import "../AgronomistStyles/Perfomance.css"
import { TrendingUp, Calendar, Download, ChevronDown, ChevronUp } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const Performance = () => {
  const [timeRange, setTimeRange] = useState("month")
  const [showTimeMenu, setShowTimeMenu] = useState(false)

  // Sample data for charts
  const monthlyData = [
    { name: "Jan", expected: 65, actual: 70 },
    { name: "Feb", expected: 59, actual: 55 },
    { name: "Mar", expected: 80, actual: 78 },
    { name: "Apr", expected: 81, actual: 84 },
    { name: "May", expected: 56, actual: 60 },
    { name: "Jun", expected: 55, actual: 59 },
    { name: "Jul", expected: 40, actual: 35 },
    { name: "Aug", expected: 65, actual: 63 },
    { name: "Sep", expected: 75, actual: 71 },
    { name: "Oct", expected: 85, actual: 80 },
    { name: "Nov", expected: 90, actual: 88 },
    { name: "Dec", expected: 95, actual: 92 },
  ]

  const weeklyData = [
    { name: "Week 1", expected: 65, actual: 70 },
    { name: "Week 2", expected: 59, actual: 55 },
    { name: "Week 3", expected: 80, actual: 78 },
    { name: "Week 4", expected: 81, actual: 84 },
  ]

  const yearlyData = [
    { name: "2022", expected: 75, actual: 72 },
    { name: "2023", expected: 80, actual: 78 },
    { name: "2024", expected: 85, actual: 82 },
    { name: "2025", expected: 90, actual: 88 },
  ]

  const chartData = {
    month: monthlyData,
    week: weeklyData,
    year: yearlyData,
  }

  const cropData = [
    { name: "Corn", value: 35 },
    { name: "Wheat", value: 25 },
    { name: "Soybeans", value: 20 },
    { name: "Rice", value: 15 },
    { name: "Other", value: 5 },
  ]

  const COLORS = ["#2e7d32", "#388e3c", "#43a047", "#4caf50", "#66bb6a"]

  const farmerPerformance = [
    { id: "F001", name: "John Smith", score: 92, crops: "Corn, Wheat", area: "45 ha" },
    { id: "F002", name: "Maria Garcia", score: 88, crops: "Soybeans, Rice", area: "38 ha" },
    { id: "F003", name: "David Lee", score: 76, crops: "Wheat, Barley", area: "52 ha" },
    { id: "F004", name: "Sarah Johnson", score: 95, crops: "Corn, Soybeans", area: "41 ha" },
    { id: "F005", name: "Michael Brown", score: 81, crops: "Rice, Vegetables", area: "30 ha" },
  ]

  return (
    <div className="performanceContainer">
      <div className="performanceHeader">
        <div className="performanceTitle">
          <TrendingUp size={24} />
          <h2>Performance Analytics</h2>
        </div>
        <div className="performanceActions">
          <div className="timeRangeContainer">
            <button className="timeRangeButton" onClick={() => setShowTimeMenu(!showTimeMenu)}>
              <Calendar size={16} />
              <span>{timeRange === "week" ? "Weekly" : timeRange === "month" ? "Monthly" : "Yearly"}</span>
              {showTimeMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showTimeMenu && (
              <div className="timeRangeMenu">
                <button
                  className={`timeRangeOption ${timeRange === "week" ? "active" : ""}`}
                  onClick={() => {
                    setTimeRange("week")
                    setShowTimeMenu(false)
                  }}
                >
                  Weekly
                </button>
                <button
                  className={`timeRangeOption ${timeRange === "month" ? "active" : ""}`}
                  onClick={() => {
                    setTimeRange("month")
                    setShowTimeMenu(false)
                  }}
                >
                  Monthly
                </button>
                <button
                  className={`timeRangeOption ${timeRange === "year" ? "active" : ""}`}
                  onClick={() => {
                    setTimeRange("year")
                    setShowTimeMenu(false)
                  }}
                >
                  Yearly
                </button>
              </div>
            )}
          </div>
          <button className="exportButton">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="chartsGrid">
        <div className="chartCard">
          <h3>Yield Performance</h3>
          <div className="chartContainer">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData[timeRange]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expected" stroke="#8bc34a" activeDot={{ r: 8 }} name="Expected Yield" />
                <Line type="monotone" dataKey="actual" stroke="#2e7d32" name="Actual Yield" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chartCard">
          <h3>Crop Distribution</h3>
          <div className="chartContainer">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cropData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chartCard fullWidth">
          <h3>Farmer Performance Comparison</h3>
          <div className="chartContainer">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={farmerPerformance} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#2e7d32" name="Performance Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="tableSection">
        <h3>Top Performing Farmers</h3>
        <div className="tableContainer">
          <table className="performanceTable">
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Name</th>
                <th>Performance Score</th>
                <th>Crops</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {farmerPerformance
                .sort((a, b) => b.score - a.score)
                .map((farmer) => (
                  <tr key={farmer.id}>
                    <td>{farmer.id}</td>
                    <td>{farmer.name}</td>
                    <td>
                      <div className="scoreBar">
                        <div
                          className="scoreBarFill"
                          style={{ width: `${farmer.score}%`, backgroundColor: getScoreColor(farmer.score) }}
                        ></div>
                        <span>{farmer.score}</span>
                      </div>
                    </td>
                    <td>{farmer.crops}</td>
                    <td>{farmer.area}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Helper function to get color based on score
const getScoreColor = (score) => {
  if (score >= 90) return "#2e7d32"
  if (score >= 80) return "#7cb342"
  if (score >= 70) return "#c0ca33"
  if (score >= 60) return "#fdd835"
  return "#f57c00"
}

export default Performance

