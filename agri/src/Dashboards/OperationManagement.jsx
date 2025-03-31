import React, { useState } from 'react';
import { Calendar, Package, List, AlertTriangle } from 'lucide-react';
import '../DashboardStyles/OperationManagement.css';

const OperationsManagement = () => {
  // Modal display states
  const [showPlantingModal, setShowPlantingModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  
  // Form states for data entry
  const [newCrop, setNewCrop] = useState({
    crop: '',
    plantDate: '',
    harvestDate: '',
    fieldLocation: 'North Field'
  });
  
  const [newInventoryItem, setNewInventoryItem] = useState({
    category: 'Seeds',
    name: '',
    quantity: '',
    unit: 'kg',
    status: 'In Stock'
  });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending'
  });
  
  // Data states
  const [plantingData, setPlantingData] = useState([
    { id: 1, crop: 'Corn', plantDate: '2025-04-15', harvestDate: '2025-08-20', fieldLocation: 'North Field', status: 'Scheduled' },
    { id: 2, crop: 'Wheat', plantDate: '2025-05-10', harvestDate: '2025-09-30', fieldLocation: 'South Field', status: 'Scheduled' },
    { id: 3, crop: 'Soybeans', plantDate: '2025-04-20', harvestDate: '2025-10-15', fieldLocation: 'East Field', status: 'Scheduled' }
  ]);
  
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, category: 'Seeds', name: 'Corn Seeds (Hybrid)', quantity: 500, unit: 'kg', status: 'In Stock' },
    { id: 2, category: 'Fertilizer', name: 'NPK 20-10-10', quantity: 40, unit: 'kg', status: 'Low Stock' },
    { id: 3, category: 'Equipment', name: 'Tractor (John Deere)', quantity: 1, unit: 'unit', status: 'Maintenance Due' }
  ]);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Apply Fertilizer to North Field', description: 'Use NPK 20-10-10 at recommended rate', dueDate: '2025-04-05', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Repair Irrigation System', description: 'Fix leak in main pipe near the barn', dueDate: '2025-04-10', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Order Additional Seeds', description: 'Call supplier for special hybrid corn seeds', dueDate: '2025-04-15', priority: 'Low', status: 'Completed' }
  ]);
  
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Weather Alert', message: 'Heavy rain expected in next 48 hours', date: '2025-03-30', priority: 'High', read: false },
    { id: 2, title: 'Low Fertilizer Stock', message: 'NPK 20-10-10 inventory is running low', date: '2025-03-29', priority: 'Medium', read: false },
    { id: 3, title: 'Equipment Maintenance', message: 'Tractor maintenance due in 5 days', date: '2025-03-28', priority: 'Medium', read: false }
  ]);
  
  // UI state management
  const [editingPlantingId, setEditingPlantingId] = useState(null);
  const [editingInventoryId, setEditingInventoryId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeInventoryTab, setActiveInventoryTab] = useState('All Items');
  const [activeTaskFilter, setActiveTaskFilter] = useState('All');
  
  // Handler functions
  const handleCropInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrop({ ...newCrop, [name]: value });
  };
  
  const handleInventoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewInventoryItem({ ...newInventoryItem, [name]: value });
  };
  
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  
  const addCrop = (e) => {
    e.preventDefault();
    if (!newCrop.crop || !newCrop.plantDate || !newCrop.harvestDate) {
      alert('Please fill all required fields');
      return;
    }
    
    if (editingPlantingId) {
      // Update existing crop
      setPlantingData(plantingData.map(item => 
        item.id === editingPlantingId ? { ...newCrop, id: editingPlantingId } : item
      ));
      setEditingPlantingId(null);
    } else {
      // Add new crop
      const newId = plantingData.length > 0 ? Math.max(...plantingData.map(item => item.id)) + 1 : 1;
      setPlantingData([...plantingData, { ...newCrop, id: newId, status: 'Scheduled' }]);
    }
    
    // Reset form
    setNewCrop({
      crop: '',
      plantDate: '',
      harvestDate: '',
      fieldLocation: 'North Field'
    });
  };
  
  const editCrop = (id) => {
    const cropToEdit = plantingData.find(item => item.id === id);
    if (cropToEdit) {
      setNewCrop(cropToEdit);
      setEditingPlantingId(id);
    }
  };
  
  const deleteCrop = (id) => {
    if (window.confirm('Are you sure you want to delete this planting?')) {
      setPlantingData(plantingData.filter(item => item.id !== id));
    }
  };
  
  const addInventoryItem = (e) => {
    e.preventDefault();
    if (!newInventoryItem.name || !newInventoryItem.quantity) {
      alert('Please fill all required fields');
      return;
    }
    
    if (editingInventoryId) {
      // Update existing item
      setInventoryItems(inventoryItems.map(item => 
        item.id === editingInventoryId ? { ...newInventoryItem, id: editingInventoryId } : item
      ));
      setEditingInventoryId(null);
    } else {
      // Add new item
      const newId = inventoryItems.length > 0 ? Math.max(...inventoryItems.map(item => item.id)) + 1 : 1;
      setInventoryItems([...inventoryItems, { ...newInventoryItem, id: newId }]);
    }
    
    // Reset form
    setNewInventoryItem({
      category: 'Seeds',
      name: '',
      quantity: '',
      unit: 'kg',
      status: 'In Stock'
    });
  };
  
  const editInventoryItem = (id) => {
    const itemToEdit = inventoryItems.find(item => item.id === id);
    if (itemToEdit) {
      setNewInventoryItem(itemToEdit);
      setEditingInventoryId(id);
    }
  };
  
  const deleteInventoryItem = (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id));
    }
  };
  
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) {
      alert('Please fill all required fields');
      return;
    }
    
    if (editingTaskId) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTaskId ? { ...newTask, id: editingTaskId } : task
      ));
      setEditingTaskId(null);
    } else {
      // Add new task
      const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
      setTasks([...tasks, { ...newTask, id: newId }]);
    }
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending'
    });
  };
  
  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit);
      setEditingTaskId(id);
    }
  };
  
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };
  
  const markAlertAsRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const renderPlantingModal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{editingPlantingId ? 'Edit Planting' : 'Planting Calendar'}</h2>
            <button onClick={() => {
              setShowPlantingModal(false);
              setEditingPlantingId(null);
              setNewCrop({
                crop: '',
                plantDate: '',
                harvestDate: '',
                fieldLocation: 'North Field'
              });
            }}>×</button>
          </div>
          <div className="modal-body">
            <div className="planting-calendar">
              <div className="add-planting">
                <h3>{editingPlantingId ? 'Edit Crop' : 'Add New Crop'}</h3>
                <form onSubmit={addCrop}>
                  <div className="form-group">
                    <label>Crop Name *</label>
                    <input 
                      type="text" 
                      name="crop"
                      value={newCrop.crop}
                      onChange={handleCropInputChange}
                      placeholder="Enter crop name" 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Planting Date *</label>
                    <input 
                      type="date" 
                      name="plantDate"
                      value={newCrop.plantDate}
                      onChange={handleCropInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Expected Harvest Date *</label>
                    <input 
                      type="date" 
                      name="harvestDate"
                      value={newCrop.harvestDate}
                      onChange={handleCropInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Field Location</label>
                    <select 
                      name="fieldLocation"
                      value={newCrop.fieldLocation}
                      onChange={handleCropInputChange}
                    >
                      <option>North Field</option>
                      <option>South Field</option>
                      <option>East Field</option>
                      <option>West Field</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary">
                    {editingPlantingId ? 'Update Crop' : 'Add Crop'}
                  </button>
                  {editingPlantingId && (
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      onClick={() => {
                        setEditingPlantingId(null);
                        setNewCrop({
                          crop: '',
                          plantDate: '',
                          harvestDate: '',
                          fieldLocation: 'North Field'
                        });
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>
              <div className="planting-list">
                <h3>Scheduled Plantings</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Plant Date</th>
                      <th>Harvest Date</th>
                      <th>Field</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plantingData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.crop}</td>
                        <td>{item.plantDate}</td>
                        <td>{item.harvestDate}</td>
                        <td>{item.fieldLocation}</td>
                        <td>{item.status}</td>
                        <td>
                          <button className="btn-icon" onClick={() => editCrop(item.id)}>Edit</button>
                          <button className="btn-icon delete" onClick={() => deleteCrop(item.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {plantingData.length === 0 && (
                      <tr>
                        <td colSpan="6" className="no-data">No plantings scheduled yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInventoryModal = () => {
    // Filter inventory based on active tab
    const filteredInventory = activeInventoryTab === 'All Items' 
      ? inventoryItems 
      : inventoryItems.filter(item => item.category === activeInventoryTab);
      
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{editingInventoryId ? 'Edit Inventory Item' : 'Inventory Management'}</h2>
            <button onClick={() => {
              setShowInventoryModal(false);
              setEditingInventoryId(null);
              setNewInventoryItem({
                category: 'Seeds',
                name: '',
                quantity: '',
                unit: 'kg',
                status: 'In Stock'
              });
            }}>×</button>
          </div>
          <div className="modal-body">
            <div className="inventory-form">
              <h3>{editingInventoryId ? 'Edit Item' : 'Add New Item'}</h3>
              <form onSubmit={addInventoryItem}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      name="category"
                      value={newInventoryItem.category}
                      onChange={handleInventoryInputChange}
                    >
                      <option>Seeds</option>
                      <option>Fertilizer</option>
                      <option>Equipment</option>
                      <option>Chemicals</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Item Name *</label>
                    <input 
                      type="text"
                      name="name" 
                      value={newInventoryItem.name}
                      onChange={handleInventoryInputChange}
                      placeholder="Enter item name"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Quantity *</label>
                    <input 
                      type="number"
                      name="quantity" 
                      value={newInventoryItem.quantity}
                      onChange={handleInventoryInputChange}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Unit</label>
                    <select 
                      name="unit"
                      value={newInventoryItem.unit}
                      onChange={handleInventoryInputChange}
                    >
                      <option>kg</option>
                      <option>lbs</option>
                      <option>ton</option>
                      <option>unit</option>
                      <option>liter</option>
                      <option>gallon</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      name="status"
                      value={newInventoryItem.status}
                      onChange={handleInventoryInputChange}
                    >
                      <option>In Stock</option>
                      <option>Low Stock</option>
                      <option>Out of Stock</option>
                      <option>Maintenance Due</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingInventoryId ? 'Update Item' : 'Add Item'}
                  </button>
                  {editingInventoryId && (
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      onClick={() => {
                        setEditingInventoryId(null);
                        setNewInventoryItem({
                          category: 'Seeds',
                          name: '',
                          quantity: '',
                          unit: 'kg',
                          status: 'In Stock'
                        });
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            <div className="inventory-tabs">
              <button 
                className={`tab ${activeInventoryTab === 'All Items' ? 'active' : ''}`}
                onClick={() => setActiveInventoryTab('All Items')}
              >
                All Items
              </button>
              <button 
                className={`tab ${activeInventoryTab === 'Seeds' ? 'active' : ''}`}
                onClick={() => setActiveInventoryTab('Seeds')}
              >
                Seeds
              </button>
              <button 
                className={`tab ${activeInventoryTab === 'Fertilizer' ? 'active' : ''}`}
                onClick={() => setActiveInventoryTab('Fertilizer')}
              >
                Fertilizers
              </button>
              <button 
                className={`tab ${activeInventoryTab === 'Equipment' ? 'active' : ''}`}
                onClick={() => setActiveInventoryTab('Equipment')}
              >
                Equipment
              </button>
            </div>
            
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td className={`status-${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</td>
                    <td>
                      <button className="btn-icon" onClick={() => editInventoryItem(item.id)}>Edit</button>
                      <button className="btn-icon delete" onClick={() => deleteInventoryItem(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {filteredInventory.length === 0 && (
                  <tr>
                    <td colSpan="6" className="no-data">No inventory items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTaskModal = () => {
    // Filter tasks based on active filter
    const filteredTasks = activeTaskFilter === 'All' 
      ? tasks 
      : tasks.filter(task => task.status === activeTaskFilter);
      
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{editingTaskId ? 'Edit Task' : 'Task Management'}</h2>
            <button onClick={() => {
              setShowTaskModal(false);
              setEditingTaskId(null);
              setNewTask({
                title: '',
                description: '',
                dueDate: '',
                priority: 'Medium',
                status: 'Pending'
              });
            }}>×</button>
          </div>
          <div className="modal-body">
            <div className="task-form">
              <h3>{editingTaskId ? 'Edit Task' : 'Add New Task'}</h3>
              <form onSubmit={addTask}>
                <div className="form-group">
                  <label>Task Title *</label>
                  <input 
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleTaskInputChange}
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    name="description"
                    value={newTask.description}
                    onChange={handleTaskInputChange}
                    placeholder="Enter task description"
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Due Date *</label>
                    <input 
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleTaskInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={newTask.priority}
                      onChange={handleTaskInputChange}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={newTask.status}
                      onChange={handleTaskInputChange}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingTaskId ? 'Update Task' : 'Add Task'}
                  </button>
                  {editingTaskId && (
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      onClick={() => {
                        setEditingTaskId(null);
                        setNewTask({
                          title: '',
                          description: '',
                          dueDate: '',
                          priority: 'Medium',
                          status: 'Pending'
                        });
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            <div className="tasks-list">
              <h3>Current Tasks</h3>
              <div className="task-filters">
                <button 
                  className={`filter ${activeTaskFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setActiveTaskFilter('All')}
                >
                  All
                </button>
                <button 
                  className={`filter ${activeTaskFilter === 'Pending' ? 'active' : ''}`}
                  onClick={() => setActiveTaskFilter('Pending')}
                >
                  Pending
                </button>
                <button 
                  className={`filter ${activeTaskFilter === 'In Progress' ? 'active' : ''}`}
                  onClick={() => setActiveTaskFilter('In Progress')}
                >
                  In Progress
                </button>
                <button 
                  className={`filter ${activeTaskFilter === 'Completed' ? 'active' : ''}`}
                  onClick={() => setActiveTaskFilter('Completed')}
                >
                  Completed
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td className="description-cell">{task.description}</td>
                      <td>{task.dueDate}</td>
                      <td className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>
                        <button className="btn-icon" onClick={() => editTask(task.id)}>Edit</button>
                        <button className="btn-icon delete" onClick={() => deleteTask(task.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">No tasks found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAlertModal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Alerts & Recommendations</h2>
            <button onClick={() => setShowAlertModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="alerts-container">
              {alerts.map((alert) => (
                <div key={alert.id} className={`alert-card ${alert.read ? 'read' : ''}`}>
                  <div className="alert-header">
                    <h3 className={`priority-${alert.priority.toLowerCase()}`}>
                      {alert.title}
                    </h3>
                    <span className="alert-date">{alert.date}</span>
                  </div>
                  <div className="alert-message">
                    {alert.message}
                  </div>
                  <div className="alert-actions">
                    {!alert.read && (
                      <button 
                        className="btn-secondary" 
                        onClick={() => markAlertAsRead(alert.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                    <button className="btn-primary">View Details</button>
                  </div>
                </div>
              ))}
              {alerts.length === 0 && (
                <div className="no-alerts">
                  <p>No alerts at this time</p>
                </div>
              )}
            </div>
            
            <div className="recommendations">
              <h3>Recommendations</h3>
              <div className="recommendation-card">
                <h4>Fertilizer Application Optimization</h4>
                <p>Based on soil test results, we recommend reducing NPK application by 10% in North Field to optimize costs while maintaining yield.</p>
                <button className="btn-primary">Apply Recommendation</button>
              </div>
              <div className="recommendation-card">
                <h4>Irrigation Schedule Adjustment</h4>
                <p>Due to recent rainfall patterns, we suggest adjusting your irrigation schedule to water 2 days per week instead of 3.</p>
                <button className="btn-primary">Apply Recommendation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="operations-container">
      <h2>Operations Management</h2>
      
      <div className="operations-cards">
        <div className="operation-card" onClick={() => setShowPlantingModal(true)}>
          <div className="card-icon">
            <Calendar size={24} />
          </div>
          <div className="card-content">
            <h3>Planting Calendar</h3>
            <p>View and manage your planting and harvesting schedule</p>
            <div className="card-stats">
              <span>{plantingData.length} Upcoming Plantings</span>
            </div>
          </div>
        </div>
        
        <div className="operation-card" onClick={() => setShowInventoryModal(true)}>
          <div className="card-icon">
            <Package size={24} />
          </div>
          <div className="card-content">
            <h3>Inventory Management</h3>
            <p>Track seeds, fertilizers, and equipment</p>
            <div className="card-stats">
              <span className="warning">
                {inventoryItems.filter(item => item.status === 'Low Stock').length} Low Stock Items
              </span>
            </div>
          </div>
        </div>
        
        <div className="operation-card" onClick={() => setShowTaskModal(true)}>
          <div className="card-icon">
            <List size={24} />
          </div>
          <div className="card-content">
            <h3>Task Management</h3>
            <p>Organize and track farming activities</p>
            <div className="card-stats">
              <span className="alert">
                {tasks.filter(task => task.status !== 'Completed').length} Active Tasks
              </span>
            </div>
          </div>
        </div>
        
        <div className="operation-card" onClick={() => setShowAlertModal(true)}>
          <div className="card-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="card-content">
  <h3>Alerts & Recommendations</h3>
  <p>Get timely alerts and input optimization suggestions</p>
  <div className="card-stats">
    <span className="alert">
      {alerts.filter(alert => !alert.read).length} Unread Alerts
    </span>
  </div>
</div>
      </div>
    </div>
      
    {/* Render modals when their respective states are true */}
    {showPlantingModal && renderPlantingModal()}
    {showInventoryModal && renderInventoryModal()}
    {showTaskModal && renderTaskModal()}
    {showAlertModal && renderAlertModal()}
  </div>
);
};

export default OperationsManagement;