// "use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Cloud, Droplets, Leaf, Wind, Thermometer, Waves, ArrowUp, DollarSign, Crop, MapPin, X } from "lucide-react"
import "../DashboardStyles/FarmerDashboard.css"

function FarmerDashboard() {
  // Sample data
  const [overviewData, setOverviewData] = useState([
    { name: "Jan", expected: 65, actual: 78 },
    { name: "Feb", expected: 59, actual: 63 },
    { name: "Mar", expected: 80, actual: 71 },
    { name: "Apr", expected: 81, actual: 85 },
    { name: "May", expected: 56, actual: 60 },
    { name: "Jun", expected: 55, actual: 63 },
    { name: "Jul", expected: 60, actual: 58 },
    { name: "Aug", expected: 70, actual: 79 },
    { name: "Sep", expected: 65, actual: 70 },
    { name: "Oct", expected: 75, actual: 65 },
    { name: "Nov", expected: 60, actual: 63 },
    { name: "Dec", expected: 70, actual: 59 },
  ])

  const [yieldData, setYieldData] = useState([
    { name: "Crop 1", expected: 4000, actual: 3800 },
    { name: "Crop 2", expected: 3000, actual: 3200 },
    { name: "Crop 3", expected: 2000, actual: 1700 },
    { name: "Crop 4", expected: 1500, actual: 1200 },
  ])

  const [tasks, setTasks] = useState([
    { id: 1, name: "Soil Test", date: "Feb 17", area: "4.5 ha", status: "04/05/2023" },
    { id: 2, name: "Pest Crop", date: "Feb 22", area: "3.6 ha", status: "20/05/2023" },
    { id: 3, name: "Harvest", date: "Mar 5", area: "2 ha", status: "05/06/2023" },
    { id: 4, name: "Harvest", date: "Feb 5", area: "4.9 ha", status: "25/04/2023" },
  ])

  const [reminders, setReminders] = useState([
    { id: 1, priority: "Medium", task: "Irrigation", date: "Feb 17 (25)", status: "Due Today" },
    { id: 2, priority: "High", task: "Fertilizer", date: "Feb 22 (30)", status: "Due Tomorrow" },
    { id: 3, priority: "Medium", task: "Pesticide", date: "Mar 5 (41)", status: "Due Next Week" },
    { id: 4, priority: "Medium", task: "Pruning", date: "Feb 5 (13)", status: "Due Next Week" },
  ])

  const [soilDetails, setSoilDetails] = useState([
    { id: 1, name: "Soil Texture", value: "Silt Loam", phValue: "6.8" },
    { id: 2, name: "Organic Matter", value: "3.5 Ample", magnesium: "2.1" },
    { id: 3, name: "Buffer pH", value: "7.0", iron: "0.7" },
    { id: 4, name: "Add Test Here", value: "3.4", addTestHere: "0.3" },
    { id: 5, name: "Add Test Here", value: "2.5", addTestHere: "0.5" },
  ])

  // Modal states
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false)
  const [isAddSoilTestOpen, setIsAddSoilTestOpen] = useState(false)

  // Form states
  const [newTask, setNewTask] = useState({
    name: "",
    date: "",
    area: "",
    status: "",
  })

  const [newReminder, setNewReminder] = useState({
    priority: "Medium",
    task: "",
    date: "",
    status: "Due Next Week",
  })

  const [newSoilTest, setNewSoilTest] = useState({
    name: "",
    value: "",
    phValue: "",
  })

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.name && newTask.date && newTask.area && newTask.status) {
      setTasks([...tasks, { id: tasks.length + 1, ...newTask }])
      setNewTask({ name: "", date: "", area: "", status: "" })
      setIsAddTaskOpen(false)
    }
  }

  // Handle adding a new reminder
  const handleAddReminder = () => {
    if (newReminder.task && newReminder.date) {
      setReminders([...reminders, { id: reminders.length + 1, ...newReminder }])
      setNewReminder({
        priority: "Medium",
        task: "",
        date: "",
        status: "Due Next Week",
      })
      setIsAddReminderOpen(false)
    }
  }

  // Handle adding a new soil test
  const handleAddSoilTest = () => {
    if (newSoilTest.name && newSoilTest.value) {
      setSoilDetails([...soilDetails, { id: soilDetails.length + 1, ...newSoilTest }])
      setNewSoilTest({ name: "", value: "", phValue: "" })
      setIsAddSoilTestOpen(false)
    }
  }

  // Handle priority change for reminder
  const handlePriorityChange = (e) => {
    setNewReminder({ ...newReminder, priority: e.target.value })
  }

  // Handle status change for reminder
  const handleStatusChange = (e) => {
    setNewReminder({ ...newReminder, status: e.target.value })
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Farmer's Dashboard</h1>

        <div className="dashboard-grid">
          {/* Left sidebar with key metrics */}
          {/* <div className="sidebar">
            <div className="metric-card green">
              <div className="card-header">
                <h2 className="card-title">Total Area</h2>
              </div>
              <div className="card-content">
                <div className="metric-value">
                  <MapPin className="metric-icon" />
                  <span className="metric-number">15 ha</span>
                </div>
              </div>
            </div>

            <div className="metric-card green">
              <div className="card-header">
                <h2 className="card-title">Total Crop</h2>
              </div>
              <div className="card-content">
                <div className="metric-value">
                  <Crop className="metric-icon" />
                  <span className="metric-number">09 ha</span>
                </div>
              </div>
            </div>

            <div className="metric-card green">
              <div className="card-header">
                <h2 className="card-title">Total Yield</h2>
              </div>
              <div className="card-content">
                <div className="metric-value">
                  <Leaf className="metric-icon" />
                  <span className="metric-number">99 ton</span>
                </div>
              </div>
            </div>

            <div className="metric-card green">
              <div className="card-header">
                <h2 className="card-title">Total Revenue</h2>
              </div>
              <div className="card-content">
                <div className="metric-value">
                  <DollarSign className="metric-icon" />
                  <span className="metric-number">$15,000.00</span>
                </div>
              </div>
            </div>

            <div className="metric-card green">
              <div className="card-header">
                <h2 className="card-title">Hurricane</h2>
              </div>
              <div className="card-content">
                <div className="hurricane-values">
                  <div className="hurricane-value">
                    <Wind className="hurricane-icon" />
                    <span className="hurricane-speed">W 24mph</span>
                  </div>
                  <div className="hurricane-value">
                    <Wind className="hurricane-icon" />
                    <span className="hurricane-speed">NE 34mph</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Main content area */}
          <div className="main-content">
            <div className="charts-row">
              {/* Overview Chart */}
              <div className="chart-card">
                <div className="card-header">
                  <h2 className="card-title">Overview</h2>
                </div>
                <div className="card-content">
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={overviewData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="expected"
                          stroke="#82ca9d"
                          fillOpacity={1}
                          fill="url(#colorExpected)"
                        />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorActual)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Yield Chart */}
              <div className="chart-card">
                <div className="card-header">
                  <h2 className="card-title">Yield</h2>
                </div>
                <div className="card-content">
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={yieldData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="expected" fill="#82ca9d" name="Expected" />
                        <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-row">
              {/* Weather */}
              <div className="info-card">
                <div className="card-header">
                  <h2 className="card-title">Weather</h2>
                </div>
                <div className="card-content">
                  <div className="weather-container">
                    <div className="weather-row">
                      <div className="weather-day">
                        <Cloud className="weather-icon" />
                        <span>Today</span>
                      </div>
                      <div className="weather-date">
                        <div>Aug 28</div>
                      </div>
                    </div>

                    <div className="weather-row">
                      <div className="weather-condition">
                        <Thermometer className="weather-icon" />
                        <span>W 5 mph</span>
                      </div>
                      <div className="weather-temp">
                        <span>76</span>
                        <Droplets className="droplet-icon" />
                      </div>
                    </div>

                    <div className="weather-row">
                      <div className="weather-day">
                        <Cloud className="weather-icon" />
                        <span>Sun</span>
                      </div>
                      <div className="weather-date">
                        <div>Aug 29</div>
                      </div>
                    </div>

                    <div className="weather-row">
                      <div className="weather-condition">
                        <Wind className="weather-icon" />
                        <span>SW 7 mph</span>
                      </div>
                      <div className="weather-temp">
                        <span>81</span>
                        <Droplets className="droplet-icon" />
                      </div>
                    </div>

                    <div className="weather-row">
                      <div className="weather-day">
                        <Cloud className="weather-icon" />
                        <span>Sun</span>
                      </div>
                      <div className="weather-date">
                        <div>Aug 30</div>
                      </div>
                    </div>

                    <div className="weather-row">
                      <div className="weather-condition">
                        <Waves className="weather-icon" />
                        <span>WNM 12 mph</span>
                      </div>
                      <div className="weather-temp">
                        <span>84</span>
                        <Droplets className="droplet-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="info-card">
                <div className="card-header-with-button">
                  <h2 className="card-title">Tasks</h2>
                  <button className="add-button" onClick={() => setIsAddTaskOpen(true)}>
                    Add
                  </button>
                </div>
                <div className="card-content">
                  <div className="tasks-container">
                    {tasks.map((task) => (
                      <div key={task.id} className="task-row">
                        <div className="task-info">
                          <div className="task-icon-container">
                            <Leaf className="task-icon" />
                          </div>
                          <span>{task.name}</span>
                        </div>
                        <div className="task-details">
                          <button className="task-date-button">{task.date}</button>
                          <span className="task-area">{task.area}</span>
                          <span className="task-status">{task.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Modal */}
                {isAddTaskOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title">Add New Task</h3>
                        <button className="modal-close" onClick={() => setIsAddTaskOpen(false)}>
                          <X size={18} />
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-row">
                          <label htmlFor="task-name" className="form-label">
                            Name
                          </label>
                          <input
                            id="task-name"
                            className="form-input"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="task-date" className="form-label">
                            Date
                          </label>
                          <input
                            id="task-date"
                            className="form-input"
                            placeholder="e.g. Feb 17"
                            value={newTask.date}
                            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="task-area" className="form-label">
                            Area
                          </label>
                          <input
                            id="task-area"
                            className="form-input"
                            placeholder="e.g. 4.5 ha"
                            value={newTask.area}
                            onChange={(e) => setNewTask({ ...newTask, area: e.target.value })}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="task-status" className="form-label">
                            Status
                          </label>
                          <input
                            id="task-status"
                            className="form-input"
                            placeholder="e.g. 04/05/2023"
                            value={newTask.status}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button className="modal-button cancel" onClick={() => setIsAddTaskOpen(false)}>
                          Cancel
                        </button>
                        <button className="modal-button add" onClick={handleAddTask}>
                          Add Task
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reminder */}
              <div className="info-card">
                <div className="card-header-with-button">
                  <h2 className="card-title">Reminder</h2>
                  <button className="add-button" onClick={() => setIsAddReminderOpen(true)}>
                    Add
                  </button>
                </div>
                <div className="card-content">
                  <div className="reminders-container">
                    {reminders.map((reminder) => (
                      <div key={reminder.id} className="reminder-row">
                        <div className="reminder-info">
                          <div
                            className={`reminder-icon-container ${
                              reminder.priority === "High"
                                ? "high-priority"
                                : reminder.priority === "Medium"
                                  ? "medium-priority"
                                  : "low-priority"
                            }`}
                          >
                            <ArrowUp className="reminder-icon" />
                          </div>
                          <span>{reminder.task}</span>
                        </div>
                        <div className="reminder-details">
                          <span className="reminder-date">{reminder.date}</span>
                          <span
                            className={`reminder-status ${
                              reminder.status === "Due Today"
                                ? "due-today"
                                : reminder.status === "Due Tomorrow"
                                  ? "due-tomorrow"
                                  : "due-next-week"
                            }`}
                          >
                            {reminder.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reminder Modal */}
                {isAddReminderOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title">Add New Reminder</h3>
                        <button className="modal-close" onClick={() => setIsAddReminderOpen(false)}>
                          <X size={18} />
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-row">
                          <label htmlFor="reminder-priority" className="form-label">
                            Priority
                          </label>
                          <select
                            id="reminder-priority"
                            className="form-select"
                            value={newReminder.priority}
                            onChange={handlePriorityChange}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        <div className="form-row">
                          <label htmlFor="reminder-task" className="form-label">
                            Task
                          </label>
                          <input
                            id="reminder-task"
                            className="form-input"
                            value={newReminder.task}
                            onChange={(e) => setNewReminder({ ...newReminder, task: e.target.value })}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="reminder-date" className="form-label">
                            Date
                          </label>
                          <input
                            id="reminder-date"
                            className="form-input"
                            placeholder="e.g. Feb 17 (25)"
                            value={newReminder.date}
                            onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                          />
                        </div>
                        <div className="form-row">
                          <label htmlFor="reminder-status" className="form-label">
                            Status
                          </label>
                          <select
                            id="reminder-status"
                            className="form-select"
                            value={newReminder.status}
                            onChange={handleStatusChange}
                          >
                            <option value="Due Today">Due Today</option>
                            <option value="Due Tomorrow">Due Tomorrow</option>
                            <option value="Due Next Week">Due Next Week</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button className="modal-button cancel" onClick={() => setIsAddReminderOpen(false)}>
                          Cancel
                        </button>
                        <button className="modal-button add" onClick={handleAddReminder}>
                          Add Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Soil Details */}
            <div className="soil-card">
              <div className="card-header-with-button">
                <h2 className="card-title">Soil Details</h2>
                <button className="add-button" onClick={() => setIsAddSoilTestOpen(true)}>
                  Add
                </button>
              </div>
              <div className="card-content">
                <div className="soil-table-container">
                  <table className="soil-table">
                    <thead>
                      <tr>
                        <th>Soil Texture</th>
                        <th>pH Value</th>
                        <th>Magnesium</th>
                        <th>Iron</th>
                      </tr>
                    </thead>
                    <tbody>
                      {soilDetails.map((detail) => (
                        <tr key={detail.id}>
                          <td>{detail.name}</td>
                          <td>{detail.value}</td>
                          <td>{detail.phValue}</td>
                          <td>{detail.magnesium || detail.addTestHere || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Soil Test Modal */}
              {isAddSoilTestOpen && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title">Add New Soil Test</h3>
                      <button className="modal-close" onClick={() => setIsAddSoilTestOpen(false)}>
                        <X size={18} />
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-row">
                        <label htmlFor="soil-name" className="form-label">
                          Name
                        </label>
                        <input
                          id="soil-name"
                          className="form-input"
                          value={newSoilTest.name}
                          onChange={(e) => setNewSoilTest({ ...newSoilTest, name: e.target.value })}
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="soil-value" className="form-label">
                          Value
                        </label>
                        <input
                          id="soil-value"
                          className="form-input"
                          value={newSoilTest.value}
                          onChange={(e) => setNewSoilTest({ ...newSoilTest, value: e.target.value })}
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="soil-ph" className="form-label">
                          pH Value
                        </label>
                        <input
                          id="soil-ph"
                          className="form-input"
                          value={newSoilTest.phValue}
                          onChange={(e) => setNewSoilTest({ ...newSoilTest, phValue: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="modal-button cancel" onClick={() => setIsAddSoilTestOpen(false)}>
                        Cancel
                      </button>
                      <button className="modal-button add" onClick={handleAddSoilTest}>
                        Add Soil Test
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default FarmerDashboard;

