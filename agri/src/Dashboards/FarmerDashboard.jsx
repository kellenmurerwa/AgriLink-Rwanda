import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import '../DashboardStyles/FarmerDashboard.css'

const FarmerDashboard = () => {
  // Sample data
  const [yieldData, setYieldData] = useState([
    { name: 'Field 1', expected: 35, actual: 40 },
    { name: 'Field 2', expected: 40, actual: 38 },
    { name: 'Field 3', expected: 25, actual: 15 },
    { name: 'Field 4', expected: 15, actual: 12 }
  ]);

  const monthlyData = [
    { name: 'Jan', expected: 20, actual: 18 },
    { name: 'Feb', expected: 22, actual: 22 },
    { name: 'Mar', expected: 28, actual: 30 },
    { name: 'Apr', expected: 32, actual: 29 },
    { name: 'May', expected: 38, actual: 36 },
    { name: 'Jun', expected: 40, actual: 42 },
    { name: 'Jul', expected: 38, actual: 39 },
    { name: 'Aug', expected: 36, actual: 35 },
    { name: 'Sep', expected: 34, actual: 34 },
    { name: 'Oct', expected: 30, actual: 28 },
    { name: 'Nov', expected: 25, actual: 24 },
    { name: 'Dec', expected: 22, actual: 21 }
  ];

  const [tasks, setTasks] = useState([
    { id: 1, crop: 'Soil Test', field: 'Field 17', area: '4.5 ha', date: '04/05/2023', status: 'pending' },
    { id: 2, crop: 'Plant Crop', field: 'Field 22', area: '3.6 ha', date: '20/05/2023', status: 'pending' },
    { id: 3, crop: 'Harvest', field: 'Field 20', area: '2 ha', date: '02/06/2023', status: 'pending' },
    { id: 4, crop: 'Harvest', field: 'Field 5', area: '4.9 ha', date: '25/06/2023', status: 'pending' }
  ]);

  const [reminders, setReminders] = useState([
    { id: 1, action: 'Analyze', field: 'Field 17(25)', due: '01/11/2023', status: 'Due Today' },
    { id: 2, action: 'Fertilize', field: 'Field 12(12)', due: '15/10/2023', status: 'Due Tomorrow' },
    { id: 3, action: 'Irrigate', field: 'Field 12(12)', due: '14/10/2023', status: 'Due Tomorrow' },
    { id: 4, action: 'Harvest', field: 'Field 9(13)', due: '06/10/2023', status: 'Due Next Week' }
  ]);

  const [soilDetails, setSoilDetails] = useState([
    { name: 'Soil Texture', value: 'Clay Loams', ph: '6.8' },
    { name: 'Organic Matter', value: '14 Acres', classification: 'Poor', level: '3' },
    { name: 'Buffer Index', value: '12', classification: 'Good', level: '7' },
    { name: 'CEC', value: '19.4', classification: 'Poor', level: '3.4' },
    { name: 'Add Test Here', value: '0.6', classification: 'Poor', level: '0.5' },
    { name: 'Add Test Here', value: '115', classification: 'Medium', level: '5.8' }
  ]);

  // Weather data
  const [weather, setWeather] = useState({
    today: { temp: 76, date: 'Aug 28', icon: '☀️', wind: { speed: 7, direction: 'W' }, humidity: 51 },
    forecast: { temp: 76, date: 'Aug 29', icon: '🌤️', wind: { speed: 7, direction: 'SW' }, humidity: 54 }
  });

  // Function to handle task status changes
  const completeTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? {...task, status: 'completed'} : task
    ));
  };

  // Function to handle reminder status changes
  const handleReminderAction = (reminderId, action) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId ? {...reminder, status: action === 'complete' ? 'Completed' : reminder.status} : reminder
    ));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>AgriLink Farmer's dashboard</h1>
      
      </div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          {/* Stats Section */}
          <div className="dashboard-stats">
            <div className="stat-box area-box">
              <div className="stat-icon">
                <span className="icon">🌱</span>
              </div>
              <div className="stat-content">
                <div className="stat-title">Total Area</div>
                <div className="stat-value">15 ha</div>
              </div>
            </div>

            <div className="stat-box crop-box">
              <div className="stat-icon">
                <span className="icon">🌾</span>
              </div>
              <div className="stat-content">
                <div className="stat-title">Total Crop</div>
                <div className="stat-value">09 ha</div>
              </div>
            </div>

            <div className="stat-box yield-box">
              <div className="stat-icon">
                <span className="icon">🌽</span>
              </div>
              <div className="stat-content">
                <div className="stat-title">Total Yield</div>
                <div className="stat-value">99 ton</div>
              </div>
            </div>

            <div className="stat-box revenue-box">
              <div className="stat-icon">
                <span className="icon">💰</span>
              </div>
              <div className="stat-content">
                <div className="stat-title">Total Revenue</div>
                <div className="stat-value">$15,000.00</div>
              </div>
            </div>

            <div className="stat-box hurricane-box">
              <div className="stat-icon">
                <span className="icon">🌪️</span>
              </div>
              <div className="stat-content">
                <div className="stat-title">Hurricane</div>
                <div className="stat-value">W 24mph</div>
              </div>
            </div>
          </div>

          {/* First Row: Overview and Tasks */}
          <div className="row-container">
            {/* Overview Chart */}
            <div className="chart-box">
              <h3>Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="expected" stroke="#8BC34A" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="actual" stroke="#4CAF50" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Tasks */}
            <div className="tasks-box">
              <h3>Tasks</h3>
              <div className="tasks-table">
                <table>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className={task.status === 'completed' ? 'completed' : ''}>
                        <td className="task-icon">🌱</td>
                        <td>{task.crop}</td>
                        <td>
                          <button className="field-button">{task.field}</button>
                        </td>
                        <td>{task.area}</td>
                        <td>{task.date}</td>
                        <td>
                          <button 
                            className="complete-button" 
                            onClick={() => completeTask(task.id)}
                            disabled={task.status === 'completed'}
                          >
                            {task.status === 'completed' ? 'Completed' : 'Complete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Second Row: Yield and Reminders */}
          <div className="row-container">
            {/* Yield Chart */}
            <div className="chart-box">
              <h3>Yield</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="expected" fill="#8BC34A" />
                  <Bar dataKey="actual" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Reminders */}
            <div className="reminders-box">
              <h3>Reminder</h3>
              <div className="reminders-table">
                <table>
                  <tbody>
                    {reminders.map((reminder) => (
                      <tr key={reminder.id}>
                        <td>{reminder.action}</td>
                        <td>{reminder.field}</td>
                        <td>{reminder.due}</td>
                        <td>
                          <div className={`reminder-status ${reminder.status.replace(/\s+/g, '-').toLowerCase()}`}>
                            {reminder.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Third Row: Weather and Soil Details */}
          <div className="row-container">
            {/* Weather Box */}
            <div className="weather-box">
              <h3>Weather</h3>
              <div className="weather-container">
                <div className="weather-today">
                  <div className="weather-icon">{weather.today.icon}</div>
                  <div className="weather-info">
                    <div>Today</div>
                    <div>{weather.today.date}</div>
                    <div>{weather.today.temp}°</div>
                  </div>
                </div>
                <div className="weather-details">
                  <div>{weather.today.wind.direction} {weather.today.wind.speed} mph</div>
                  <div className="weather-humidity">
                    <span className="humidity-icon">💧</span> {weather.today.humidity}
                  </div>
                </div>
              </div>
              <div className="weather-container">
                <div className="weather-today">
                  <div className="weather-icon">{weather.forecast.icon}</div>
                  <div className="weather-info">
                    <div>Tomorrow</div>
                    <div>{weather.forecast.date}</div>
                    <div>{weather.forecast.temp}°</div>
                  </div>
                </div>
                <div className="weather-details">
                  <div>{weather.forecast.wind.direction} {weather.forecast.wind.speed} mph</div>
                  <div className="weather-humidity">
                    <span className="humidity-icon">💧</span> {weather.forecast.humidity}
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Details */}
            <div className="soil-box">
              <h3>Soil Details</h3>
              <div className="soil-table">
                <table>
                  <thead>
                    <tr>
                      <th>Soil Texture</th>
                      <th>PH Value</th>
                      <th>0-8</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soilDetails.map((soil, index) => (
                      <tr key={index}>
                        <td>{soil.name}</td>
                        <td>{soil.value}</td>
                        <td>{soil.ph || ''}</td>
                        <td>{soil.classification || ''}</td>
                        <td>{soil.level || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="green-sidebar"></div>
    </div>
  );
};

export default FarmerDashboard;