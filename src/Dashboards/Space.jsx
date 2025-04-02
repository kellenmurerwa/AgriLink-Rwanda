import { useState, useEffect, useRef } from "react"
import "../DashboardStyles/Space.css"
import { Search, Filter, Bell, Users, MoreVertical, Send, Paperclip, Image, Mic, MessageCircle } from "lucide-react"
import Jean from '../images/Screenshot 2025-04-02 122916'
import Marie from '../images/Screenshot 2025-04-02 122931'
import David from '../images/Screenshot 2025-04-02 123115'
import Sarah from '../images/Screenshot 2025-04-02 123030'
import Michel from '../images/Screenshot 2025-04-02 123050'
const Space = () => {
  // States for chat functionality
  const [activeChat, setActiveChat] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [contactCategory, setContactCategory] = useState("All")

  // Ref for auto-scrolling chat
  const messagesEndRef = useRef(null)

  // Sample data for contacts with Rwandan names
  const contacts = [
    {
      id: 1,
      name: "Mugisha Jean",
      role: "Agronomist",
      avatar: Jean,
      online: true,
      unread: 3,
      lastMessage: "Do you have any questions about crop rotation?",
    },
    {
      id: 2,
      name: "Uwase Marie",
      role: "Buyer",
      avatar: Marie,
      online: false,
      unread: 0,
      lastMessage: "I can offer 20,000 RWF per bushel for your organic wheat",
    },
    {
      id: 3,
      name: "Nshimiyimana David",
      role: "Farmer",
      avatar: David,
      online: true,
      unread: 0,
      lastMessage: "How are your corn crops doing this season?",
    },
    {
      id: 4,
      name: "Mukamana Sarah",
      role: "Extension Agent",
      avatar: Sarah,
      online: false,
      unread: 1,
      lastMessage: "New subsidy program available for sustainable farming",
    },
    {
      id: 5,
      name: "Hakizimana Michel",
      role: "Supplier",
      avatar: Michel,
      online: true,
      unread: 0,
      lastMessage: "The fertilizer shipment will arrive next Tuesday",
    },
  ]

  // Sample messages for chat
  const [chatMessages, setChatMessages] = useState({
    1: [
      {
        id: 1,
        sender: "Mugisha Jean",
        time: "9:30 AM",
        text: "Good morning! How are your crops doing?",
        isUser: false,
      },
      {
        id: 2,
        sender: "You",
        time: "9:32 AM",
        text: "Morning! They're doing well, but I noticed some discoloration on the corn leaves.",
        isUser: true,
      },
      {
        id: 3,
        sender: "Mugisha Jean",
        time: "9:35 AM",
        text: "Could you send me a picture? It might be a nutrient deficiency or fungal issue.",
        isUser: false,
      },
      {
        id: 4,
        sender: "You",
        time: "9:40 AM",
        text: "I'll take some photos this afternoon and send them over.",
        isUser: true,
      },
    ],
    4: [
      {
        id: 1,
        sender: "Mukamana Sarah",
        time: "11:05 AM",
        text: "Good news! There's a new government subsidy program for farmers implementing water conservation techniques.",
        isUser: false,
      },
      {
        id: 2,
        sender: "You",
        time: "11:10 AM",
        text: "That sounds interesting! What are the requirements?",
        isUser: true,
      },
    ],
  })

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages, activeChat])

  // Handler for chat selection
  const handleChatSelect = (id) => {
    setActiveChat(id)
    // Mark messages as read
    if (id) {
      // In a real app, you would update the unread count here
    }
  }

  // Handler for sending a message
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    // Add new message to the chat
    const newMsg = {
      id: chatMessages[activeChat]?.length + 1 || 1,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: newMessage,
      isUser: true,
    }

    setChatMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages }
      if (!updatedMessages[activeChat]) {
        updatedMessages[activeChat] = []
      }
      updatedMessages[activeChat] = [...updatedMessages[activeChat], newMsg]
      return updatedMessages
    })

    setNewMessage("")

    // Simulate response (for demo purposes)
    setTimeout(() => {
      const contact = contacts.find((c) => c.id === activeChat)
      const responseMsg = {
        id: chatMessages[activeChat]?.length + 2 || 2,
        sender: contact?.name,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: "Thanks for your message. I'll get back to you shortly.",
        isUser: false,
      }

      setChatMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages }
        updatedMessages[activeChat] = [...updatedMessages[activeChat], responseMsg]
        return updatedMessages
      })
    }, 1000)
  }

  // Function to filter contacts based on search and category
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      contactCategory === "All" ||
      contact.role === contactCategory ||
      (contactCategory === "Agronomists" && contact.role === "Agronomist") ||
      (contactCategory === "Farmers" && contact.role === "Farmer") ||
      (contactCategory === "Buyers" && contact.role === "Buyer")

    return matchesSearch && matchesCategory
  })

  return (
    <div className="messages-container">
      {/* Contacts sidebar */}
      <div className="contacts-sidebar">
        <div className="contacts-header">
          <h3>Messages</h3>
          <div className="contacts-actions">
            <button
              className="icon-button"
              onClick={() => {
                // In a real app, you would show a filter dropdown
                // For now, we'll just toggle between All and Agronomists
                setContactCategory(contactCategory === "All" ? "Agronomists" : "All")
                alert(`Filtered to: ${contactCategory === "All" ? "Agronomists" : "All"}`)
              }}
            >
              <Filter size={18} />
            </button>
            <button
              className="icon-button"
              onClick={() => {
                // In a real app, you would show notifications
                // For now, we'll just show a notification
                alert("You have 3 new messages")
              }}
            >
              <Bell size={18} />
            </button>
          </div>
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              // You could add a debounce function here for better performance
            }}
          />
        </div>

        <div className="contacts-categories">
          <button
            className={`category-button ${contactCategory === "All" ? "active" : ""}`}
            onClick={() => setContactCategory("All")}
          >
            All
          </button>
          <button
            className={`category-button ${contactCategory === "Agronomists" ? "active" : ""}`}
            onClick={() => setContactCategory("Agronomists")}
          >
            Agronomists
          </button>
          <button
            className={`category-button ${contactCategory === "Farmers" ? "active" : ""}`}
            onClick={() => setContactCategory("Farmers")}
          >
            Farmers
          </button>
          <button
            className={`category-button ${contactCategory === "Buyers" ? "active" : ""}`}
            onClick={() => setContactCategory("Buyers")}
          >
            Buyers
          </button>
        </div>

        <div className="contacts-list">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item ${activeChat === contact.id ? "active" : ""}`}
              onClick={() => handleChatSelect(contact.id)}
            >
              <div className="contact-avatar">
                <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                <span className={`status-indicator ${contact.online ? "online" : "offline"}`}></span>
              </div>
              <div className="contact-info">
                <div className="contact-name-time">
                  <h4>{contact.name}</h4>
                  <span className="time">10:30 AM</span>
                </div>
                <div className="contact-role">{contact.role}</div>
                <p className="last-message">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && <div className="unread-badge">{contact.unread}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      {activeChat ? (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-contact-info">
              <img
                src={contacts.find((c) => c.id === activeChat)?.avatar || "/placeholder.svg"}
                alt={contacts.find((c) => c.id === activeChat)?.name}
              />
              <div>
                <h3>{contacts.find((c) => c.id === activeChat)?.name}</h3>
                <span className="status">
                  {contacts.find((c) => c.id === activeChat)?.online ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="icon-button">
                <Users size={18} />
              </button>
              <button className="icon-button">
                <Search size={18} />
              </button>
              <button className="icon-button">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {chatMessages[activeChat]?.map((message) => (
              <div key={message.id} className={`message ${message.isUser ? "user" : "other"}`}>
                {!message.isUser && (
                  <img src="/placeholder.svg?height=32&width=32" alt={message.sender} className="message-avatar" />
                )}
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-sender">{message.sender}</span>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="message-input" onSubmit={handleSendMessage}>
            <div className="attachment-buttons">
              <input
                type="file"
                id="file-upload"
                className="hidden-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // In a real app, you would upload the file to a server
                    // For now, we'll just show a notification
                    alert(`File "${e.target.files[0].name}" selected for upload`)
                  }
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="icon-button">
                <Paperclip size={18} />
              </label>

              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // In a real app, you would upload the image to a server
                    // For now, we'll just show a notification
                    alert(`Image "${e.target.files[0].name}" selected for upload`)
                  }
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="image-upload" className="icon-button">
                <Image size={18} />
              </label>

              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  // In a real app, you would implement voice recording
                  // For now, we'll just show a notification
                  alert("Voice recording started. (This is a simulation)")
                }}
              >
                <Mic size={18} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="send-button">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <div className="empty-chat">
          <div className="empty-chat-content">
            <MessageCircle size={64} />
            <h3>Select a conversation</h3>
            <p>Choose a contact to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Space

