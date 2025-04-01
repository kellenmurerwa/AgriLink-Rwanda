import React, { useState } from 'react';
import '../DashboardStyles/FarmerToDo.css';

const FarmerToDo = () => {
  // Initial task data from the image
  const initialTasks = [
    { id: 1, type: 'SOIL TEST', plot: 'Plot 12', acres: 9, date: '12/05/2020', icon: '🌱', completed: false, status: 'todo' },
    { id: 2, type: 'PLANT CROP', plot: 'Plot 21', acres: 6, date: '19/05/2020', icon: '🌿', completed: false, status: 'todo' },
    { id: 3, type: 'HARVEST', plot: 'Plot 7', acres: 2, date: '22/05/2020', icon: '🌾', completed: false, status: 'todo' },
    { id: 4, type: 'HARVEST', plot: 'Plot 8', acres: 12, date: '27/05/2020', icon: '🌾', completed: false, status: 'todo' },
  ];

  // Initial reminders data from the image
  const initialReminders = [
    { id: 1, crop: 'Potato', quantity: '500Kg', field: 'Field 11-DA', date: '06/05/2020', status: 'DUE TODAY' },
    { id: 2, crop: 'Tomato', quantity: '200Kg', field: 'Field 1-VQ', date: '06/05/2020', status: 'DUE TODAY' },
    { id: 3, crop: 'Brinjal', quantity: '600Kg', field: 'Field 9-UV', date: '07/05/2020', status: 'DUE TOMORROW' },
    { id: 4, crop: 'Potato', quantity: '800Kg', field: 'Field 5-DP', date: '12/05/2020', status: 'DUE NEXT WEEK' },
    { id: 5, crop: 'Potato', quantity: '800Kg', field: 'Field 17-EA', date: '12/05/2020', status: 'DUE NEXT WEEK' },
  ];

  // Initial soil details data from the image
  const soilDetails = {
    texture: '15 Acres',
    organicMatter: '4 Acres',
    bufferIndex: '76 Acres',
    nitrogen: '25',
    phosphorous: '8.3',
    potassium: '48',
  };

  // State for all data
  const [tasks, setTasks] = useState(initialTasks);
  const [reminders, setReminders] = useState(initialReminders);
  const [kanbanTasks, setKanbanTasks] = useState({
    todo: [...initialTasks],
    inProgress: [],
    completed: []
  });
  const [newTask, setNewTask] = useState({
    type: '', plot: '', acres: '', date: '', icon: '🌱'
  });
  const [showAnimation, setShowAnimation] = useState(false);

  // Handle task status change with animation
  const moveTask = (taskId, fromStatus, toStatus) => {
    setShowAnimation(true);
    
    setTimeout(() => {
      setKanbanTasks(prev => {
        const taskToMove = prev[fromStatus].find(task => task.id === taskId);
        const updatedTaskToMove = { ...taskToMove, status: toStatus };
        
        return {
          ...prev,
          [fromStatus]: prev[fromStatus].filter(task => task.id !== taskId),
          [toStatus]: [...prev[toStatus], updatedTaskToMove]
        };
      });

    }, 300);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.type && newTask.plot && newTask.acres && newTask.date) {
      // Choose icon based on task type
      let icon = '🌱';
      if (newTask.type === 'PLANT CROP') icon = '🌿';
      if (newTask.type === 'HARVEST') icon = '🌾';
      if (newTask.type === 'IRRIGATION') icon = '💧';
      if (newTask.type === 'FERTILIZER') icon = '🧪';
      
      const task = {
        id: Date.now(),
        ...newTask,
        icon,
        completed: false,
        status: 'todo'
      };
      
      setTasks(prev => [...prev, task]);
      setKanbanTasks(prev => ({
        ...prev,
        todo: [...prev.todo, task]
      }));
      
      setNewTask({
        type: '', plot: '', acres: '', date: '', icon: '🌱'
      });
      
      // Show short animation
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 300);
    }
  };

  // Get status class for reminders
  const getStatusClass = (status) => {
    switch(status) {
      case 'DUE TODAY':
        return 'dueToday';
      case 'DUE TOMORROW':
        return 'dueTomorrow';
      case 'DUE NEXT WEEK':
        return 'dueNextWeek';
      default:
        return '';
    }
  };

  return (
    <div className="farmDashboardContainer">
      <h1 className="dashboardTitle">Farm Helper Dashboard</h1>
      
      <div className="cardsContainer">
        {/* Tasks Card */}
        <div className="dashboardCard tasksCard">
          <div className="cardHeader">
            <h2>Tasks</h2>
            {/* <div className="cropIcon">🚜</div> */}
          </div>
          
          <div className="tasksList">
            {tasks.map(task => (
              <div key={task.id} className="taskItem">
                <div className="taskIcon">{task.icon}</div>
                <div className="taskContent">
                  <div className="taskType">{task.type}</div>
                  <div className="taskDetails">
                    <span className="plotTag">{task.plot}</span>
                    <span className="acresValue">{task.acres} Acres</span>
                    <span className="dateValue">{task.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders Card */}
        <div className="dashboardCard remindersCard">
          <div className="cardHeader">
            <h2>Reminder</h2>
            {/* <div className="cropIcon">⏰</div> */}
          </div>
          
          <div className="remindersList">
            {reminders.map(reminder => (
              <div key={reminder.id} className="reminderItem">
                <div className="reminderHeader">
                  <div className="cropName">{reminder.crop}</div>
                  <div className="cropQuantity">{reminder.quantity}</div>
                </div>
                <div className="reminderDetails">
                  <div className="fieldName">{reminder.field}</div>
                  <div className="reminderDate">{reminder.date}</div>
                </div>
                <div className="reminderStatus">
                  <span className={`statusTag ${getStatusClass(reminder.status)}`}>
                    {reminder.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soil Details Card */}
        {/* <div className="dashboardCard soilDetailsCard">
          <div className="cardHeader">
            <h2>Soil Details</h2>
            <div className="cropIcon">🌍</div>
          </div> */}
          
          {/* <div className="soilDetailsGrid">
            <div className="soilColumn">
              <div className="soilDetailItem">
                <span className="detailLabel">Soil Texture</span>
                <span className="detailValue">{soilDetails.texture}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Organic Matter</span>
                <span className="detailValue">{soilDetails.organicMatter}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Buffer Index</span>
                <span className="detailValue">{soilDetails.bufferIndex}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Nitrogen</span>
                <span className="detailValue">{soilDetails.nitrogen}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Phosphorous</span>
                <span className="detailValue">{soilDetails.phosphorous}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Potassium</span>
                <span className="detailValue">{soilDetails.potassium}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Sulfur</span>
                <span className="detailValue">{soilDetails.sulfur}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Calcium</span>
                <span className="detailValue">{soilDetails.calcium}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Sodium</span>
                <span className="detailValue">{soilDetails.sodium}</span>
              </div>
            </div> */}
            {/* <div className="soilColumn">
              <div className="soilDetailItem">
                <span className="detailLabel">PH Value</span>
                <span className="detailValue">{soilDetails.phValue}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Magnesium</span>
                <span className="detailValue">{soilDetails.magnesium}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Iron</span>
                <span className="detailValue">{soilDetails.iron}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Manganese</span>
                <span className="detailValue">{soilDetails.manganese}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Boron</span>
                <span className="detailValue">{soilDetails.boron}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Copper</span>
                <span className="detailValue">{soilDetails.copper}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Zinc</span>
                <span className="detailValue">{soilDetails.zinc}</span>
              </div>
              <div className="soilDetailItem">
                <span className="detailLabel">Molybdenum</span>
                <span className="detailValue">{soilDetails.molybdenum}</span>
              </div> */}
              {/* <div className="soilDetailItem">
                <span className="detailLabel">Aluminum</span>
                <span className="detailValue">{soilDetails.aluminum}</span>
              </div> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>

      {/* Task Progress Kanban Board */}
      <div className="kanbanContainer">
        <div className="kanbanHeader">
          <h2>Task Progress</h2>
          <div className="growingPlant">
            <div className="plantStem"></div>
            <div className="plantLeaf leaf1"></div>
            <div className="plantLeaf leaf2"></div>
            <div className="plantLeaf leaf3"></div>
          </div>
        </div>
        
        {/* Add New Task Form */}
        <div className="addTaskContainer">
          <h3>Add New Task</h3>
          <div className="addTaskForm">
            <div className="formGroup">
              <label>Type</label>
              <select 
                value={newTask.type}
                onChange={(e) => setNewTask({...newTask, type: e.target.value})}
              >
                <option value="">Select type</option>
                <option value="SOIL TEST">SOIL TEST</option>
                <option value="PLANT CROP">PLANT CROP</option>
                <option value="HARVEST">HARVEST</option>
                <option value="IRRIGATION">IRRIGATION</option>
                <option value="FERTILIZER">FERTILIZER</option>
              </select>
            </div>
            <div className="formGroup">
              <label>Plot</label>
              <input 
                type="text" 
                placeholder="e.g. Plot 10"
                value={newTask.plot}
                onChange={(e) => setNewTask({...newTask, plot: e.target.value})}
              />
            </div>
            <div className="formGroup">
              <label>Acres</label>
              <input 
                type="number" 
                placeholder="Acres"
                value={newTask.acres}
                onChange={(e) => setNewTask({...newTask, acres: e.target.value})}
              />
            </div>
            <div className="formGroup">
              <label>Date</label>
              <input 
                type="text" 
                placeholder="DD/MM/YYYY"
                value={newTask.date}
                onChange={(e) => setNewTask({...newTask, date: e.target.value})}
              />
            </div>
            <button 
              className="addTaskButton"
              onClick={handleAddTask}
            >
              Plant New Task 
            </button>
          </div>
        </div>
        
        {/* Kanban Board */}
        <div className={`kanbanBoard ${showAnimation ? 'animate' : ''}`}>
          {/* To Do Column */}
          <div className="kanbanColumn todoColumn">
            <div className="columnHeader">
              <h3>To Plant</h3>
              {/* <div className="seedIcon">🌰</div> */}
            </div>
            <div className="columnContent">
              {kanbanTasks.todo.map(task => (
                <div key={task.id} className="kanbanTask">
                  <div className="taskHeader">
                    <div className="taskTypeIcon">{task.icon}</div>
                    <div className="taskTypeText">{task.type}</div>
                  </div>
                  <div className="taskDescription">
                    {task.plot} • {task.acres} Acres • {task.date}
                  </div>
                  <div className="taskActions">
                    <button 
                      className="actionButton startButton"
                      onClick={() => moveTask(task.id, 'todo', 'inProgress')}
                    >
                      Start Growing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* In Progress Column */}
          <div className="kanbanColumn inProgressColumn">
            <div className="columnHeader">
              <h3>Growing</h3>
              {/* <div className="growingIcon">🌿</div> */}
            </div>
            <div className="columnContent">
              {kanbanTasks.inProgress.map(task => (
                <div key={task.id} className="kanbanTask">
                  <div className="taskHeader">
                    <div className="taskTypeIcon">{task.icon}</div>
                    <div className="taskTypeText">{task.type}</div>
                  </div>
                  <div className="taskDescription">
                    {task.plot} • {task.acres} Acres • {task.date}
                  </div>
                  <div className="taskActions">
                    <button 
                      className="actionButton backButton"
                      onClick={() => moveTask(task.id, 'inProgress', 'todo')}
                    >
                      Back to Seeds
                    </button>
                    <button 
                      className="actionButton completeButton"
                      onClick={() => moveTask(task.id, 'inProgress', 'completed')}
                    >
                      Harvest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Completed Column */}
          <div className="kanbanColumn completedColumn">
            <div className="columnHeader">
              <h3>Harvested</h3>
              {/* <div className="harvestedIcon">🌾</div> */}
            </div>
            <div className="columnContent">
              {kanbanTasks.completed.map(task => (
                <div key={task.id} className="kanbanTask completedTask">
                  <div className="taskHeader">
                    <div className="taskTypeIcon">{task.icon}</div>
                    <div className="taskTypeText">{task.type}</div>
                  </div>
                  <div className="taskDescription">
                    {task.plot} • {task.acres} Acres • {task.date}
                  </div>
                  <div className="taskActions">
                    <div className="completionBadge">✓ Harvested</div>
                    <button 
                      className="actionButton reopenButton"
                      onClick={() => moveTask(task.id, 'completed', 'inProgress')}
                    >
                      Replant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* <footer className="dashboardFooter">
        <p>Nurturing Growth, One Task at a Time</p>
        <div className="footerIcons">
          🌱 🌿 🌾 🚜 🧑‍🌾
        </div>
      </footer> */}
    </div>
  );
};

export default FarmerToDo;