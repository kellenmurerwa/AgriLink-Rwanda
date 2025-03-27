import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { User, X, Send } from 'lucide-react';
import { supplierPerformanceData } from '../BuyersDashboard/mockData';
import '../BuyersDashStyles/RelationshipManagement.css';

// Socket.io connection (change the URL to your backend API)
const socket = io('http://localhost:5000');

const RelationshipManagement = () => {
  const PRIMARY_GREEN = '#219653';
  const CHART_COLORS = ['#219653', '#27AE60', '#6FCF97', '#F2C94C'];

  const [showMessenger, setShowMessenger] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState({});

  // Open messaging interface
  const contactSupplier = (id, name) => {
    setCurrentSupplier({ id, name });
    setShowMessenger(true);

    if (!messages[id]) {
      setMessages(prev => ({
        ...prev,
        [id]: []
      }));
    }
  };

  // Send message via Socket.io
  const sendMessage = () => {
    if (messageText.trim() === '' || !currentSupplier) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'buyer',
      supplierId: currentSupplier.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit('sendMessage', newMessage);
    setMessages(prev => ({
      ...prev,
      [currentSupplier.id]: [...(prev[currentSupplier.id] || []), newMessage]
    }));
    setMessageText('');
  };

  // Receive messages in real-time
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages(prev => ({
        ...prev,
        [message.supplierId]: [...(prev[message.supplierId] || []), message]
      }));
    });

    return () => socket.off('receiveMessage');
  }, []);

  return (
    <div className='dashboard-container'>
      <div className="title-container">
        <h2 className="page-title">Relationship Management</h2>
        <p className="page-description">Manage supplier networks and contracts</p>
      </div>

      <div className="grid-container">
        {/* Supplier Performance Chart */}
        <div className="dashboard-card">
          <h3 className="card-title">Supplier Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={supplierPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value) => [`${value}/5`, 'Rating']} />
              <Bar dataKey="rating" fill={PRIMARY_GREEN} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Contracts Overview */}
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
                cx="50%" cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {[0, 1, 2, 3].map((index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Farmer Network */}
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
                      {item % 3 === 0 ? 'Beans Producer' : item % 2 === 0 ? 'Rice Producer' : 'Maize Producer'}
                    </p>
                  </div>
                </div>
                <div className="farmer-info">
                  <span className="farmer-rating">★ {4.0 + (item * 0.2).toFixed(1)}</span>
                </div>
                <div className="farmer-actions">
                  <button className="contact-button" onClick={() => contactSupplier(item, `Rwanda Farmer Coop ${item}`)}>Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messenger */}
      {showMessenger && (
        <div className="messenger-overlay">
          <div className="messenger-container">
            <div className="messenger-header">
              <h3>Chat with {currentSupplier?.name}</h3>
              <button className="close-messenger" onClick={() => setShowMessenger(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="messages-container">
              {messages[currentSupplier?.id]?.map(message => (
                <div key={message.id} className={`message ${message.sender === 'buyer' ? 'sent' : 'received'}`}>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="message-input-container">
              <textarea className="message-input" placeholder="Type your message here..." value={messageText} onChange={(e) => setMessageText(e.target.value)} />
              <button className="send-message-button" onClick={sendMessage}>
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
