import React, { useState,useEffect } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import "../DashboardStyles/MessagingHub.css";
const styles={
  stripedRow: { backgroundColor: "none" },
  normalRow: { backgroundColor: "none" },
}
export const MessagingHub = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const API_URL = 'https://agrilink-backend-24zq.onrender.com';
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/list`);
      setUsers(response.data.AllUsers || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      Notify.failure("Failed to fetch users. Please try again later.");
    } 
  };

  
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const addToContacts = (user) => {
    if (!contacts.find((c) => c.email === user.email)) {
      setContacts([...contacts, user]);
    }
  };

  const sendMessage = () => {
    if (input.trim() !== "" && selectedContact) {
      const newMessages = { ...messages };
      if (!newMessages[selectedContact.email]) {
        newMessages[selectedContact.email] = [];
      }
      newMessages[selectedContact.email].push({ sender: "You", text: input });
      setMessages(newMessages);
      setInput("");
    }
  };

  return (
    <div className="community-container">
      {/* Contact Table */}
      <div className="contact-table">
        <h2>People Directory</h2>
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Occupation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={index % 2 === 0 ? styles.stripedRow : styles.normalRow}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td >
                   <button className="add-button" onClick={() => addToContacts(user)}>Add</button>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="chat-contacts">
          <h3>Contacts</h3>
          <ul>
            {contacts.map((contact, index) => (
              <li key={index} onClick={() => setSelectedContact(contact)} className={selectedContact === contact ? "active-contact" : ""}>
                {contact.firstName}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="chat-box">
          {selectedContact ? (
            <>
              <div className="chat-header">
                <h3>Chatting with: {selectedContact.firstName}</h3>
              </div>
              <div className="messages">
                {messages[selectedContact.email]?.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="chat-input-container">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
              </div>
            </>
          ) : (
            <p>Select a contact to start chatting.</p>
          )}
        </div>
      </div>
    </div>
  );
};
 export default MessagingHub;