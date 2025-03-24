import React, { useState } from "react";
import "../DashboardStyles/MessagingHub.css";

export const MessagingHub = () => {
  const initialPeople = [
    { name: "Alice Farmer", email: "alice@example.com", occupation: "Farmer", location: "Kigali" },
    { name: "John Buyer", email: "john@example.com", occupation: "Buyer", location: "Musanze" },
    { name: "David Agronomist", email: "david@example.com", occupation: "Agronomist", location: "Huye" },
  ];

  const [people, setPeople] = useState(initialPeople);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const addToContacts = (person) => {
    if (!contacts.find((c) => c.email === person.email)) {
      setContacts([...contacts, person]);
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
              <th>Name</th>
              <th>Email</th>
              <th>Occupation</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.occupation}</td>
                <td>{person.location}</td>
                <td>
                  <button className="add-button" onClick={() => addToContacts(person)}>Add</button>
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
                {contact.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="chat-box">
          {selectedContact ? (
            <>
              <div className="chat-header">
                <h3>Chatting with: {selectedContact.name}</h3>
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