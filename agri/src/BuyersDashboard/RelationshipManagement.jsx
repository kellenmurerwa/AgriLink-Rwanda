import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { User, MapPin, X, Send } from 'lucide-react';
import { supplierPerformanceData } from '../BuyersDashboard/mockData';
import '../BuyersDashStyles/RelationshipManagement.css';

const RelationshipManagement = () => {
  // Chart colors
  const PRIMARY_GREEN = '#219653';
  const CHART_COLORS = ['#219653', '#27AE60', '#6FCF97', '#F2C94C'];
  
  // State for messaging functionality
  const [showMessenger, setShowMessenger] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState({});

  // Function to open messaging interface
  const contactSupplier = (id, name) => {
    setCurrentSupplier({ id, name });
    setShowMessenger(true);
    
    // Initialize messages for this supplier if they don't exist
    if (!messages[id]) {
      setMessages(prev => ({
        ...prev,
        [id]: []
      }));
    }
  };
  
  // Function to send message
  const sendMessage = () => {
    if (messageText.trim() === '' || !currentSupplier) return;
    
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'buyer',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Add message to the conversation
    setMessages(prev => ({
      ...prev,
      [currentSupplier.id]: [...(prev[currentSupplier.id] || []), newMessage]
    }));
    
    setMessageText('');
    
    // Simulate response after a short delay (for demo purposes)
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: `Thank you for your message. A representative from ${currentSupplier.name} will get back to you soon.`,
        sender: 'supplier',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => ({
        ...prev,
        [currentSupplier.id]: [...(prev[currentSupplier.id] || []), response]
      }));
    }, 1000);
  };
  
  // Handle message input change
  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };
  
  // Handle enter key press in message input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='dashboard-container'>
      <div className="title-container">
        <h2 className="page-title">Relationship Management</h2>
        <p className="page-description">Manage supplier networks and contracts</p>
      </div>
      
      <div className="grid-container">
        <div className="dashboard-card">
          <h3 className="card-title">Supplier Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={supplierPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value) => [`${value}/5`, 'Rating']} />
              <Bar dataKey="rating" fill={PRIMARY_GREEN} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">Contracts Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Active', value: 12 },
                  { name: 'Pending', value: 3 },
                  { name: 'Expiring Soon', value: 5 },
                  { name: 'Completed', value: 8 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {[0, 1, 2, 3].map((index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card-wide">
          <h3 className="card-title">Preferred Farmer Network</h3>
          <div className="farmers-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="farmer-card">
                <div className="farmer-header">
                  <div className="farmer-avatar">
                    <User size={18} className="farmer-avatar-icon" />
                  </div>
                  <div>
                    <p className="farmer-name">Rwanda Farmer Coop {item}</p>
                    <p className="farmer-type">
                      {item % 3 === 0 ? 'Beans Producer' : 
                       item % 2 === 0 ? 'Rice Producer' : 
                       'Maize Producer'}
                    </p>
                  </div>
                </div>
                <div className="farmer-info">
                  <div className="farmer-location">
                    <MapPin size={14} className="location-icon" />
                    <span>
                      {item % 4 === 0 ? 'Eastern Province' : 
                       item % 3 === 0 ? 'Western Province' : 
                       item % 2 === 0 ? 'Northern Province' : 
                       'Southern Province'}
                    </span>
                  </div>
                  <div>
                    <span className="farmer-rating">★ {4.0 + (item * 0.2).toFixed(1)}</span>
                  </div>
                </div>
                <div className="farmer-actions">
                  <button 
                    onClick={() => viewSupplierProfile(item)}
                    className="view-profile-button"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => contactSupplier(item, `Rwanda Farmer Coop ${item}`)}
                    className="contact-button"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Messaging Component */}
      {showMessenger && (
        <div className="messenger-overlay">
          <div className="messenger-container">
            <div className="messenger-header">
              <h3>Chat with {currentSupplier?.name}</h3>
              <button 
                className="close-messenger"
                onClick={() => setShowMessenger(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="messages-container">
              {currentSupplier && messages[currentSupplier.id]?.map(message => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender === 'buyer' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))}
              {(!currentSupplier || !messages[currentSupplier.id] || messages[currentSupplier.id].length === 0) && (
                <div className="no-messages">
                  <p>Start a conversation with {currentSupplier?.name}</p>
                </div>
              )}
            </div>
            
            <div className="message-input-container">
              <textarea 
                className="message-input"
                placeholder="Type your message here..."
                value={messageText}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="send-message-button"
                onClick={sendMessage}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipManagement;