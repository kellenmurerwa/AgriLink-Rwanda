
import { useState, useEffect, useRef } from "react"
import "../DashboardStyles/Space.css"
import {
  MessageCircle,
  Book,
  Award,
  FileText,
  Users,
  Calendar,
  PieChart,
  Download,
  Bookmark,
  Filter,
  Search,
  Bell,
  Send,
  Paperclip,
  Image,
  Mic,
  MoreVertical,
} from "lucide-react"

const Space = () => {
  // States for different functionalities
  const [activeTab, setActiveTab] = useState("messages")
  const [activeChat, setActiveChat] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [currentModule, setCurrentModule] = useState(null)
  const [moduleProgress, setModuleProgress] = useState({})
  const [contactCategory, setContactCategory] = useState("All")
  const [activeResourceCategory, setActiveResourceCategory] = useState("all")
  const [activeResourceType, setActiveResourceType] = useState("All Types")
  const [sortOrder, setSortOrder] = useState("Newest")

  // Ref for auto-scrolling chat
  const messagesEndRef = useRef(null)

  // Sample data for contacts with Rwandan names
  const contacts = [
    {
      id: 1,
      name: "Mugisha Jean",
      role: "Agronomist",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
      unread: 3,
      lastMessage: "Do you have any questions about crop rotation?",
    },
    {
      id: 2,
      name: "Uwase Marie",
      role: "Buyer",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
      unread: 0,
      lastMessage: "I can offer 20,000 RWF per bushel for your organic wheat",
    },
    {
      id: 3,
      name: "Nshimiyimana David",
      role: "Farmer",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
      unread: 0,
      lastMessage: "How are your corn crops doing this season?",
    },
    {
      id: 4,
      name: "Mukamana Sarah",
      role: "Extension Agent",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
      unread: 1,
      lastMessage: "New subsidy program available for sustainable farming",
    },
    {
      id: 5,
      name: "Hakizimana Michel",
      role: "Supplier",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
      unread: 0,
      lastMessage: "The fertilizer shipment will arrive next Tuesday",
    },
    {
      id: 6,
      name: "Uwimana Claude",
      role: "Agronomist",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
      unread: 2,
      lastMessage: "I reviewed your soil test results, we should discuss them",
    },
    {
      id: 7,
      name: "Iradukunda Grace",
      role: "Buyer",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
      unread: 0,
      lastMessage: "Looking to purchase your coffee beans this season",
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
      {
        id: 5,
        sender: "Mugisha Jean",
        time: "9:41 AM",
        text: "Perfect. In the meantime, check if the discoloration is on the older or newer leaves. That will help narrow down the cause.",
        isUser: false,
      },
      {
        id: 6,
        sender: "You",
        time: "9:45 AM",
        text: "It's mostly on the older, lower leaves. Does that help?",
        isUser: true,
      },
      {
        id: 7,
        sender: "Mugisha Jean",
        time: "9:47 AM",
        text: "That suggests it might be a mobile nutrient deficiency, possibly nitrogen or potassium. I will check your soil test results and get back to you.",
        isUser: false,
      },
      {
        id: 8,
        sender: "Mugisha Jean",
        time: "10:15 AM",
        text: "Do you have any questions about crop rotation for next season?",
        isUser: false,
      },
    ],
    6: [
      {
        id: 1,
        sender: "Uwimana Claude",
        time: "2:15 PM",
        text: "Hello! I've analyzed your soil samples from last week.",
        isUser: false,
      },
      { id: 2, sender: "You", time: "2:20 PM", text: "Great! What did you find?", isUser: true },
      {
        id: 3,
        sender: "Uwimana Claude",
        time: "2:22 PM",
        text: "Your soil pH is slightly acidic at 5.8. For optimal maize growth, we should aim for 6.0-6.5.",
        isUser: false,
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

  // Sample data for learning resources
  const learningCategories = [
    { id: "all", name: "All Resources", icon: "All" },
    { id: "crop", name: "Crop Management", icon: <PieChart size={20} /> },
    { id: "soil", name: "Soil Health", icon: <FileText size={20} /> },
    { id: "water", name: "Water Management", icon: <FileText size={20} /> },
    { id: "pest", name: "Pest Control", icon: <FileText size={20} /> },
    { id: "equipment", name: "Equipment", icon: <FileText size={20} /> },
    { id: "business", name: "Farm Business", icon: <FileText size={20} /> },
  ]

  const learningResources = [
    {
      id: 1,
      title: "Sustainable Crop Rotation Practices",
      category: "crop",
      type: "article",
      duration: "15 min read",
      bookmark: true,
    },
    { id: 2, title: "Soil Nutrient Management", category: "soil", type: "video", duration: "22 min", bookmark: false },
    {
      id: 3,
      title: "Water Conservation Techniques",
      category: "water",
      type: "article",
      duration: "10 min read",
      bookmark: true,
    },
    {
      id: 4,
      title: "Organic Pest Management",
      category: "pest",
      type: "course",
      duration: "4 modules",
      bookmark: false,
    },
    {
      id: 5,
      title: "Farm Equipment Maintenance",
      category: "equipment",
      type: "video",
      duration: "35 min",
      bookmark: false,
    },
    {
      id: 6,
      title: "Agricultural Business Planning",
      category: "business",
      type: "course",
      duration: "6 modules",
      bookmark: true,
    },
    {
      id: 7,
      title: "Soil Testing Methods",
      category: "soil",
      type: "article",
      duration: "12 min read",
      bookmark: false,
    },
    {
      id: 8,
      title: "Crop Disease Identification",
      category: "crop",
      type: "video",
      duration: "28 min",
      bookmark: true,
    },
    {
      id: 9,
      title: "Irrigation System Design",
      category: "water",
      type: "course",
      duration: "5 modules",
      bookmark: false,
    },
  ]

  // Sample data for training modules
  const [trainingModules, setTrainingModules] = useState([
    {
      id: 1,
      title: "Organic Certification Process",
      description: "Learn the complete process for getting your farm certified organic",
      totalLessons: 5,
      completedLessons: 3,
      estimatedHours: 4,
      tags: ["certification", "organic", "regulations"],
      lessons: [
        { title: "Introduction to Organic Certification", duration: 20, completed: true },
        { title: "Core Requirements and Standards", duration: 25, completed: true },
        { title: "Documentation and Record Keeping", duration: 30, completed: true },
        { title: "Inspection Process", duration: 35, completed: false },
        { title: "Maintaining Certification", duration: 30, completed: false },
      ],
    },
    {
      id: 2,
      title: "Sustainable Irrigation Systems",
      description: "Water-saving irrigation techniques for different crop types",
      totalLessons: 4,
      completedLessons: 1,
      estimatedHours: 3,
      tags: ["water", "irrigation", "sustainability"],
      lessons: [
        { title: "Introduction to Water Conservation", duration: 20, completed: true },
        { title: "Drip Irrigation Systems", duration: 25, completed: false },
        { title: "Rainwater Harvesting", duration: 30, completed: false },
        { title: "Irrigation Scheduling", duration: 25, completed: false },
      ],
    },
    {
      id: 3,
      title: "Farm Financial Management",
      description: "Essential accounting and financial planning for small to medium farms",
      totalLessons: 6,
      completedLessons: 0,
      estimatedHours: 5,
      tags: ["finance", "business", "planning"],
      lessons: [
        { title: "Farm Accounting Basics", duration: 20, completed: false },
        { title: "Budgeting for Agricultural Operations", duration: 25, completed: false },
        { title: "Cash Flow Management", duration: 30, completed: false },
        { title: "Financial Analysis for Farms", duration: 35, completed: false },
        { title: "Tax Planning for Farmers", duration: 30, completed: false },
        { title: "Securing Agricultural Loans", duration: 25, completed: false },
      ],
    },
  ])

  // Sample data for government programs
  const governmentPrograms = [
    {
      id: 1,
      title: "Rwanda Agricultural Development Program",
      deadline: "April 15, 2025",
      fundingAmount: "500,000 - 1,500,000 RWF",
      eligibility: "Small to medium farms implementing sustainable practices",
      description:
        "Grants for research and education projects that advance sustainable agriculture practices in Rwanda.",
      category: "Sustainability",
    },
    {
      id: 2,
      title: "Environmental Quality Incentives Program",
      deadline: "June 30, 2025",
      fundingAmount: "Up to 2,500,000 RWF",
      eligibility: "Farmers implementing conservation practices",
      description:
        "Financial assistance for implementing conservation practices that improve soil, water, plant, animal, air, and energy resources.",
      category: "Conservation",
    },
    {
      id: 3,
      title: "Beginning Farmer Development Program",
      deadline: "May 22, 2025",
      fundingAmount: "250,000 - 1,000,000 RWF",
      eligibility: "Farmers with less than 10 years of experience",
      description:
        "Support for farmers just starting their agricultural operations with training, education, and technical assistance.",
      category: "Beginning Farmers",
    },
  ]

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
      const updatedContacts = contacts.map((contact) => (contact.id === id ? { ...contact, unread: 0 } : contact))
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

  // Handler for selecting a module
  const handleModuleSelect = (module) => {
    setCurrentModule(module)
  }

  // Handler for module completion
  const handleModuleProgress = (moduleId, lessonIndex) => {
    setTrainingModules((prevModules) => {
      return prevModules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = [...module.lessons]

          // If the lesson is the next one to complete
          if (lessonIndex === module.completedLessons) {
            updatedLessons[lessonIndex].completed = true

            return {
              ...module,
              lessons: updatedLessons,
              completedLessons: module.completedLessons + 1,
            }
          }

          return module
        }
        return module
      })
    })
  }

  // Function to filter resources based on category and type
  const getFilteredResources = () => {
    return learningResources.filter((resource) => {
      const matchesCategory = activeResourceCategory === "all" || resource.category === activeResourceCategory
      const matchesType =
        activeResourceType === "All Types" ||
        (activeResourceType === "Articles" && resource.type === "article") ||
        (activeResourceType === "Videos" && resource.type === "video") ||
        (activeResourceType === "Courses" && resource.type === "course") ||
        (activeResourceType === "Bookmarked" && resource.bookmark)

      return matchesCategory && matchesType
    })
  }

  // Function to sort resources
  const getSortedResources = (resources) => {
    if (sortOrder === "Newest") {
      return [...resources].sort((a, b) => b.id - a.id)
    } else if (sortOrder === "Most Popular") {
      return [...resources].sort((a, b) => (a.bookmark === b.bookmark ? 0 : a.bookmark ? -1 : 1))
    } else if (sortOrder === "Shortest") {
      return [...resources].sort((a, b) => {
        const getDuration = (resource) => {
          if (resource.type === "course") {
            return Number.parseInt(resource.duration.split(" ")[0]) * 30 // Approximate minutes per module
          } else {
            return Number.parseInt(resource.duration.split(" ")[0])
          }
        }
        return getDuration(a) - getDuration(b)
      })
    }
    return resources
  }

  // Toggle bookmark status
  const toggleBookmark = (resourceId) => {
    const updatedResources = learningResources.map((resource) =>
      resource.id === resourceId ? { ...resource, bookmark: !resource.bookmark } : resource,
    )
    // In a real app, you would update state here
  }

  // Filter programs by category
  const [programCategory, setProgramCategory] = useState("All Categories")
  const [programDeadline, setProgramDeadline] = useState("All Deadlines")

  const filteredPrograms = governmentPrograms.filter((program) => {
    const matchesCategory = programCategory === "All Categories" || program.category === programCategory

    // Simple deadline filtering logic
    let matchesDeadline = true
    if (programDeadline === "Next 30 Days") {
      // This is simplified - in a real app you would compare actual dates
      matchesDeadline = program.deadline.includes("April")
    } else if (programDeadline === "Next 90 Days") {
      matchesDeadline =
        program.deadline.includes("April") || program.deadline.includes("May") || program.deadline.includes("June")
    } else if (programDeadline === "Next 6 Months") {
      matchesDeadline = true // All our sample deadlines are within 6 months
    }

    return matchesCategory && matchesDeadline
  })

  return (
    <div className="support-learning-container">
      {/* Navigation tabs */}
      <div className="support-tabs">
        <div className={`tab ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
          <MessageCircle size={20} />
          <span>Messages</span>
        </div>
        <div className={`tab ${activeTab === "library" ? "active" : ""}`} onClick={() => setActiveTab("library")}>
          <Book size={20} />
          <span>Library</span>
        </div>
        <div className={`tab ${activeTab === "training" ? "active" : ""}`} onClick={() => setActiveTab("training")}>
          <Award size={20} />
          <span>Training</span>
        </div>
        <div className={`tab ${activeTab === "programs" ? "active" : ""}`} onClick={() => setActiveTab("programs")}>
          <FileText size={20} />
          <span>Subsidies</span>
        </div>
      </div>

      {/* Main content based on active tab */}
      <div className="support-content">
        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="messages-container">
            {/* Contacts sidebar */}
            <div className="contacts-sidebar">
              <div className="contacts-header">
                <h3>Messages</h3>
                <div className="contacts-actions">
                  <button className="icon-button">
                    <Filter size={18} />
                  </button>
                  <button className="icon-button">
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt={message.sender}
                          className="message-avatar"
                        />
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
                    <button type="button" className="icon-button">
                      <Paperclip size={18} />
                    </button>
                    <button type="button" className="icon-button">
                      <Image size={18} />
                    </button>
                    <button type="button" className="icon-button">
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
        )}

        {/* LIBRARY TAB */}
        {activeTab === "library" && (
          <div className="library-container">
            <div className="library-header">
              <h2>Knowledge Library</h2>
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input type="text" placeholder="Search resources..." />
              </div>
            </div>

            <div className="library-categories">
              {learningCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-card ${activeResourceCategory === category.id ? "active" : ""}`}
                  onClick={() => setActiveResourceCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>

            <div className="resource-filters">
              <div className="filter-title">Filter by:</div>
              <div className="filter-options">
                <button
                  className={`filter-button ${activeResourceType === "All Types" ? "active" : ""}`}
                  onClick={() => setActiveResourceType("All Types")}
                >
                  All Types
                </button>
                <button
                  className={`filter-button ${activeResourceType === "Articles" ? "active" : ""}`}
                  onClick={() => setActiveResourceType("Articles")}
                >
                  Articles
                </button>
                <button
                  className={`filter-button ${activeResourceType === "Videos" ? "active" : ""}`}
                  onClick={() => setActiveResourceType("Videos")}
                >
                  Videos
                </button>
                <button
                  className={`filter-button ${activeResourceType === "Courses" ? "active" : ""}`}
                  onClick={() => setActiveResourceType("Courses")}
                >
                  Courses
                </button>
                <button
                  className={`filter-button ${activeResourceType === "Bookmarked" ? "active" : ""}`}
                  onClick={() => setActiveResourceType("Bookmarked")}
                >
                  Bookmarked
                </button>
              </div>
              <div className="sort-dropdown">
                <span>Sort by: </span>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option>Newest</option>
                  <option>Most Popular</option>
                  <option>Shortest</option>
                </select>
              </div>
            </div>

            <div className="resource-list">
              <h3 className="section-title">Recommended for You</h3>
              <div className="resource-grid">
                {getSortedResources(getFilteredResources()).map((resource) => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-image">
                      <img src="/placeholder.svg?height=320&width=180" alt={resource.title} />
                      <span className={`resource-type ${resource.type}`}>{resource.type}</span>
                      <button
                        className={`bookmark-button ${resource.bookmark ? "active" : ""}`}
                        onClick={() => toggleBookmark(resource.id)}
                      >
                        <Bookmark size={16} />
                      </button>
                    </div>
                    <div className="resource-content">
                      <h4 className="resource-title">{resource.title}</h4>
                      <div className="resource-meta">
                        <span className="resource-category">
                          {learningCategories.find((c) => c.id === resource.category)?.name}
                        </span>
                        <span className="resource-duration">{resource.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredResources().length === 0 && (
                <div className="empty-state">
                  <p>No resources found matching your filters.</p>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setActiveResourceCategory("all")
                      setActiveResourceType("All Types")
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {getFilteredResources().length > 0 && (
                <>
                  <h3 className="section-title">Most Popular</h3>
                  <div className="resource-grid">
                    {getSortedResources(getFilteredResources().filter((r) => r.bookmark))
                      .slice(0, 3)
                      .map((resource) => (
                        <div key={`popular-${resource.id}`} className="resource-card">
                          <div className="resource-image">
                            <img src="/placeholder.svg?height=320&width=180" alt={resource.title} />
                            <span className={`resource-type ${resource.type}`}>{resource.type}</span>
                            <button
                              className={`bookmark-button ${resource.bookmark ? "active" : ""}`}
                              onClick={() => toggleBookmark(resource.id)}
                            >
                              <Bookmark size={16} />
                            </button>
                          </div>
                          <div className="resource-content">
                            <h4 className="resource-title">{resource.title}</h4>
                            <div className="resource-meta">
                              <span className="resource-category">
                                {learningCategories.find((c) => c.id === resource.category)?.name}
                              </span>
                              <span className="resource-duration">{resource.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* TRAINING TAB */}
        {activeTab === "training" && (
          <div className="training-container">
            {currentModule ? (
              <div className="module-details">
                <div className="module-header">
                  <button className="back-button" onClick={() => setCurrentModule(null)}>
                    ← Back to Modules
                  </button>
                  <h2>{currentModule.title}</h2>
                </div>

                <div className="module-progress-bar">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(currentModule.completedLessons / currentModule.totalLessons) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {currentModule.completedLessons} of {currentModule.totalLessons} lessons completed
                  </div>
                </div>

                <div className="module-content">
                  <div className="module-description">
                    <h3>About this Module</h3>
                    <p>{currentModule.description}</p>
                    <div className="module-meta">
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>Duration: {currentModule.estimatedHours} hours</span>
                      </div>
                      <div className="meta-item">
                        <Award size={16} />
                        <span>Certificate upon completion</span>
                      </div>
                    </div>
                    <div className="module-tags">
                      {currentModule.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="module-lessons">
                    <h3>Lessons</h3>
                    <div className="lessons-list">
                      {currentModule.lessons.map((lesson, index) => (
                        <div key={index} className={`lesson-item ${lesson.completed ? "completed" : ""}`}>
                          <div className="lesson-status">
                            {lesson.completed ? "✓" : index === currentModule.completedLessons ? "▶" : ""}
                          </div>
                          <div className="lesson-content">
                            <h4>
                              Lesson {index + 1}: {lesson.title}
                            </h4>
                            <p>Duration: {lesson.duration} minutes</p>
                          </div>
                          <button
                            className="lesson-button"
                            onClick={() => {
                              if (index === currentModule.completedLessons) {
                                handleModuleProgress(currentModule.id, index)
                              }
                            }}
                          >
                            {lesson.completed
                              ? "Review"
                              : index === currentModule.completedLessons
                                ? "Continue"
                                : "Start"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="training-header">
                  <h2>Training Modules</h2>
                  <div className="training-actions">
                    <div className="search-box">
                      <Search size={16} className="search-icon" />
                      <input type="text" placeholder="Search modules..." />
                    </div>
                    <div className="training-filters">
                      <select className="filter-select">
                        <option>All Categories</option>
                        <option>Crop Management</option>
                        <option>Business</option>
                        <option>Certification</option>
                      </select>
                      <select className="filter-select">
                        <option>All Progress</option>
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="my-progress-section">
                  <h3>My Learning Progress</h3>
                  <div className="progress-stats">
                    <div className="stat-card">
                      <div className="stat-value">3</div>
                      <div className="stat-label">Modules In Progress</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">2</div>
                      <div className="stat-label">Modules Completed</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">5</div>
                      <div className="stat-label">Hours Learned</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">1</div>
                      <div className="stat-label">Certificates Earned</div>
                    </div>
                  </div>
                </div>

                <div className="current-modules-section">
                  <h3>Continue Learning</h3>
                  <div className="modules-list">
                    {trainingModules.map((module) => (
                      <div key={module.id} className="module-card" onClick={() => handleModuleSelect(module)}>
                        <div className="module-image">
                          <img src="/placeholder.svg?height=320&width=180" alt={module.title} />
                          <div className="module-progress">
                            <div className="progress-text">
                              {Math.round((module.completedLessons / module.totalLessons) * 100)}% Complete
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${(module.completedLessons / module.totalLessons) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="module-content">
                          <h4 className="module-title">{module.title}</h4>
                          <p className="module-description">{module.description}</p>
                          <div className="module-meta">
                            <span className="lessons-count">{module.totalLessons} Lessons</span>
                            <span className="time-estimate">{module.estimatedHours} Hours</span>
                          </div>
                          <div className="module-tags">
                            {module.tags.map((tag, index) => (
                              <span key={index} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recommended-modules-section">
                  <h3>Recommended For You</h3>
                  <div className="recommendation-cards">
                    <div className="recommendation-card">
                      <img src="/placeholder.svg?height=320&width=180" alt="Precision Agriculture" />
                      <div className="recommendation-content">
                        <h4>Precision Agriculture Technologies</h4>
                        <p>Learn how to implement modern technology to increase efficiency and yield.</p>
                        <button className="enroll-button">Enroll Now</button>
                      </div>
                    </div>
                    <div className="recommendation-card">
                      <img src="/placeholder.svg?height=320&width=180" alt="Climate Smart Farming" />
                      <div className="recommendation-content">
                        <h4>Climate-Smart Farming Practices</h4>
                        <p>Adapt your farm to changing climate conditions and reduce environmental impact.</p>
                        <button className="enroll-button">Enroll Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* GOVERNMENT PROGRAMS TAB */}
        {activeTab === "programs" && (
          <div className="programs-container">
            <div className="programs-header">
              <h2>Government Subsidies & Programs</h2>
              <div className="programs-actions">
                <div className="search-box">
                  <Search size={16} className="search-icon" />
                  <input type="text" placeholder="Search programs..." />
                </div>
                <div className="programs-filters">
                  <select
                    className="filter-select"
                    value={programCategory}
                    onChange={(e) => setProgramCategory(e.target.value)}
                  >
                    <option>All Categories</option>
                    <option>Sustainability</option>
                    <option>Beginning Farmers</option>
                    <option>Conservation</option>
                  </select>
                  <select
                    className="filter-select"
                    value={programDeadline}
                    onChange={(e) => setProgramDeadline(e.target.value)}
                  >
                    <option>All Deadlines</option>
                    <option>Next 30 Days</option>
                    <option>Next 90 Days</option>
                    <option>Next 6 Months</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="program-alerts">
              <div className="alert">
                <div className="alert-icon">!</div>
                <div className="alert-content">
                  <h4>Upcoming Deadline</h4>
                  <p>The Environmental Quality Incentives Program application deadline is in 30 days.</p>
                </div>
                <button className="alert-button">View Details</button>
              </div>
            </div>

            <div className="eligibility-checker">
              <h3>Eligibility Check Tool</h3>
              <p>Answer a few questions to find programs you may qualify for</p>
              <button className="eligibility-button">Start Eligibility Check</button>
            </div>

            <div className="programs-list">
              <h3>Available Programs</h3>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <div key={program.id} className="program-card">
                    <div className="program-content">
                      <h4 className="program-title">{program.title}</h4>
                      <p className="program-description">{program.description}</p>
                      <div className="program-details">
                        <div className="detail-item">
                          <span className="detail-label">Deadline:</span>
                          <span className="detail-value">{program.deadline}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Funding:</span>
                          <span className="detail-value">{program.fundingAmount}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Eligibility:</span>
                          <span className="detail-value">{program.eligibility}</span>
                        </div>
                      </div>
                    </div>
                    <div className="program-actions">
                      <button className="program-button primary">Apply Now</button>
                      <button className="program-button secondary">Save for Later</button>
                      <button className="program-button secondary">
                        <Download size={16} />
                        <span>Download Info</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No programs found matching your filters.</p>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setProgramCategory("All Categories")
                      setProgramDeadline("All Deadlines")
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Space

