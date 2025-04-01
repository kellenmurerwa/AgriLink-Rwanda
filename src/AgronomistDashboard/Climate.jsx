import { useState } from "react"
import "../AgronomistStyles/Climate.css"
import {
  CloudLightning,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const Climate = () => {
  const [timeRange, setTimeRange] = useState("week")
  const [showTimeMenu, setShowTimeMenu] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("region1")
  const [showRegionMenu, setShowRegionMenu] = useState(false)

  // Sample data for charts
  const temperatureData = {
    week: [
      { day: "Mon", actual: 28, forecast: 27, historical: 26 },
      { day: "Tue", actual: 29, forecast: 30, historical: 27 },
      { day: "Wed", actual: 31, forecast: 32, historical: 28 },
      { day: "Thu", actual: 33, forecast: 33, historical: 29 },
      { day: "Fri", actual: 32, forecast: 31, historical: 28 },
      { day: "Sat", actual: 30, forecast: 29, historical: 27 },
      { day: "Sun", actual: 29, forecast: 28, historical: 26 },
    ],
    month: [
      { day: "Week 1", actual: 29, forecast: 28, historical: 27 },
      { day: "Week 2", actual: 31, forecast: 30, historical: 28 },
      { day: "Week 3", actual: 32, forecast: 31, historical: 29 },
      { day: "Week 4", actual: 30, forecast: 29, historical: 28 },
    ],
    year: [
      { day: "Jan", actual: 25, forecast: 24, historical: 23 },
      { day: "Feb", actual: 26, forecast: 25, historical: 24 },
      { day: "Mar", actual: 28, forecast: 27, historical: 26 },
      { day: "Apr", actual: 30, forecast: 29, historical: 28 },
      { day: "May", actual: 32, forecast: 31, historical: 30 },
      { day: "Jun", actual: 33, forecast: 32, historical: 31 },
      { day: "Jul", actual: 34, forecast: 33, historical: 32 },
      { day: "Aug", actual: 33, forecast: 32, historical: 31 },
      { day: "Sep", actual: 31, forecast: 30, historical: 29 },
      { day: "Oct", actual: 29, forecast: 28, historical: 27 },
      { day: "Nov", actual: 27, forecast: 26, historical: 25 },
      { day: "Dec", actual: 25, forecast: 24, historical: 23 },
    ],
  }

  const rainfallData = {
    week: [
      { day: "Mon", actual: 0, forecast: 0, historical: 2 },
      { day: "Tue", actual: 5, forecast: 8, historical: 3 },
      { day: "Wed", actual: 10, forecast: 12, historical: 5 },
      { day: "Thu", actual: 2, forecast: 0, historical: 4 },
      { day: "Fri", actual: 0, forecast: 0, historical: 3 },
      { day: "Sat", actual: 0, forecast: 5, historical: 4 },
      { day: "Sun", actual: 8, forecast: 10, historical: 5 },
    ],
    month: [
      { day: "Week 1", actual: 15, forecast: 20, historical: 18 },
      { day: "Week 2", actual: 25, forecast: 22, historical: 20 },
      { day: "Week 3", actual: 10, forecast: 15, historical: 16 },
      { day: "Week 4", actual: 30, forecast: 25, historical: 22 },
    ],
    year: [
      { day: "Jan", actual: 50, forecast: 45, historical: 48 },
      { day: "Feb", actual: 45, forecast: 40, historical: 42 },
      { day: "Mar", actual: 60, forecast: 55, historical: 50 },
      { day: "Apr", actual: 65, forecast: 60, historical: 55 },
      { day: "May", actual: 40, forecast: 45, historical: 42 },
      { day: "Jun", actual: 20, forecast: 25, historical: 22 },
      { day: "Jul", actual: 10, forecast: 15, historical: 12 },
      { day: "Aug", actual: 15, forecast: 20, historical: 18 },
      { day: "Sep", actual: 35, forecast: 30, historical: 32 },
      { day: "Oct", actual: 55, forecast: 50, historical: 48 },
      { day: "Nov", actual: 60, forecast: 55, historical: 52 },
      { day: "Dec", actual: 70, forecast: 65, historical: 60 },
    ],
  }

  const regions = [
    { id: "region1", name: "Northern Region" },
    { id: "region2", name: "Central Region" },
    { id: "region3", name: "Southern Region" },
    { id: "region4", name: "Eastern Region" },
    { id: "region5", name: "Western Region" },
  ]

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Heavy Rainfall Expected",
      message:
        "Heavy rainfall expected in Northern Region over the next 48 hours. Potential for flooding in low-lying areas.",
      date: "2025-04-02",
    },
    {
      id: 2,
      type: "critical",
      title: "Drought Conditions",
      message:
        "Prolonged drought conditions in Southern Region. Farmers advised to implement water conservation measures.",
      date: "2025-04-01",
    },
    {
      id: 3,
      type: "info",
      title: "Optimal Planting Conditions",
      message: "Weather conditions in Central Region are optimal for planting maize and beans in the coming week.",
      date: "2025-03-30",
    },
  ]

  return (
    <div className="climateContainer">
      <div className="climateHeader">
        <div className="climateTitle">
          <CloudLightning size={24} />
          <h2>Climate Tools & Analytics</h2>
        </div>
        <div className="climateActions">
          <div className="regionContainer">
            <button className="regionButton" onClick={() => setShowRegionMenu(!showRegionMenu)}>
              <span>{regions.find((r) => r.id === selectedRegion)?.name || "Select Region"}</span>
              {showRegionMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showRegionMenu && (
              <div className="regionMenu">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    className={`regionOption ${selectedRegion === region.id ? "active" : ""}`}
                    onClick={() => {
                      setSelectedRegion(region.id)
                      setShowRegionMenu(false)
                    }}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            )}
          </div>
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
            <span>Export Data</span>
          </button>
        </div>
      </div>

      <div className="climateGrid">
        <div className="chartCard">
          <div className="chartHeader">
            <div className="chartTitle">
              <Thermometer size={20} />
              <h3>Temperature Trends</h3>
            </div>
            <div className="chartLegend">
              <div className="legendItem">
                <span className="legendColor" style={{ backgroundColor: "#f44336" }}></span>
                <span>Actual</span>
              </div>
              <div className="legendItem">
                <span className="legendColor" style={{ backgroundColor: "#ff9800" }}></span>
                <span>Forecast</span>
              </div>
              <div className="legendItem">
                <span className="legendColor" style={{ backgroundColor: "#2196f3" }}></span>
                <span>Historical Avg</span>
              </div>
            </div>
          </div>
          <div className="chartContainer">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData[timeRange]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#f44336" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="forecast" stroke="#ff9800" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="historical" stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chartCard">
          <div className="chartHeader">
            <div className="chartTitle">
              <Droplets size={20} />
              <h3>Rainfall Analysis</h3>
            </div>
            <div className="chartLegend">
              <div className="legendItem">
                <span className="legendColor" style={{ backgroundColor: "#4caf50" }}></span>
                <span>Actual</span>
              </div>
              <div className="legendItem">
                <span className="legendColor" style={{ backgroundColor: "#8bc34a" }}></span>
                <span>Forecast</span>
              </div>
              <div className="legendItem">
                <span className="legendColor" style={{ backgroundColor: "#2196f3" }}></span>
                <span>Historical Avg</span>
              </div>
            </div>
          </div>
          <div className="chartContainer">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rainfallData[timeRange]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Bar dataKey="actual" fill="#4caf50" />
                <Bar dataKey="forecast" fill="#8bc34a" />
                <Bar dataKey="historical" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="alertsCard">
          <div className="alertsHeader">
            <h3>Weather Alerts & Advisories</h3>
          </div>
          <div className="alertsList">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alertItem ${alert.type}`}>
                <div className="alertIcon">
                  <AlertTriangle size={20} />
                </div>
                <div className="alertContent">
                  <h4>{alert.title}</h4>
                  <p>{alert.message}</p>
                  <span className="alertDate">{alert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="forecastCard">
          <div className="forecastHeader">
            <h3>7-Day Forecast</h3>
            <span className="regionName">{regions.find((r) => r.id === selectedRegion)?.name}</span>
          </div>
          <div className="forecastGrid">
            {[...Array(7)].map((_, index) => {
              const date = new Date()
              date.setDate(date.getDate() + index)
              const day = date.toLocaleDateString("en-US", { weekday: "short" })
              const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

              // Generate some random weather data
              const temp = Math.floor(Math.random() * 10) + 25 // 25-35°C
              const rainfall = Math.floor(Math.random() * 20) // 0-20mm
              const humidity = Math.floor(Math.random() * 30) + 50 // 50-80%
              const windSpeed = Math.floor(Math.random() * 15) + 5 // 5-20 km/h

              return (
                <div key={index} className="forecastDay">
                  <div className="forecastDayHeader">
                    <span className="forecastDayName">{day}</span>
                    <span className="forecastDayDate">{dateStr}</span>
                  </div>
                  <div className="forecastDayIcon">
                    {rainfall > 10 ? <CloudLightning size={36} /> : <div className="sunIcon"></div>}
                  </div>
                  <div className="forecastDayTemp">
                    <Thermometer size={16} />
                    <span>{temp}°C</span>
                  </div>
                  <div className="forecastDayRain">
                    <Droplets size={16} />
                    <span>{rainfall}mm</span>
                  </div>
                  <div className="forecastDayWind">
                    <Wind size={16} />
                    <span>{windSpeed} km/h</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Climate

